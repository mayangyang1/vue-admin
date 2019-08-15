<template>
    <div>
        <div><input v-model="userName" placeholder="请输入用户名" type="text"></div>
        <div><input v-model="password" placeholder="请输入密码"  type="password"></div>
        <div><button @click="login">确定</button></div>
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