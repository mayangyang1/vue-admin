<template>
  <el-container style="height:100vh">
    <el-header class="header">
      <div class="flex-sb">
        <div class="header-left flex-fs">
          <img src="../assets/logo.png" width="50px" alt="">
          <div>上海融链科技有限公司</div>
        </div>
        <div class="header-right">个人信息模块</div>
      </div>
    </el-header>
    <el-container>
      <el-aside class="aside" :width="asidebarStatus? '150px' : '49px'" >
        <el-col :span="24">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            @open="handleOpen"
            @close="handleClose">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-aside>
      <el-container>
        <el-main class="main">
          <el-row :span="24" class="tab-list flex-fs">
            <i @click="changeAsidebarStatus" :class="asidebarStatus? 'el-icon-s-fold' : 'el-icon-s-unfold'"></i>
            <div class="mgl10">面包屑地址</div>
          </el-row>
          <div>页面模块</div>
        </el-main>
        <el-footer class="footer">
         footer

        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src
import {} from 'element-ui'

export default {
  name: 'home',
  data() {
    return {
     
    }
  },
  components: {

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
    handleOpen(data) {
      console.log(data);
    },
    handleClose(data) {
      console.log(data);
    }
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
 .aside .el-menu {
   border: none;
 } 
 .tab-list{
   background-color: #fff;
   height: 50px;
 }
 .el-main{
   padding: 0;
 }
 .main{
   background-color: yellow;
 }
 .footer{
   background-color: #f2f2f2;
 }
</style>
