import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store/store'
import axios from 'axios'
Vue.prototype.$axios = axios;

router.beforeEach((to, from, next) => {
  if(localStorage.getItem("token")){
    next();
  }else{
    if(to.name === 'login') {
      next();
      return
    }
    next({path: '/login'})
  }
})

//axios 请求拦截器处理请求数据
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  config.headers.common['Authorization'] = 'Bearer ' + token;
  return config;
})

//axios 响应拦截器处理响应数据
axios.interceptors.response.use(res => {
  if(res.data.code === 401) {
    router.push('/login');
  }
  return res.data;
}, err => {
  return Promise.reject(err);
})

Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
