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
              <h2 class="logtit fl">注册与激活<em>REGISTRATION & ACTIVATION</em></h2><p class="lognow fr">已有账号？直接去 <a href="/login">登录</a></p>
            </div>
            <div class="steps">
              <ul>
                <li class="step1 focus">1、填写个人信息</li>
                <li class="step2">2、填写公司信息</li>
                <li class="step3">3、注册成功</li>
              </ul>
            </div>
            <div class="regbd">
              <div id="userForm">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="reg-form formlist">
                  <el-form-item label="手机号" prop="loginAccount">
                    <el-row>
                      <el-col :span="9">
                        <el-input v-model='ruleForm.loginAccount' placeholder="请输入手机号码" name="loginAccount" id="loginAccount" :maxlength="11"></el-input>
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
                  <el-form-item label="密码" prop="password">
                    <el-row>
                      <el-col :span="9">
                        <input type="text" v-model='ruleForm.loginAccount' class="fake-input">
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
                  <el-form-item prop="agree">
                    <el-checkbox v-model="ruleForm.agree">同意《<a :href="appInfo.registrationUrl" target="_blank">{{ appInfo.registrationName }}</a>》</el-checkbox>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')" :disabled="btnDisabled">提交并注册</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <!-- dialog -->
          <el-dialog
            :title="appInfo.specialTipsName"
            :visible.sync="dialogVisible"
            size="large">
            <div class="rules-frame">
              <iframe :src="appInfo.specialTipsUrl" frameborder="0" scrolling="auto" class="rule-frame"></iframe>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">不同意</el-button>
              <el-button type="primary" @click="confirmSubmit()">同 意</el-button>
            </span>
          </el-dialog>
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
	import { hostUrl } from '@/config/config.js'
	import serviceUrl from '@/api/servise.js'
  // import * as apiConst from '../../api/ApiConst';
//   import * as registerService from '../../api/registerService';
//   import { webapp,otherapp } from '../../api/LoginService';

  // import * as Utils from '../../api/Utils';

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
        },
        checkPhone = (rule, value, callback) => {
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
								if (res.code == 200) {
									callback();
									this.isDisable = false;
									this.username = this.ruleForm.loginAccount;
								} else {
									callback(new Error('帐号已存在，请直接登录'));
								}
							})
            }
          } else {
            this.isDisable = true;
          }
        },
        checkValicode = (rule, value, callback) => {
          const phoneNumber = this.ruleForm.loginAccount,
            paramObj = {
              mobilePhone: phoneNumber,
              verificationCode: value
						};
					this.$axios.postAjax(serviceUrl.checkRegisterCode, paramObj).then((res)=> {
						if (res.code == 200) {
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
          ICP: '',
          tradeRulesName: '',
          tradeRulesUrl: '',
          registrationName: '',
          registrationUrl: '',
          specialTipsName: '',
          specialTipsUrl: '',
          clientAgreementName: '',
          clientAgreementUrl: '',
          driverAgreementName: '',
          driverAgreementUrl: '',
          registrationFunction: '',
          coreOrgName: '',
          coreOrgFullName: '',
          coreOrgCode: '',
          defaultOrgType: null,
          defaultScheduleType: '',
          enableScheduleType: '',
          contractName: '',
          contractUrl: '',
          reportLocation: '',
          complianceCheck: '',
          certControl: '',
          reportDomain: '',
          projectName: '',
          priceMode: '',
          icbcPay: '',
          showMatch: '',
          platformLogoUrl: '',
          platformName: ''
        },
        pwdPlaceholder: '密码长度为8-15位',
        ruleForm: {
          loginAccount: '',
          verifyCode: '',
          password: '',
          password2: '',
          agree: false
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
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 8, max: 15, message: '密码由8-15位的字母大小写、数字、特殊字符三种或以上组成，不允许空格。', trigger: 'blur' }
            // { validator: checkPass, trigger: 'blur' }
          ],
          password2: [
            { required: true, message: '请输入确认密码', trigger: 'blur' },
            { validator: comparePass, trigger: 'blur' }
          ]
        },
        username: '',
        isShow: true,
        isDisable: true,
        weak: false,
        centre: false,
        strong: false,
        btnDisabled: false,
        dialogVisible: false,
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
      getCode() {
        const loginAccount = this.ruleForm.loginAccount;
        if (loginAccount) {
          this.isDisable = true;
          this.isShow = false;
          this.timeCount(60);
          const paramObj = {
            mobilePhone: loginAccount
					};
					this.$axios.postAjax(serviceUrl.registerVerifyCode, paramObj).then((res) => {
						if(res.code !== 200) {
							this.$message({
                type: 'error',
                message: res.content || '验证码发送失败',
                duration: 5000
              });
              return false;
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
      confirmSubmit() {
				this.btnDisabled = true;
				this.$axios.postAjax(serviceUrl.addUser, this.ruleForm).then((res)=>{
					if(res.code === 200) {
						this.$router.push('/registerCompany');
						this.btnDisabled = false;
					}else{
						this.$message({
              type: 'error',
              message: error.content,
              duration: 5000
            });
            this.btnDisabled = false;
            return false;
          
					}
				})
      },
      submitForm(formName) {
				
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.ruleForm.agree) {
              this.dialogVisible = true;
            } else {
              this.$message({
                type: 'warning',
                message: '请勾选同意平台协议',
                duration: 3000
              });
              return false;
            }
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
      if (lsObj) {
        this.appInfo.appName = lsObj.appName;
        this.appInfo.logoUrl = lsObj.logoUrl;
        this.appInfo.logoWidth = lsObj.logoWidth;
        this.appInfo.logoHeight = lsObj.logoHeight;
        this.appInfo.hotline = lsObj.hotline;
        this.appInfo.background = lsObj.background;
        this.appInfo.appDomain = lsObj.appDomain;
        this.appInfo.company = lsObj.company;
        this.appInfo.ICP = lsObj.ICP;
        this.appInfo.tradeRulesName = lsObj.tradeRulesName;
        this.appInfo.tradeRulesUrl = lsObj.tradeRulesUrl;
        this.appInfo.registrationName = lsObj.registrationName;
        this.appInfo.registrationUrl = lsObj.registrationUrl;
        this.appInfo.specialTipsName = lsObj.specialTipsName;
        this.appInfo.specialTipsUrl = lsObj.specialTipsUrl;
        this.appInfo.clientAgreementName = lsObj.clientAgreementName;
        this.appInfo.clientAgreementUrl = lsObj.clientAgreementUrl;
        this.appInfo.driverAgreementName = lsObj.driverAgreementName;
        this.appInfo.driverAgreementUrl = lsObj.driverAgreementUrl;
        this.appInfo.registrationFunction = lsObj.registrationFunction;
        this.appInfo.coreOrgName = lsObj.coreOrgName;
        this.appInfo.coreOrgFullName = lsObj.coreOrgFullName;
        this.appInfo.coreOrgCode = lsObj.coreOrgCode;
        this.appInfo.defaultOrgType = lsObj.defaultOrgType;
        this.appInfo.defaultScheduleType = lsObj.defaultScheduleType;
        this.appInfo.enableScheduleType = lsObj.enableScheduleType;
        this.appInfo.contractName = lsObj.contractName;
        this.appInfo.contractUrl = lsObj.contractUrl;
        this.appInfo.reportLocation = lsObj.reportLocation;
        this.appInfo.complianceCheck = lsObj.complianceCheck;
        this.appInfo.certControl = lsObj.certControl;
        this.appInfo.reportDomain = lsObj.reportDomain;
        this.appInfo.projectName = lsObj.projectName;
        this.appInfo.priceMode = lsObj.priceMode;
        this.appInfo.icbcPay = lsObj.icbcPay;
        this.appInfo.showMatch = lsObj.showMatch; // 中交兴路是否显示匹配车辆信息
        this.appInfo.platformLogoUrl = lsObj.platformLogoUrl; // 平台LOGO标识
        this.appInfo.platformName = lsObj.platformName; // 平台名称
        this.appInfo.needAuthc = lsObj.needAuthc;

      }
    },
    mounted() {
      this.dealWithPwdCheck();
    }
  };
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import "../../assets/scss/common.scss";
  @import "../../assets/scss/register.scss";

  .rule-frame {
    width: 100%;
    height: 300px;
	}
	.el-form-item{
		/deep/.el-form-item__content{
			/deep/.el-form-item__error{
				right: 490px !important;
				z-index: 10;
				top: -40%;
				right: 0;
				left: auto;
				padding: 5px 10px;
				background-color: rgba(0, 0, 0, 0.6);
				border-radius: 3px;
				color: #fff;
				white-space: nowrap;
			}
		}
	}
	
	
	.el-button--primary{
   background-color: $uiColor !important;
   border-color: $uiColor !important;
   color: #fff !important;
 }
	.el-form-item {
    margin-bottom: 7px;
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
  

  .fake-input {
    position: absolute;
    z-index: -10;
    opacity: 0;
    width: 0;
    height: 0;
    overflow: hidden;
  }

  .el-button {
    height: 28px;
    line-height: 0;
  }
</style>
