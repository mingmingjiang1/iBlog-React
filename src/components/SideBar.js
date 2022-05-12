import React from 'react';
import styles from './SideBar.module.css';
import { useNavigate } from 'react-router-dom';
import animation from '../views/common.module.css';

export default function SideBar(props) {
    let [display, setDisplay] = React.useState(false);
    let navigation = useNavigate();
    let {lists=[]} = props;
    function handleSwitch(e) {
        let tmp = e.target.parentNode.nextSibling;
        setDisplay(true);
        if (e.target.style.transform === 'rotate(90deg)' || e.target.style.transform === '') {
            e.target.style.transform = 'rotate(0)'
        } else {
            e.target.style.transform = 'rotate(90deg)'
        }
        while (tmp) {
            if (tmp.style.display === 'none') {
                tmp.style.display = 'block';
            } else {
                tmp.style.display = 'none';             
            }
            tmp = tmp.nextSibling;
        }
    }

    function handleNavigate(route) {
        if (/^http/.test(route)) {
            window.location.assign(route);
        } else {
            navigation('/bokemanage' + route);
        }
    }

    function createNestList(arr) {
        if (!arr.length) {
            return;
        }
        return arr.map((item, index) => {
            return (
                <ul key={index}>
                    <li onClick={() => handleNavigate(item.route)}>
                        {item.title}
                        {item.children.length ? <i onClick={(e) => {handleSwitch(e)}} className='iconfont icon_jiantouxia'></i> : null }
                    </li>
                    {!display || createNestList(item.children)}
                </ul>
            )
        })
    }

    return (
        <aside className={styles.aside}>
            {
                createNestList(lists)
            }
        </aside>
    )
}

