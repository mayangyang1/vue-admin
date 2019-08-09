import Vue from 'vue'
import Vuex from 'vuex'
import loginModule from './modules/login';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    asidebarStatus: localStorage.getItem('asidebarStatus') !== 'false',
  },
  mutations: {
    changeAsidebarStatus(state) {
      let status = !state.asidebarStatus;
      state.asidebarStatus = status;
      localStorage.setItem('asidebarStatus', status);
    }
  },
  actions: {

  },
  modules : {
    loginModule: loginModule,
  }
})
