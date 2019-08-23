<template>
    <div>
        <el-card class="login-card">
            <div class="logos">
                <img src="../assets/images/logo.png" alt="">
            </div>
            <div class="input"><input v-model="userName" placeholder="请输入用户名" type="text"></div>
            <div class="input"><input v-model="password" placeholder="请输入密码"  type="password"></div>
            <div class="btn" @click="login">确定</div>
            <span>账号:123 密码:123</span>
           
        </el-card>
        
    </div>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            userName: '',
            password: '',
        }
    },
    methods: {
        login() {
            if(this.userName === '') {
                return this.$message.error('请输入用户名');
            }
            if(this.password === '') {
                return this.$message.error('请输入密码');
            }
            this.$axios.post('/api/login',{
             name: this.userName, password: this.password
            }).then(res => {
                if(res.code === 200) {
                    localStorage.setItem('token', res.content);
                    this.$router.push('/');
                }
            })
        }
    }
}
</script>

<style scoped>
.login-card{
    width: 500px;
    margin: 0 auto;
    margin-top: 200px;
    padding: 30px 0;
}
 .logos img{
     margin-top: 10px;
     width: 100px;
     height: 100px;
     border-radius: 50%;
 }
 .input input {
     border: 1px solid #ccc;
     height: 30px;
     width: 200px;
     margin: 0 auto;
     padding-left: 4px;
    margin-top: 6px;
    border-radius: 4px;
 }
 .btn{
     width: 200px;
     height: 34px;
     margin: 0 auto;
     line-height: 34px;
     margin-top: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
 }
</style>