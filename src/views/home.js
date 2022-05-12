import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, useNavigate, Link } from "react-router-dom"
import fetch from '../utils';
import styles from './home.module.css'
import TabBar from '../components/TabBar';
import CardList from '../components/CardList';
import Thumbnail from '../components/Thumbnail';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import Archive from '../components/Archive';
import './common.module.css';
import {
    selectname,
    selectbgImg,
    selecttitle,
    selectasideTitle,
  } from '../features/counter/counterSlice';


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
      padding: "20px",
      display: 'flex',
      'justify-content': 'center',
    },
  }));

export default function Home() {
    const classes = useStyles();
    const userName = useSelector(selectname);
    const bgImg = useSelector(selectbgImg);
    const title = useSelector(selecttitle);
    const asideTitle = useSelector(selectasideTitle);
    React.useEffect(request, []);

    let [showList, setList] = React.useState([]);
    let [showRecent, setRecent] = React.useState([]);
    let [showCates, setCates] = React.useState([]);
    let [showArch, setArchive] = React.useState([]);
    let [pageTotal, setTotal] = React.useState(0);
    let [condition, setCond] = React.useState("");
    let [params, setParams] = React.useState("");

    async function handleToPage(event, page, condition, params) {
        requestToPage(page, condition, params);
    }

    function requestToPage(page, condition, params) {
        fetch.apiGet(`http://localhost:3000/api/page?condition=${condition}&params=${params}&page=${page}`, {
        }).then(res => {
            setList(res.data.cards);
        })
    }

    function request() {
        fetch.apiGet('http://localhost:3000/api/cardlist', {
        }).then(res => {
            setList(res.data.cards);
            setRecent(res.data.recent);
            setCates(res.data.groupByCateGory);
            setArchive(res.data.groupByYear); 
            setTotal(res.data.pageTotal)  
        }).catch(e => console.log(e))
    }

    function handleToView(condition, params) {
        setCond(condition);
        setParams(params);
        handleToPage(undefined, 1, condition, params);
    }

    return (
        <div>
            <div className={styles.home} style={{backgroundImage: (/\.png$|\.jpg$/).test(bgImg) ? `url(http://localhost:3001/${bgImg})` : `url(${bgImg}`}}>
                <div style={{height: '80px'}}>
                    <TabBar tabs={[
                    {route: '', children: [], desc: '', icon: '', url: 'df'},
                    {route: '/home', children: [], desc: '首页', icon: 'icon_zhuye'}, 
                    {route: '/boke', children: [], desc: '简历', icon: 'icon_jianli'},
                    {route: '/bokemanage', children: [], desc: '博客管理', icon: 'icon_yingyongguanli'},
                    {route: '', children: ['切换用户', '退出登陆', '查看帮助'], desc: '设置'}, 
                    ]}>
                    </TabBar >
                </div>
                <div className={styles.desc}>
                    <h1>
                        {fetch.formatTime()}：{userName}！
                    </h1>
                    <div>
                        <h3>
                            {title || '云想霓裳花想容，春风拂槛露华浓。'}
                        </h3>
                        <h3>
                            {asideTitle || '若非群玉山头见，会向瑶台月下逢。'}
                        </h3>
                    </div>
                    <div>
                        <button className='btn'>
                            READ ME 
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.main}>
                {/* <BrowserRouter> */}
                <Routes>
                    <Route path='/' exact element={
                            <CardList showList={showList}></CardList>
                    } />
                    <Route path='/:category/:id' element={
                            <Archive filelist={showList} request={handleToPage}></Archive>
                    } />
                    </Routes>
                {/* </BrowserRouter> */}
                
                <div className={styles.msg}>
                        <div className={styles.category}>
                            <div>
                                <i className='iconfont icon_zuijinyuedu' style={{fontSize: '20px'}}></i>
                                <span style={{fontSize: '17px'}}> 最近</span>
                            </div>
                            <div style={{marginTop: '10px'}}>
                                    {showRecent.map((item, index) => {
                                        return (
                                            <Thumbnail key={index} date={item.date} url={item.url} bgImgUrl={"http://localhost:3001/pics/" + item.bgImgUrl} category={item.category} title={item.title}></Thumbnail>
                                        )
                                    })}
                            </div>
                        </div>
                        <div className={styles.category}>
                            <div>
                            <i className='iconfont icon_wenjianjia' style={{fontSize: '20px'}}></i>
                                <span> 分类</span>
                            </div>
                            <ul style={{marginTop: '10px'}}>

                                {showCates.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            <Link to={`/home/category/${item.category}`} onClick={() => handleToView("category", item.category)}>
                                                <span>{item.category}</span>
                                                <span>{item.cnt}</span>
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div className={styles.category}>
                            <div>
                            <i className='iconfont icon_biaoqian' style={{fontSize: '20px'}}></i>
                                <span> 归档</span>
                            </div>
                            <ul style={{marginTop: '10px'}}>
                                {showArch.map((item, index) => {
                                        return (
                                            <li key={index}>
                                                <Link to={`/home/archive/${item.mont}`} onClick={() => handleToView("archive", item.mont)}>
                                                    <span>{item.mont}</span>
                                                    <span>{item.cnt}</span>
                                                </Link>
                                            </li>
                                        )
                                })}
                            </ul>
                        </div>
                </div>
            </div>
            <div style={{margin: '0 100px'}}>
                <hr width="100%" align="left"height="100" color='#393d49' style={{opacity: '0.15'}}/>
            </div>
            <div className={classes.root}>
                <Pagination count={pageTotal} onChange={(event, page) => handleToPage(event, page, condition, params)} color="primary" />
            </div>
        </div>
    )
}


