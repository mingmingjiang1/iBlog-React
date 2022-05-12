import TabBar from '../components/TabBar';

export default function Boke() {
    return (
        <div>
            <TabBar tabs={[
            {route: '', children: [], desc: '', icon: '', url: 'df'},
            {route: '/home', children: [], desc: '首页', icon: 'icon_zhuye'},
            {route: '/boke', children: [], desc: '简历', icon: 'icon_jianli'}, 
            {route: '/bokemanage', children: [], desc: '博客管理', icon: 'icon_yingyongguanli'},
            {route: '', children: ['切换用户', '退出登陆', '查看帮助'], desc: '设置'}, 
            ]}>
            </TabBar > 
                    <h1 style={{marginTop: '30vh', textAlign: 'center'}}>
                        正在构建中...
                    </h1>
        </div>
    )
}