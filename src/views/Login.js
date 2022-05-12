import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import styles from './Login.module.css';
import token from '../utils';

export default function Login () {
    let [password, setPassword] = React.useState('');
    let [name, setName] = React.useState('');
    let [email, setEmail] = React.useState('');
    let [phone, setPhone] = React.useState('');
    let [submit, setSubmit] = React.useState(false);
    const navigation = useNavigate();
    function cmpPassword(e) {
        let tail = e.target.parentNode.children[e.target.parentNode.children.length-1];
        if (e.target?.value !== password) {
            if (tail.nodeName === 'SPAN') {
                e.target.parentNode.removeChild(tail);
            }
            let spanN = document.createElement('span');
            spanN.innerText = ' 前后输入密码不一致，请检查';
            spanN.style.color = 'red';
            spanN.style.fontSize = '14px';
            spanN.style.fontWeight = '500';
            e.target.parentNode.appendChild(spanN);
            setSubmit(false);
        } else {
            if (tail.nodeName === 'SPAN') {
                e.target.parentNode.removeChild(tail);
            }
            setSubmit(true);
        }
    }

    function debounce(callback) {
        let timer;
        return function(...args) {
            clearTimeout(timer);
            timer = setTimeout(() => {callback(...args)}, 1000);
        }
    }

    function handleClick(e) {
        let data = new FormData();
        data.append('email', email);
        data.append('password', password);
        data.append('name', name);
        data.append('phone', phone);
        if (!email || !password || !name || !phone || !submit) {
            e.preventDefault();
            return;
        }
        token.apiPostForm('http://localhost:3000/api/login', data).then(res => {
        if (res.code === 11) {
            // 说明已注册
            
            let node = document.querySelector(`.${styles.usernameInput}`);
            let tail = node.children[node.children.length-1];
            if (tail.nodeName === 'SPAN') {
                node.removeChild(tail);
            }
            let spanN = document.createElement('span');
            spanN.innerText = ' ' + res.data;
            spanN.style.color = 'red';
            spanN.style.fontSize = '14px';
            spanN.style.fontWeight = '500';
            node.appendChild(spanN);
            return;
        }
        token.setToken(res.token);
            navigation('/');
        }).catch(e => console.log(e));
    }

    const debounce1 = debounce((event) => {
        setPassword(event.target?.value);
    })
    const debounce2 = debounce((event) => {
        cmpPassword(event);
    })
    const debounce3 = debounce((event, type) => {
        checkType(event, type);
    }) 
    function func(e) {
        debounce1(e);
    }

    function checkType(e, type) {
        let tail = e.target.parentNode.children[e.target.parentNode.children.length-1];
        switch (type) {
            case 'phone':
                if (/^\d{11}$/.test(e.target.value)) {
                    setPhone(e.target.value);
                    if (tail.nodeName === 'SPAN') {
                        e.target.parentNode.removeChild(tail);
                    }
                    return true;
                } else {
                    if (tail.nodeName === 'SPAN') {
                        e.target.parentNode.removeChild(tail);
                    }
                    let spanN = document.createElement('span');
                    spanN.innerText = ' 手机号码格式不正确，请检查';
                    spanN.style.color = 'red';
                    spanN.style.fontSize = '14px';
                    spanN.style.fontWeight = '500';
                    e.target.parentNode.appendChild(spanN);
                    return false;
                }
            case 'email':
                if (/@.*\..+/.test(e.target.value)) {
                    setEmail(e.target.value);
                    if (tail.nodeName === 'SPAN') {
                        e.target.parentNode.removeChild(tail);
                    }
                    return true;
                } else {
                    if (tail.nodeName === 'SPAN') {
                        e.target.parentNode.removeChild(tail);
                    }
                    let spanN = document.createElement('span');
                    spanN.innerText = ' 邮箱格式不正确，请检查';
                    spanN.style.color = 'red';
                    spanN.style.fontSize = '14px';
                    spanN.style.fontWeight = '500';
                    e.target.parentNode.appendChild(spanN);
                    return false;
                }
            default:
                return true
        }
        
    }

    return (
        <div className={styles.container}>
            <div className={styles.registerBox}>
                <div className={styles.titleBox}>
                    <span>用户注册</span>
                </div>
                    <div className={styles.usernameBox}>
                        <span className={styles.require}>*</span>
                        <label htmlFor="username">用户名</label>
                        <div className={styles.usernameInput}>
                            <input type="text" id={styles.username} name="username" placeholder="用户名 长度:6-12个字符" onChange={e => setName(e.target.value)} required/>
                        </div>
                    </div>
    
                    <div className={styles.userPasswordBox}>
                        <span className={styles.require}>*</span>
                        <label htmlFor="userPassword">密码</label>
                        <div className={styles.userPasswordInput}>
                            <input autoComplete='true' type="password" id={styles.userPassword} name="userPassword" placeholder="密码 长度:6-12个字符" onChange={e => func(e)} required/>
                        </div>
                    </div>
    
                    <div className={styles.userRePasswordBox}>
                    <span className={styles.require}>*</span>
                            <label htmlFor="userRePassword">确认密码</label>
                        <div className={styles.userRePasswordInput}>
                            <input autoComplete='true' type="password" id={styles.userRePassword} name="userRePassword" placeholder="请再次输入密码" required onChange={(e) => debounce2(e)}/>
                        </div>
                    </div>
    
                    <div className={styles.userPhoneBox}>
                        <span className={styles.require}>*</span>
                        <label htmlFor="userPhone">手机号码</label>
                        <div className={styles.userPhoneInput}>
                            <input type="text" id={styles.userPhone} name="userPhone" placeholder="手机号码，11位有效数字" onChange={e => debounce3(e, 'phone')} required/>
                        </div>
                    </div>
                    
                    <div className={styles.userEmailBox}>
                        <span className={styles.require}>*</span>
                        <label htmlFor="userEmail">电子邮箱</label>
                        <div className={styles.userEmailInput}>
                            <input type="text" id={styles.userEmail} name="userEmail" placeholder="邮箱地址，如：123@qq.com" onChange={e => debounce3(e, 'email')} required/>
                        </div>
                    </div>
                    
                    <div className={styles.submitBox}>
                        <Button variant='outlined' color="secondary" onClick={e => handleClick(e)}>注册</Button>
                        {/* <input id = {styles.submitButton} type="submit" value="注册" /> */}
                        <a href="http://localhost:3000/sign">已有账号？去登录</a>
                    </div>
            </div>
	    </div>
    )
}

/*
表单数据如下：
密码，
确认密码
昵称
用户名：邮箱
手机号
邮箱：
*/