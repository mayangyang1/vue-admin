<template>
    <el-col :span="24">
        <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            @open="handleOpen"
            @close="handleClose">
            <router-link :to="{name: 'testPage'}">
                <el-menu-item index="1">
                    <i class="el-icon-help"></i>
                    <span slot="title">用户</span>
                </el-menu-item>
            </router-link>
            <router-link :to="{name: 'resource'}">
                <el-menu-item index="2">
                    <i class="el-icon-setting"></i>
                    <span slot="title">货源详情</span>
                </el-menu-item>
            </router-link>
        </el-menu>
    </el-col>
</template>

<script>
export default {
    methods: {
        handleOpen(data) {
        },
        handleClose(data) {
        }
    }
}
</script>

<style scoped>
  .el-menu {
   border: none!important;
   text-align: left;
 } 
</style>