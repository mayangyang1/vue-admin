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
          name: 'index',
          component: () => import('./views/Index.vue'),
          meta: {
            keep: true,
            title: '首页',
            name: 'index',
            icon: 'el-icon-s-home'
          }
        },
        {
          path: '/freightList',
          name: 'freightList',
          component: () => import('./views/freight/freight.vue'),
          meta: {
            keep: true,
            title: '货源',
            name: 'freightList',
            icon: 'el-icon-setting'
          }
        },
        {
          path: '/addFreight',
          name: 'addFreight',
          component: () => import( './views/freight/add.vue'),
          meta: {
            keep: true,
            title: '新增货源',
            name: 'addFreight',
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
      component: () => import('./views/login/login.vue')
    },
    {
      path: '/findPwd',
      name: 'findPwd',
      component: () => import(  './views/login/findPwd.vue')
    },
    {
      path: '/resetPwd',
      name: 'resetPwd',
      component: () => import( './views/login/resetPwd.vue')
    },
    {
      path: '/setPwdSuccess',
      name: 'setPwdSuccess',
      component: () => import(  './views/login/setPwdSuccess.vue')
    },
    {
      path: '/enterprise',
      name: 'enterprise',
      component: () => import( './views/login/enterprise.vue')
    },
    {
      path: '/registerCompany',
      name: 'registerCompany',
      component: () => import( './views/login/registerCompany.vue')
    },
    {
      path: '/registerSuccess',
      name: 'registerSuccess',
      component: () => import( './views/login/registerSuccess.vue')
    },
    {
      path: '*',
      redirect: '/404Page'
    }
  ]
})
