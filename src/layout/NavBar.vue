<template>
    <div class="flex-sb" style="height:100%">
        <div class="header-left flex-fs">
            <img src="../assets/logo.png" width="50px" alt="">
            <div>行天下物流有限公司</div>
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
export default {
    data() {
        return {
            avatarUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
        }
    },
    methods:{
        loginOut() {
            localStorage.removeItem('token');
            this.$router.push('/login')
        },
        handleClick(command) {
            console.log(command);
           command === 'loginOut' && this.loginOut();
        }
    }
}
</script>

<style scoped>
 .header-left img{
     margin-right: 4px;
     border-radius: 50%;
     height: 50px;
     width: 50px;
 }
</style>