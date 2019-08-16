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
            name: 'testPage'
          }
        },
        {
          path: '/resource',
          name: 'resource',
          component: () => import( /* webpackChunkName: "about" */ './views/Resource.vue'),
          meta: {
            keep: true,
            title: '货源',
            name: 'resource'
          }
        },
        {
          path: '/404Page',
          name:'404Page',
          component: () => import('./views/404Page.vue')
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
