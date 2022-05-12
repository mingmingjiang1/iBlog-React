import { Routes, Route } from "react-router-dom";
import TabBar from "../components/TabBar";
import SideBar from "../components/SideBar";
import styles from "./BokeManage.module.css";
import Show from "../components/Show";
import ShowCategory from '../components/ShowCategory';
import FileUpload from "../components/FileUpload";
import BokeModify from "./BokeModify";
import BokeWrite from "./BokeWrite";

export default function BokeManage(props) {
    let lists = [
        {
            title: "博文列表",
            route: '/list',
            children: [
                {
                    title: "新建文章",
                    route: 'http://localhost:3001/write',
                    children: []
                },
                {
                    title: "上传文章",
                    route: '/upload',
                    children: []
                }
            ]
        },
        {
            title: "分类管理",
            route: '/category',
            children: []
        },
        {
            title: "标签管理",
            route: '/label',
            children: []
        }
    ]
    return (
        <div>
            <TabBar style = {styles.tabBar} tabs={[
                {route: '', children: [], desc: '', icon: '', url: 'df'},
                {route: '/home', children: [], desc: '首页', icon: 'icon_zhuye'},
                {route: '/boke', children: [], desc: '简历', icon: 'icon_jianli'},
                {route: '/bokemanage', children: [], desc: '博客管理', icon: 'icon_yingyongguanli'}, 
                {route: '', children: ['切换用户', '退出登陆', '查看帮助'], desc: '设置'}, 
                ]}>
            </TabBar >
            <div className={styles.container}>
                <SideBar lists={lists}></SideBar>
                <div className={styles.table}>
                    <Routes>
                        <Route path="/" element={<Show />}></Route>
                        <Route path="/list" element={<Show />}></Route>
                        <Route path="/upload" element={<FileUpload />}></Route>
                        <Route path="/category" element={<ShowCategory />}></Route>
                        <Route path="/modify" element={<BokeModify />}></Route>
                    </Routes>
                </div>
            </div>
         </div>
    )
}