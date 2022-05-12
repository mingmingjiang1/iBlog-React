import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import styles from './Sign.module.css';
import fetch from '../utils';
import url from '../assets/pics/avtar.png'

export default function LoginPage(props) {
    let [userName, setUserName] = React.useState('');
    let [userInfo, setUserInfo] = React.useState('');
    const navigation = useNavigate();
    function handleSubmit(e) {
        fetch.apiPost("http://localhost:3000/api/sign", {
            phone: userName,
            password: userInfo,
        }).then(res => {
            const target = document.querySelector('.'+styles.password);
            if (res.code === 13) {
                // 说明未注册，提示未注册
                target.nextSibling.innerText = "您尚未注册,请先注册";
                return;
            } else if (res.code === 12) {
                // 说明密码错误，提示密码错误
                target.nextSibling.innerText = "密码错误";
                return;
            }
            target.nextSibling.innerText = "";
            fetch.setToken(res.token);
            navigation('/home');
        }).catch(e => console.log(e))
        // 发送请求，根据状态码决定后续：如果密码错误，则提示用户密码错误，否则如果是注册则拿到token，保存至本地storage再进入主页，如果是登陆则直接进入主页
    }

    function handleLogin() {
        navigation('/login')
    }

    function handleIsValid(e) {
        // 判断手机号是否是11位数字
        if (!(/^\d{11}$/.test(userName))) {
            e.target.parentNode.nextSibling.innerText = "请检查手机格式";
        } else {
            e.target.parentNode.nextSibling.innerText = "";
        }
    }

    function handleHidden(e) {
        const target = e.target.previousSibling;
        if (target.getAttribute('type') === 'password') {
            target.setAttribute('type', 'text');
        }
        else {
            target.setAttribute('type', 'password');
        }
    }

    return (
        <div className={styles.loginContainer}>
            <h1>欢迎登录</h1>
            <div className={styles.avtar}>
                <img src={url} alt="登录提示图片"/>
            </div>
            <div className={styles.formContent}>
                        <form>
                            <table>
                                <tbody>
                                <tr>
                                    <td>用户 <i className='iconfont icon_yonghu'></i></td>
                                    <td>
                                        <input type="text" placeholder='手机号如: 13764547645' value={userName} onBlur={handleIsValid} onChange={(e) => setUserName(e.target.value)}/>
                                    </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>密码 <i className='iconfont icon_jiesuo'></i></td>
                                    <td className={styles.password}>
                                        <input type="password" value={userInfo} onChange={(e) => setUserInfo(e.target.value)} />
                                        <i className='iconfont icon_yanjing' onClick={handleHidden} style={{position: 'absolute', left: '68vh', top: '1vh', cursor: 'pointer'}}></i>
                                    </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>
                                        <Button onClick={(e) => handleLogin(e)}  variant='outlined' color="primary" style={{marginRight: '5vh'}}>注册</Button>       
                                        <Button onClick={(e) => handleSubmit(e)} variant='outlined' color="primary">登录</Button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </form>
            </div>
        </div>
    )
}


