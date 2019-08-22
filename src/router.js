import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '',
          name: 'testPage',
          component: () => import( /* webpackChunkName: "about" */ './views/Index.vue'),
          meta: {
            keep: true,
            title: '首页',
            name: 'testPage',
            icon: 'el-icon-s-home'
          }
        },
        {
          path: '/resource',
          name: 'resource',
          component: () => import( /* webpackChunkName: "about" */ './views/Resource.vue'),
           meta: {
             keep: true,
             title: '货源',
             name: 'resource',
             icon: 'el-icon-setting'
           }
        },
        {
          path: '/404Page',
          name:'UnFindPage',
          component: () => import('./views/UnFindPage.vue'),
           meta: {
             keep: true,
             title: '404',
             name: 'UnFindPage',
             icon: 'el-icon-help'
           }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    },
    {
      path: '*',
      redirect: '/404Page'
    }
  ]
})
