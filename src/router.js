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
          path: '/freightList',
          name: 'freightList',
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
      path: '/findPwd',
      name: 'findPwd',
      component: () => import( /* webpackChunkName: "about" */ './views/FindPwd.vue')
    },
    {
      path: '/resetPwd',
      name: 'resetPwd',
      component: () => import( /* webpackChunkName: "about" */ './views/ResetPwd.vue')
    },
    {
      path: '/setPwdSuccess',
      name: 'setPwdSuccess',
      component: () => import( /* webpackChunkName: "about" */ './views/SetPwdSuccess.vue')
    },
    {
      path: '/enterprise',
      name: 'enterprise',
      component: () => import( /* webpackChunkName: "about" */ './views/Enterprise.vue')
    },
    {
      path: '/registerCompany',
      name: 'registerCompany',
      component: () => import( /* webpackChunkName: "about" */ './views/RegisterCompany.vue')
    },
    {
      path: '/registerSuccess',
      name: 'registerSuccess',
      component: () => import( /* webpackChunkName: "about" */ './views/RegisterSuccess.vue')
    },
    {
      path: '*',
      redirect: '/404Page'
    }
  ]
})
