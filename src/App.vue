<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss" rel="stylesheet/scss">
@import "./assets/scss/common.scss";
@import "./assets/scss/date-picker.scss";
// @import "./assets/scss/_reset-default.scss";
.el-button--primary{
   background-color: $uiColor !important;
   border-color: $uiColor !important;
   color: #fff !important;
 }
 
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
a {
  text-decoration: none;
}
 
.router-link-active {
  text-decoration: none;
}
#nav {
  padding: 30px;
}
.show{
   display: block;
 }
 .hide{
   display: none;
 }
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
body, html {
  margin: 0;
  padding: 0;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
.flex-sb{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flex-sa{
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.flex-fs{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  
}
.flex-fe{
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.row{
  display: flex;
  justify-content: center;
  align-items: center;
}
.common-button{
  width: 120px;
}
/*主题色 --start*/
#main-color{
  color:  $uiColor!important;
}
#main-bg-color{
  background-color: $uiColor!important;
  color: #fff!important;
}
#main-bg-color:hover{
  background-color: $uiColor!important;
  color: #fff!important;
}
#main-bd-color{
  background-color: $uiColor!important;
  color: #fff!important;
  border: 1px solid  $uiColor!important;
}
#main-bd{
  border: 1px solid  $uiColor!important;
}
/*主题色 --end*/
/*padding布局 --start*/
.pd10{
  padding: 10px;
}
.pdl10{
  padding-left: 10px;
}
.pdr10{
  padding-right: 10px;
}
.pdlr10{
  padding: 0 10px;
}
.pdb10{
  padding-bottom: 10px;
}
.pdtb10{
  padding: 10px 0;
}
.pdt10{
  padding-top: 10px;
}
/*padding布局 --end*/
/*margin布局 -- start*/
.mg10{
  margin: 10px;
}
.mgl10{
  margin-left: 10px;
}
.mgr10{
  margin-right: 10px;
}
.mglr10{
  margin: 0 10px;
}
.mgt10{
  margin-top: 10px;
}
/*margin布局 -- end*/
/*盒子居中 -- start*/
.box-center{
  margin: 0 auto;
  text-align: center;
}
/*盒子居中 -- end*/
/*文字溢出显示... -- start*/
.text-overflow{
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
/*文字溢出显示... -- end*/
</style>
