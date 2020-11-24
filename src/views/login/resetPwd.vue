<template>
  <div id="template">
    <!-- top -->
    <loginHeader :appInfo = 'appInfo'></loginHeader>
    <!-- logreg page -->
    <div class="logreg">
      <!-- header -->
      <header class="header">
        <div class="inner clearfix">
          <h1 class="logo fl" :style="appInfo.logoUrl ? {backgroundImage: 'url(' + appInfo.logoUrl + ')', width: appInfo.logoWidth, height: appInfo.logoHeight} : {margin: '20px 0'}">{{ appInfo.appName }}</h1>
        </div>
      </header>
      <!-- logreg -->
      <div class="logregfm">
        <div class="inner clearfix">
          <!-- register form -->
          <div class="regform">
            <div class="reghd clearfix">
              <h2 class="logtit fl">修改密码<em>RESET YOUR PASSWORD</em></h2><p class="lognow fr">记起密码了？直接去 <a href="/login">登录</a></p>
            </div>
            <div class="steps">
              <ul>
                <li class="step1 sibg">1、确认账号</li>
                <li class="step2 focus">2、重置密码</li>
                <li class="step3">3、完成</li>
              </ul>
            </div>
            <div class="regbd">
              <div id="userForm">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="reg-form formlist">
                  <el-form-item label="密码" prop="password">
                    <el-row>
                      <el-col :span="9">
                        <el-input type="password" v-model='ruleForm.password' :placeholder="pwdPlaceholder" @keyup.native="checkPwd()" name="regPassword" id="regPassword" :maxlength="15"></el-input>
                      </el-col>
                      <el-col :span="15">
                        <span class="pwdlevel level-weak" v-if="weak">
                          <i class="level pass"></i>
                          <i class="level"></i>
                          <i class="level"></i>
                          <strong class="strength">弱</strong>
                        </span>
                        <span class="pwdlevel level-centre" v-if="centre">
                          <i class="level pass"></i>
                          <i class="level pass"></i>
                          <i class="level"></i>
                          <strong class="strength">中</strong>
                        </span>
                        <span class="pwdlevel level-strong" v-if="strong">
                          <i class="level pass"></i>
                          <i class="level pass"></i>
                          <i class="level pass"></i>
                          <strong class="strength">强</strong>
                        </span>
                      </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item label="确认密码" prop="password2">
                    <el-input type="password" v-model='ruleForm.password2' placeholder="再次确认密码" name="regPassword2" id="regPassword2" :maxlength="15"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button class="el-next" type="primary" @click="submitForm('ruleForm')" :disabled="btnDisabled">下一步</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <!-- footer -->
  <loginFooter :appInfo = 'appInfo'></loginFooter>
  </div>
</template>

<script type="text/ecmascript-6">
  import loginHeader from '@/components/LoginHeader.vue'
  import loginFooter from '@/components/LoginFooter.vue'
  import serviceUrl from '@/api/servise.js'

  export default {
    components:{
      loginHeader,
      loginFooter
    },
    data() {
      const comparePass = (rule, value, callback) => {
          if (value !== this.ruleForm.password) {
            callback(new Error('两次输入的密码不一致'));
          } else {
            callback();
          }
        };
      return {
        appInfo: {
          appName: '',
          logoUrl: '',
          logoWidth: '',
          logoHeight: '',
          hotline: '',
          background: '',
          appDomain: '',
          company: '',
          ICP: ''
        },
        pwdPlaceholder: '密码长度为8-15位',
        ruleForm: {
          password: '',
          password2: ''
        },
        rules: {
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 8, max: 15, message: '密码由8-15位的字母大小写、数字、特殊字符三种或以上组成，不允许空格。', trigger: 'blur' }
          ],
          password2: [
            { required: true, message: '请输入确认密码', trigger: 'blur' },
            { validator: comparePass, trigger: 'blur' }
          ]
        },
        isDisable: true,
        weak: false,
        centre: false,
        strong: false,
        btnDisabled: false,
      };
    },
    computed: {
      years() {
        const start = JSON.parse(localStorage.getItem('webappConfig'))['webapp.copyright.start.time'] || '2019',
          end = new Date().getFullYear();
        let text = '';
        text = start == end ? `${start}` : `${start}-${end}`;
        return text;
      },
      powerBy() {
        let result = true;
        if (JSON.parse(localStorage.getItem('webappConfig'))['webapp.powered.company'] === 'FALSE') {
          result = false;
        }
        return result;
      }
    },
    methods: {
      checkPwd() {
        this.ruleForm.password = this.ruleForm.password.replace(/\s+/g,'');
        const pwd = this.ruleForm.password;
        if (pwd.length >= 8) {
          this.pwdlevel(pwd);
        } else {
          this.weak = false;
          this.centre = false;
          this.strong = false;
        }
      },
      pwdlevel(pwd) {
        const regNumber = /\d+/,
          regLowerWords = /[a-z]+/,
          regUpperWords = /[A-Z]+/,
          regSpeChar = /[~!@#$%^&*()_+<>?:"{},.\/;'[\]]/;
        let strength = 0;
        if (regNumber.test(pwd)) {
          strength += 10;
        }
        if (regLowerWords.test(pwd)) {
          strength += 10;
        }
        if (regUpperWords.test(pwd)) {
          strength += 10;
        }
        if (regSpeChar.test(pwd)) {
          strength += 10;
        }
        // console.log(strength);
        switch (strength) {
          case 0:
          case 10:
            this.weak = true;
            this.centre = false;
            this.strong = false;
            break;
          case 20:
            this.weak = false;
            this.centre = true;
            this.strong = false;
            break;
          case 30:
          case 40:
            this.weak = false;
            this.centre = false;
            this.strong = true;
            break;
          default:
            this.weak = false;
            this.centre = false;
            this.strong = false;
            break;
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.btnDisabled = true;
            const account = localStorage.getItem('account'),
              accountObj = JSON.parse(account),
              paramObj = {
                newPassword: this.ruleForm.password,
                mobilePhone: accountObj.mobilePhone,
                verificationCode: accountObj.verificationCode
              };
              this.$axios.postAjax(serviceUrl.resetPassword, paramObj).then((res)=>{
                  if(res.code === 200) {
                    this.$router.push('/setPwdSuccess')
                  }else{
                    this.btnDisabled = false;
                    this.$message({
                    type: 'error',
                    message: res.content || '密码修改失败！',
                    duration: 5000
                    });
                  }
              });
          } else {
            return false;
          }
        });
      },
      dealWithPwdCheck() {
        const checkPass = (rule, value, callback) => {
          if (value.length >= 8) {
            if (!this.strong) {
              callback(new Error('密码由8-15位的字母大小写、数字、特殊字符三种或以上组成，不允许空格。'));
            } else {
              callback();
            }
          } else {
            callback();
          }
        };
        const pwdCheck = JSON.parse(localStorage.getItem('otherappConfig'))['other.password.security.level'] === 'senior';
        if (pwdCheck) {
          this.rules.password.push({ validator: checkPass, trigger: 'blur' });
          this.pwdPlaceholder = '8-15位字母大小写、数字、字符三种或以上';
        }
      }
    },
    created() {
      const lsObj = JSON.parse(localStorage.getItem('appInfo'));
      this.appInfo.appName = lsObj.appName;
      this.appInfo.logoUrl = lsObj.logoUrl;
      this.appInfo.logoWidth = lsObj.logoWidth;
      this.appInfo.logoHeight = lsObj.logoHeight;
      this.appInfo.background = lsObj.background;
      this.appInfo.hotline = lsObj.hotline;
      this.appInfo.appDomain = lsObj.appDomain;
      this.appInfo.company = lsObj.company;
      this.appInfo.ICP = lsObj.ICP;
    },
    mounted() {
      this.dealWithPwdCheck();
    }
  };
</script>

<style lang="scss" scoped rel="stylesheet/scss">
   @import "../../assets/scss/common.scss";
  @import "../../assets/scss/findPwd.scss";

  .formlist {
    margin: 50px;
  }
 .el-button--primary{
   background-color: $uiColor !important;
   border-color: $uiColor !important;
   color: #fff !important;
 }
  .el-form-item {
    margin-bottom: 20px;
     text-align: left;
  }
  
  .el-input{
      text-align: left;
     /deep/.el-input__inner {
        width: 260px;
        height: 28px;
        border-radius: 3px;
    }
  }
  

  .el-button {
    height: 28px;
    line-height: 0;
  }

  .el-next {
    width: 260px;
    height: 30px;
  }
</style>
