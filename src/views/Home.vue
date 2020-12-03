<template>
  <el-container style="height:100vh">
    <el-header class="header-t">
      <nav-bar></nav-bar>
    </el-header>
    <el-container>
      <el-aside class="aside" :class="asidebarStatus? 'show' : 'hide'" width='150px' >
        <aside-bar></aside-bar>
      </el-aside>
      <el-aside width="18px" class="flod">
        <div class="arrow">
          <span @click="changeAsidebarStatus" :class="asidebarStatus? 'el-icon-caret-left' : 'el-icon-caret-right'"></span>
        </div>
      </el-aside>
      <el-container>
        <el-main class="main">
          <tag-bar></tag-bar>
          <app-page-view class="app-page-view"></app-page-view>
        </el-main>
        <!-- <el-footer class="footer">
         <footer-bar></footer-bar>
        </el-footer> -->
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src
import PageView from './PageView';
import NavBar from '../layout/NavBar';
import Aside from '../layout/sideBar/Aside';
import TagBar from '../layout/TagBar';
import serviceUrl from '../api/servise.js'

export default {
  name: 'home',
  data() {
    return {
      
    }
  },
  components: {
    "app-page-view" : PageView,
    "nav-bar" : NavBar,
    'aside-bar' : Aside,
    'tag-bar' : TagBar,
  },
  computed: {
    asidebarStatus(){ 
      return this.$store.state.asidebarStatus
    },

  },
  methods: {
    changeAsidebarStatus() {
      this.$store.commit('changeAsidebarStatus');
    },
    
    getOrgInfo() {
      this.$axios.get(serviceUrl.orgInfo).then((res)=>{
        console.log(res);
      })
    },
    getPublicKey() {
      this.$axios.get(serviceUrl.publicKey).then((res)=> {
        console.log(res)
        if(res.code == 200) {
          localStorage.setItem('publicKey', res.content.publicKey)
        }
        
      })
    },
    getMenuList() {
      const that = this;
      this.$axios.get(serviceUrl.menuList).then((res) => {
        if(res.code === 200) {
          let menuList = res.content;
          let topMenuList = [];
          let asideMenuList = [];
          let linkMenu = [];
          menuList.forEach((item, index) => {
            if(!item.parentResourceCode) {
              topMenuList.push(item);
            }
            if(item.parentResourceCode && !item.path) {
              asideMenuList.push(item);
            }
            if(item.parentResourceCode && item.path) {
              let pathArr = item.path.split('.')[0].split('/');
              let nextName;
              let lastName;
              let pathRoute;
              if(pathArr.length == 3) {
                nextName = pathArr[2].charAt(0).toUpperCase() + pathArr[2].substring(1);
                pathRoute = pathArr[1] + nextName;
              }
              if(pathArr.length == 4) {
                nextName = pathArr[2].charAt(0).toUpperCase() + pathArr[2].substring(1);
                lastName = pathArr[3].charAt(0).toUpperCase() + pathArr[3].substring(1);
                pathRoute = pathArr[1] + nextName + lastName;
              }
              console.log(pathRoute);
              item.pathRoute = pathRoute;
              linkMenu.push(item);
            }
            
          })
          for(let i =0; i< asideMenuList.length; i++) {
            asideMenuList[i].children = [];
            for(let j=0; j<linkMenu.length; j++){
              if(asideMenuList[i].code == linkMenu[j].parentResourceCode){
                asideMenuList[i].children.push(linkMenu[j]);
              }
            }
          }
          that.$store.commit('SET_MENU_LIST',{topMenuList:topMenuList, asideMenuList: asideMenuList})
          that.$store.commit('FILTER_MENU_LIST', topMenuList[0].code);
        }
      })
    }
  },
  created(){
    this.getMenuList();
    this.getOrgInfo();
    this.getPublicKey();
  }
}
</script>
<style scoped>
 .header-t{
   background-color: #fff;
   border-bottom: 2px solid #f48400;
   height: auto!important;
   
 }
 .aside{
   background-color: rgba(0, 0, 0, .02);
 }

 .el-main{
   padding: 0;
 }
 .main{
   background-color: #fff;
    display: flex;
    flex-direction: column
 }
 .app-page-view{
   flex: 1;
   max-height: 800px;
   overflow-y: auto;
 }
 .footer{
   background-color: #f2f2f2;
   height: 40px!important;
 }
 .flod{
   position: relative;
   border-right: 1px solid #f2f2f2;
 }
 .arrow {
   position: absolute;
    top: 50%;
    left: 0px;
    cursor: pointer;
 }
</style>
