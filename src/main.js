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
  Form,
  FormItem,
  Input,
  Checkbox,
  Dialog,
  Radio,
  RadioGroup,
  Select,
  Option,
  DatePicker,
  CheckboxGroup,

} from 'element-ui';
import './assets/scss/_reset-default.scss';
import './assets/scss/reset.scss';
// import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store/store'
import axios from 'axios'
import Qs from 'qs'
import Axios from 'axios';



// router.beforeEach((to, from, next) => {
//   if(localStorage.getItem("token")){
//     next();
//   }else{
//     if(to.name === 'login') {
//       next();
//       return
//     }
//     next({path: '/login'})
//   }
// })

//axios 请求拦截器处理请求数据
function postAjax(url, data) {
  return axios.post(url, Qs.stringify(data), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
};
axios.postAjax = postAjax;
let loadingInstance;
axios.defaults.withCredentials = true
axios.interceptors.request.use(config => {
      
  loadingInstance = Loading.service({
    fullscreen: true
  })
  // const token = localStorage.getItem('token');
  // config.headers.common['Authorization'] = 'Bearer ' + token;
  return config;
})

//axios 响应拦截器处理响应数据
axios.interceptors.response.use(res => {
  loadingInstance.close();
  if(res.data.code === 401) {
    router.push('/login');
  }
  if(res.data.code === 500) {
    if (!res.config.url.indexOf('/validate')>0) {
      Message.error(res.data.content);
    }
    
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
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Checkbox);
Vue.use(Dialog);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Select);
Vue.use(Option);
Vue.use(DatePicker);
Vue.use(CheckboxGroup)

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
