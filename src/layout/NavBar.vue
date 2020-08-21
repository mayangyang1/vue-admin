<template>
    <div class="flex-sb" style="height:60px;">
        <div class="header-left flex-fs">
            <img :src="platformLogoUrl" width="50px" v-if="platformLogoUrl" alt="">
            <!-- <div>行天下物流有限公司</div> -->
        </div>
        <div class="menu">
            <div class="flex-fs">
                <li v-for="(item, index) in topMenuList" :key="item.code" :class="menuIndex == index? 'activeClass' : ''" @click="checkMenu(index)">{{item.resourceName}}</li>
            </div>
        </div>
        
        <div class="header-right flex-fs">
            <el-dropdown @command="handleClick">
                <el-avatar size="medium" :src="avatarUrl"></el-avatar>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item  command='loginOut'>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
            
    </div>
</template>

<script>
import serviceUrl from '../api/servise.js'
export default {
    data() {
        return {
            platformLogoUrl: JSON.parse(localStorage.getItem('appInfo')).platformLogoUrl,
            activeClass: 'activeClass',
            avatarUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
        }
    },
    computed: {
        menuIndex(){
            return this.$store.state.menuIndex;
        },
        topMenuList() {
            return this.$store.state.topMenuList;
        }
    },
    methods:{
        loginOut() {
            const that = this;
            that.$axios.get(serviceUrl.logOut).then((res)=>{
                if(res.code === 200) {
                    that.$router.push('/login')
                }
            })
            
        },
        handleClick(command) {
            console.log(command);
           command === 'loginOut' && this.loginOut();
        },
        checkMenu(index) {
            this.$store.commit('CHECK_MENU',index);
            this.$store.commit('FILTER_MENU_LIST',this.topMenuList[index].code );
        }
    }
}
</script>

<style scoped>
 .header-left img{
    height: 40px;
    line-height: 50px;
    margin: 5px 5px 5px 0;
    width: auto !important;
 }
 .menu {
     align-self: flex-end;
 }
 .menu li{
    list-style-type: none;
    padding: 5px 20px;
    border: 1px solid #ccc;
    margin-right: 2px;
    cursor: pointer;
    border-bottom: none;
    border-radius: 2px;
    background-color: #fefefe;
    font-size: 14px;
    font-weight: 700;
    
    
 }
 .menu li:hover{
     color: #f48400;
     background-color: #fff;
 }
 .activeClass{
     background-color: #f48400!important;
     color: #fff!important;
 }
</style>