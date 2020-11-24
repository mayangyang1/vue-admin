import Vue from 'vue'
import Vuex from 'vuex'
import routeTag from './modules/routeTag'
import tagsView from './modules/tagsView'
import radioChange from './modules/radioChange'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    asidebarStatus: localStorage.getItem('asidebarStatus') !== 'false',
    menuIndex: 0,
    topMenuList: [],
    asideMenuList: [],
    filterMenuList: [],
  },
  mutations: {
    changeAsidebarStatus(state) {
      let status = !state.asidebarStatus;
      state.asidebarStatus = status;
      localStorage.setItem('asidebarStatus', status);
    },
    CHECK_MENU(state, index) {
      state.menuIndex = index;
    },
    SET_MENU_LIST(state,info) {
      state.topMenuList = info.topMenuList;
      state.asideMenuList = info.asideMenuList;
    },
    FILTER_MENU_LIST(state, code) {
      let filterMenuList = [];
      state.asideMenuList.forEach((item,index) => {
        if (item.parentResourceCode == code) {
          filterMenuList.push(item);
        }
      })
      state.filterMenuList = filterMenuList;
    }
  },
  actions: {

  },
  modules : {
    routeTag: routeTag,
    tagsView: tagsView,
    radioChange: radioChange
  }
})
