import Vue from 'vue'
import {
  Loading,
  Container,
  Header,
  Aside, 
  Main, 
  Card, 
  Message, 
  Col, 
  Menu, 
  Submenu, 
  MenuItem, 
  Dropdown, 
  Avatar, 
  DropdownMenu, 
  DropdownItem, 
  Row, 
  Table, 
  TableColumn, 
  Upload, 
  Button,
  MessageBox,
  Pagination,

} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store/store'
import axios from 'axios'



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
let loadingInstance;
axios.interceptors.request.use(config => {
  loadingInstance = Loading.service({
    fullscreen: true
  })
  const token = localStorage.getItem('token');
  config.headers.common['Authorization'] = 'Bearer ' + token;
  return config;
})

//axios 响应拦截器处理响应数据
axios.interceptors.response.use(res => {
  loadingInstance.close();
  // if(res.data.code === 401) {
  //   router.push('/login');
  // }
  if(res.data.code === 500) {
    Message.error(res.data.content);
  }
  return res.data;
}, err => {
  if (err.response.status === 401) {
    router.push('/login');
  }
  if(err.response.status === 500) {
    Message.error('系统错误');
  }
  loadingInstance.close();
  return Promise.reject(err);
})

Vue.config.productionTip = false
Vue.use(Loading);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Card);
Vue.use(Col);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Dropdown);
Vue.use(Avatar);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Row);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Upload);
Vue.use(Button);
Vue.use(Pagination);

Vue.prototype.$axios = axios;
Vue.prototype.$message = Message;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
