<template>
  <div class="bg-logreg">
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
              <h2 class="logtit fl">修改密码<em>RESET YOUR PASSWORD</em></h2><p class="lognow fr">记起密码了？直接去 <span style="cursor:pointer;" @click="goBack">登录</span></p>
            </div>
            <div class="steps">
              <ul>
                <li class="step1 focus">1、确认账号</li>
                <li class="step2">2、重置密码</li>
                <li class="step3">3、完成</li>
              </ul>
            </div>
            <div class="regbd">
              <div id="userForm">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="reg-form formlist">
                  <el-form-item label="手机号" prop="loginAccount">
                    <el-row>
                      <el-col :span="9">
                        <el-input v-model='ruleForm.loginAccount' placeholder="请输入手机号码" name="loginAccount" id="loginAccount"></el-input>
                      </el-col>
                      <el-col :span="15">
                        <el-button type="primary" @click="getCode()" v-if="isShow===true" id="getValiCode" :disabled="isDisable">获取验证码</el-button>
                        <el-button type="default" disabled v-if="isShow===false">还剩<strong id="number" class="org">60</strong>秒</el-button>
                      </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item label="验证码" prop="verifyCode">
                    <el-input v-model='ruleForm.verifyCode' placeholder="请输入验证码" name="verifyCode" id="verifyCode"></el-input>
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
  import {hostUrl} from '@/config/config.js'
import serviceUrl from '@/api/servise';

  export default {
    components:{
      loginHeader,
      loginFooter
    },
    data() {
      const checkPhone = (rule, value, callback) => {
          const reg = /^1\d{10}$/;
          if (value.length === 11) {
            if (reg.test(value) === false) {
              callback(new Error('请输入正确的手机号'));
              this.isDisable = true;
            } else {
              const paramObj = {
                loginAccount: value
              };

              this.$axios.postAjax(hostUrl + `/account/account/${paramObj.loginAccount}/validate`,paramObj).then((res)=>{
                if(res.code === 200) {
                  callback(new Error('该号码尚未注册！'));
                  this.isDisable = true;
                }else{
                  callback();
                  this.isDisable = false;
                }
              })
            }
          } else {
            // callback(new Error('请输入正确的手机号'));
            this.isDisable = true;
          }
        },
        checkValicode = (rule, value, callback) => {
          const phoneNumber = this.ruleForm.loginAccount,
            paramObj = {
              mobilePhone: phoneNumber,
              verificationCode: value
            };
          this.$axios.postAjax(serviceUrl.checkValiCode, paramObj).then((res)=>{
            if(res.code === 200) {
              const result = res.content.status;
              if (result === false) {
                callback(new Error('请输入正确的验证码'));
              } else {
                callback();
              }
            }
          })
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
        ruleForm: {
          loginAccount: '',
          verifyCode: ''
        },
        rules: {
          loginAccount: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { validator: checkPhone, trigger: 'change' },
            { validator: checkPhone, trigger: 'blur' }
          ],
          verifyCode: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            { validator: checkValicode, trigger: 'blur' }
          ]
        },
        isShow: true,
        isDisable: true,
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
      goBack() {
        this.$router.go(-1);
      },
      getCode() {
        const loginAccount = this.ruleForm.loginAccount;
        if (loginAccount) {
          this.isDisable = true;
          this.isShow = false;
          this.timeCount(60);
          const paramObj = {
            mobilePhone: loginAccount
          };
        this.$axios.postAjax(serviceUrl.verifyCode, paramObj).then((res) => {
          if(res.code !== 200) {
                  this.$message({
                type: 'error',
                message: error.content || '验证码发送失败',
                duration: 5000
              });
          }
        })
        } else {
          return false;
        }
      },
      timeCount(time) {
        window.setTimeout(() => {
          let t = time;
          t -= 1;
          if (t === 0) {
            this.isShow = true;
            if (this.ruleForm.loginAccount) {
              this.isDisable = false;
            }
          } else {
            document.querySelector('#number').innerHTML = t;
            this.timeCount(t);
          }
        }, 1000);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.btnDisabled = true;
            const accountObj = {
                mobilePhone: this.ruleForm.loginAccount,
                verificationCode: this.ruleForm.verifyCode
              },
            accountString = JSON.stringify(accountObj);
            localStorage.setItem('account', accountString);
            this.$router.push('/resetPwd')
          } else {
            return false;
          }
        });
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
    }
  };
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import "../../assets/scss/findPwd.scss";
  @import "../../assets/scss/common.scss";
  
  .formlist {
    margin: 50px;
  }
  .bg-logreg {
    background: url(../../assets/images/login/sepline.jpg) repeat-x center center
    }

  .el-form-item {
    margin-bottom: 20px;
    text-align: left;
  }
  .el-input{
    position: relative;
    font-size: 14px;
    text-align: left;

      /deep/ .el-input__inner {
        width: 260px;
        height: 28px;
        border-radius: 3px;
    }
  }
.el-button--primary{
  background-color: $uiColor !important;
  border-color: $uiColor !important;
  color: #fff !important;
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
