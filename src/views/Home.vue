<template>
  <el-container style="height:100vh">
    <el-header class="header">
      <nav-bar></nav-bar>
    </el-header>
    <el-container>
      <el-aside class="aside" :width="asidebarStatus? '150px' : '49px'" >
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
          <app-page-view></app-page-view>
        </el-main>
        <el-footer class="footer">
         <footer-bar></footer-bar>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src
import PageView from './PageView';
import NavBar from '../layout/NavBar';
import Aside from '../layout/sideBar/Aside';
import Footer from '../layout/Footer';
import TagBar from '../layout/TagBar';

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
    'footer-bar' : Footer,
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
    
  }
}
</script>
<style scoped>
 .header{
   background-color: #f2f2f2;
 }
 .header-left{
   height: 60px;
 }
 .aside{
   background-color: #545c64;
 }

 .el-main{
   padding: 0;
 }
 .main{
   background-color: #fff;
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
