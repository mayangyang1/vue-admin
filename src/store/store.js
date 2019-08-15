import Vue from 'vue'
import Vuex from 'vuex'
import routeTag from './modules/routeTag'
import tagsView from './modules/tagsView'

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
    routeTag: routeTag,
    tagsView: tagsView,
  }
})
