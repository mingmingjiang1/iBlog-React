import { useSelector } from 'react-redux';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AlertBox from '../views/AlertBox';
import UserInfo from './UserInfo';
import styles from './TabBar.module.css';
import {
    selectbgColor,
    selectavstar,
    selectname,
  } from '../features/counter/counterSlice';

export default function TabBar(props) {
    const bgColor = useSelector(selectbgColor);
    const avstar = useSelector(selectavstar);
    const name = useSelector(selectname);
    let manage = React.createRef();
    let alertM = React.createRef();
    let popup = React.createRef();

    let [isShow, setShowSelBox] = React.useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    React.useEffect(handleScroll, [bgColor]);
    var [activeTab] = React.useState(location?.state?.activeTab || 1);
    let {tabs = [], style = ''} = props;
    function handleTabClick(index, route='') {
        if (route) {
            navigate(route, {
                state: {
                    activeTab: index
                }
            })
        } else {

        }
    }
    function handleTabSelect() {
        setShowSelBox(!isShow);
    }
    function handleScroll() {
        // let ctx = document.querySelector('.TabBar_tabBar__Zq5WM');
        let conHeight = document.documentElement.scrollTop;
        if (manage.current && !conHeight) {
            // manage.current.style.top = 0;
            // manage.current.style.left = 0;
            // manage.current.style.backgroundColor = 'transparent';
            manage.current.style.position = 'relative';
            manage.current.style.background = ''; 
        }
        if (conHeight && manage.current) {
            // manage.current.style.backgroundColor = '#f37075';
            manage.current.style.position = 'fixed';
            manage.current.style.width = '100%';
            manage.current.style.top = 0;
            manage.current.style.left = 0;
            // 'linear-gradient(#f37075,#ffa093)'
            manage.current.style.background = bgColor || '#ffa093';
        }
    }

    function switchUser() {
        alertM.current.handleOpen();
    }
    document.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', (e) => {
        let t = document.querySelector('.icon_shezhi')
        if (!e.path.includes(t) && e.path[0].nodeName !== 'LI') {
            setShowSelBox(false);
        }
    })


    function handleOpenUserInfo() {
        popup.current.popUp();
    }

    return (
        <div className={style || styles.tabBar} ref={manage}>
            <AlertBox ref={alertM} navigate={navigate}/>
            <UserInfo ref={popup}></UserInfo>
            <div className={styles.left}>
                <img src={/(\.png|\.jpg)$/.test(avstar) ? `http://localhost:3001/${avstar}` : avstar} alt="" className={styles.avstar}></img>
                <i className={`iconfont icon_wode`} onClick={() => handleOpenUserInfo()}></i>
                &nbsp;&nbsp;     欢迎您：{name}
            </div>
            <div >
                {
                    tabs.map((item, index) => {
                        if (!item?.children.length && !item?.url) { // 说明没有子元素，不是下拉框
                            return (<span className={index !== activeTab ? styles.tabBarItem : styles.active} key={index} onClick={() => {
                                handleTabClick(index, item.route);
                            }}>{item.desc} <i className={`iconfont ${item.icon}`}></i></span>)
                        } else if (item?.children.length && !item?.url){
                            return (<span className={index !== activeTab ? styles.tabBarItem : styles.active} key={index} onClick={() => {
                                handleTabClick(index, item.route);
                            }}>
                                <div className={styles.btn} >
                                    {item.desc} &nbsp;
                                    <i onClick={() => handleTabSelect()} className={`iconfont icon_shezhi`}></i>
                                </div>
                                <ul className={styles.selectBox} style={{display: isShow ? 'block' : 'none'}}>
                                    
                                    {item.children.map((item, index) => {
                                            return (
                                                <li key={index} onClick={() => switchUser()}>{item}</li>
                                            )
                                        })}
                                </ul>
                            </span>)
                        }
                    }
                    )
                }
            </div>
        </div>
    )
}







