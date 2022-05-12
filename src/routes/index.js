import { lazy } from 'react';
import Home from '../views/home';

const router = [
    {
     path: '/home/*',
     component: Home,
     auth: true,
     children: [
       {
          path: '/:category/:id',
          component: lazy(() => import('../components/Archive')),
          auth: false,
       },
     ]
    },
    {
      path: '/',
      auth: true,
      component: Home,
    },
   {
     path: '/sign',
     auth: false,
     component: lazy(() => import('../views/Sign'))
   },
   {
     path: '/login',
     auth: false,
     component: lazy(() => import('../views/Login'))
   },
  //  {
  //    path: "/category/:id",
  //   //  name: "category",加了name貌似会变成哈希模式
  //    auth: true,
  //    component: lazy(() => import('../components/Archive'))
  //  },
   {
     path: '/boke',
     auth: true,
     component: lazy(() => import('../views/Boke')),
   },
   {
     path: '/bokemanage/*', // 这个路由必须要这样配置，不然子路由显现不出来
     auth: true,
     component: lazy(() => import('../views/BokeManage')),
     children: [
        {
            path: 'show',
            auth: false,
            component: lazy(() => import('../components/Show')),
        },
        {
            path: 'category',
            auth: false,
            component: lazy(() => import('../components/ShowCategory')),
        },
        {
            path: 'upload',
            auth: false,
            component: lazy(() => import('../components/FileUpload')),
        },
        {
            path: 'modify',
            auth: false,
            component: lazy(() => import('../views/BokeModify')),
        },
      ]
   },
 ]
  
export default router;
