<template>
    <!-- <div>
        <el-card class="login-card">
            <div class="logos">
                <img src="../assets/images/logo.png" alt="">
            </div>
            <div class="input"><input v-model="userName" placeholder="请输入用户名" type="text"></div>
            <div class="input"><input v-model="password" placeholder="请输入密码"  type="password"></div>
            <div class="btn" @click="login">确定</div>
            <span>账号:123 密码:123</span>
           
        </el-card>
        
    </div> -->
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
            <div class="inner clearfix login-bg" :style="appInfo.background ? {backgroundImage: 'url(' + appInfo.background + ')'} : ''">
            <!-- login form -->
                <div class="logform fl">
                    <h2 class="logtit">用户登录<em>USER LOGIN</em></h2>
                    <fieldset>
                    <!-- <legend>用户登录表单</legend> -->
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="loglist">
                        <el-form-item prop="loginAccount">
                            <el-input v-model='ruleForm.loginAccount' placeholder="请输入用户名" name="loginAccount" class="loginAccount"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input type="password" v-model='ruleForm.password' placeholder="请输入密码" name="password" class="password"></el-input>
                            <span @click="toFindPwd" class="forget-pwd">忘记密码？</span>
                        </el-form-item>
                        <!-- <el-form-item> -->
                            <el-button type="primary" class="button" @click="login('ruleForm')">登录</el-button>
                        <!-- </el-form-item> -->
                        </el-form>
                    </fieldset>
                </div>
                <div class="regrec fr">
                    <!-- <h2>XX物流平台</h2>
                    <p>——中国领先的物流服务整合平台</p>
                    <p>随时随地，找货无忧！</p>
                    <p>立刻注册，享受更多车源货源信息服务！</p> -->
                    <div class="el-button el-button--line" @click="toRegister" v-if="showRegister">注册与激活</div>
                    <!-- <a href="/register/personal.html" class="el-button el-button--line">账号激活</a> -->
                </div>
            </div>
        </div>
    </div>
        <!-- footer -->
    <loginFooter :appInfo = 'appInfo'></loginFooter>
  </div>
</template>

<script>
import loginHeader from '@/components/LoginHeader.vue'
import loginFooter from '@/components/LoginFooter.vue'
import JSEncrypt from 'jsencrypt/bin/jsencrypt';
import serviceUrl from '@/api/servise.js'
import Qs from 'qs'
export default {
    name: 'login',
    components: {
        loginHeader,
        loginFooter
    },
    data() {
      return {
        userName: '',
        password: '',
        ruleForm: {
            loginAccount: '',
            password: ''
        },
        showRegister: false,
        rules: {
            loginAccount: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
            ],
            password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
            ]
        },
        theme: '',
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
      }
    },
  methods: {
    login(formName) {
      const that = this;
      this.$refs[formName].validate((valid) => {
        if(valid) {
          that.loginInfo()
        }
      })
    },
    toFindPwd() {
      this.$router.push('/findPwd');
    },
    toRegister(){
      this.$router.push('/enterprise');
    },

    login() {
      let data = {
        "account": this.ruleForm.loginAccount.trim(),
        "password": this.rsaPwd(this.ruleForm.password.trim())
      }
      this.$axios.post(serviceUrl.login,Qs.stringify(data),
      {headers:{'Content-Type':'application/x-www-form-urlencoded'}} 

      ).then(res => {
        if(res.code === 200) {
          let permissionList = res.content.permissionCodeList;
          localStorage.setItem('permissionList', JSON.stringify(permissionList))
          localStorage.setItem('loginInfo', JSON.stringify(res.content))
          this.getAreaInfo();
          this.getTruckModelListInfo();
          this.$router.push('/');
        }else{
           this.$message.error(res.content);
        }
      })
    },
    rsaPwd(pwd) {
      let rsaPwd = '';
      const encryptor = new JSEncrypt({default_key_size:2048}),
      publicKey = localStorage.getItem('publicKey');
      encryptor.setPublicKey(publicKey);
      rsaPwd = encryptor.encrypt(pwd);
      return rsaPwd;
    },
    getWebAppInfo() {
      this.$axios.get(serviceUrl.webappInfo).then((res)=> {
        if(res.code === 200) {
            const data = res.content || {};
            localStorage.setItem('webappConfig',JSON.stringify(data));
            this.appInfo.appName = data['webapp.appName'] || '融链天下';
            this.appInfo.logoUrl = data['webapp.logoUrl'];
            this.appInfo.logoWidth = data['webapp.logoWidth'];
            this.appInfo.logoHeight = data['webapp.logoHeight'];
            this.appInfo.hotline = data['webapp.hotline'] || '021-20534899';
            this.appInfo.background = data['webapp.background'];
            this.appInfo.appDomain = data['webapp.appDomain'] || 'member.rltx.com';
            this.appInfo.company = data['webapp.company'] || '上海融链科技有限公司';
            this.appInfo.ICP = data['webapp.ICP'] || '沪ICP备15012288号-1';
            this.appInfo.tradeRulesName = data['webapp.tradeRulesName'] || '融链天下平台交易规则';
            this.appInfo.tradeRulesUrl = data['webapp.tradeRulesUrl'] || 'http://download2.rltx.com/yfb-xieyi/tradeRulesName.htm';
            this.appInfo.registrationName = data['webapp.statement.registrationName'] || '平台注册服务协议';
            this.appInfo.registrationUrl = data['webapp.statement.registrationUrl'] || 'http://download2.rltx.com/yfb-xieyi/registration.htm';
            this.appInfo.specialTipsName = data['webapp.specialTipsName'] || '特别提示';
            this.appInfo.specialTipsUrl = data['webapp.specialTipsUrl'] || 'http://download2.rltx.com/yfb-xieyi/publishfreightRules.htm';
            this.appInfo.clientAgreementName = data['webapp.clientAgreementName'] || '委托调车客户服务协议';
            this.appInfo.clientAgreementUrl = data['webapp.clientAgreementUrl'] || 'http://download2.rltx.com/yfb-xieyi/clientAgreement.html';
            this.appInfo.driverAgreementName = data['webapp.driverAgreementName'] || '委托调车司机承运协议';
            this.appInfo.driverAgreementUrl = data['webapp.driverAgreementUrl'] || 'http://download2.rltx.com/yfb-xieyi/driverAgreement.html';
            this.appInfo.registrationFunction = data['webapp.registrationFunction'] || 'false';
            this.appInfo.coreOrgName = data['coreOrgName'] || '';
            this.appInfo.coreOrgFullName = data['coreOrgFullName'] || '';
            this.appInfo.coreOrgCode = data['coreOrgCode'] || '';
            this.appInfo.defaultOrgType = data['webapp.defaultOrgType'] || '';
            this.appInfo.defaultScheduleType = data['webapp.defaultScheduleType'] || '';
            this.appInfo.enableScheduleType = data['webapp.enableScheduleType'] || 'TRUE';
            this.appInfo.contractName = data['webapp.contractName'] || '';
            this.appInfo.contractUrl = data['webapp.contractUrl'] || '';
            this.appInfo.reportLocation = data['webapp.reportLocation'] || '';
            this.appInfo.complianceCheck = data['webapp.complianceCheck'] || '';
            this.appInfo.reportDomain = data['webapp.reportDomain'] || '';
            this.appInfo.projectName = data['webapp.projectName'] || '';
            this.appInfo.priceMode = data['webapp.priceMode'] || '';
            this.appInfo.icbcPay = data['webapp.icbcPay'] || '';
            this.appInfo.showMatch = data['webapp.showMatch'] || ''; // 中交兴路是否显示匹配车辆信息
            this.appInfo.platformLogoUrl = data['webapp.platformLogoUrl'] || ''; // 平台LOGO标识
            this.appInfo.platformName = data['webapp.platformName'] || ''; // 平台名称

            this.showRegister = this.appInfo.registrationFunction === 'true';
            // this.appInfo.needAuthc = data['webapp.dispatch.need.authc'] || ''; //
            this.appInfo.baoshangPay = data['webapp.baoshangPay'] || ''; // 包商pay

            this.theme = this.appInfo.projectName === 'yunxing';
            if (this.theme) {
            document.querySelector('body').classList.add('theme-blue');
            }
            localStorage.setItem('appInfo',JSON.stringify(this.appInfo));

            
          }
        })
        
      },
    getOtherInfo() {
      this.$axios.get(serviceUrl.otheInfo).then((res)=>{
        if(res.code === 200) {
          const data = res.content || {};
          localStorage.setItem('otherappConfig',JSON.stringify(data));
        }
      })
        
    },
    getAreaInfo() {
      this.$axios.get(serviceUrl.areaInfo).then((res)=>{
        if(res.code === 200) {
          localStorage.setItem('areaInfo',JSON.stringify(res.content));
        }
      })
    },
    getTruckModelListInfo() {
      this.$axios.get(serviceUrl.truckModelList+'?page=1&size=500').then((res)=> {
        if(res.code === 200 && res.content.length > 0) {
          let truckModelConfig = {};
          let truckModelList = res.content;
          truckModelList.forEach((item)=>{
            truckModelConfig[item.code] = item.truckModelName
          })

          localStorage.setItem('truckModelConfig',JSON.stringify(truckModelConfig))
        }
      })
    }

  },
    created() {
      this.getWebAppInfo();
      this.getOtherInfo();
      
    }
}
</script>
<style lang="scss"scoped  rel="stylesheet/scss">
@import "../../assets/scss/common.scss";
 a {
  color: #666;
}
.bg-logreg {
  background: url(../../assets/images/login/sepline.jpg) repeat-x center center
}
.wlqr {
  margin-right: 12px;
  position: relative
}


.qrbox {
  width: 154px;
  height: 154px;
  background: #fff url(../../assets/images/login/qrcode.jpg) no-repeat center center;
  padding: 8px;
  position: absolute;
  z-index: 100;
  right: -94px;
  top: 25px;
  display: none;
  box-shadow: 0 0 10px #666
}

.qrbox:before {
  content: "";
  width: 0;
  height: 0;
  position: absolute;
  overflow: hidden;
  top: -8px;
  right: 112px;
  border-bottom: solid 8px #fff;
  border-top: 0;
  border-right: solid 8px transparent;
  border-left-color: transparent
}

.wlqr:hover .qrbox {
  display: block;
  box-shadow: 0 0 10px #ccc
}

.header {
  padding: 15px 0
}

.logo {
	width: 194px;
	height: 44px;
	// background-image: url(img/logo-medium.png);
	background-repeat: no-repeat;
	overflow: hidden;
	text-indent: -160%;
}

.btn-highlight,.btn-normal,.btn-normal:hover {
	display: inline-block;
	height: 32px;
	width: 298px;
	line-height: 32px;
	font-size: 18px;
	font-family: microsoft yahei;
	color: #fff;
	text-align: center;
	background: $uiColor;
	border: solid 1px $uiColor;
	border-radius: 4px
}

.btn-highlight:hover,.btn-normal {
	background: #fff;
	color: $uiColor
}

.txtbox {
  height: 22px;
  line-height: 22px;
  padding: 0 5px;
  border: solid 1px #dadada;
  border-radius: 3px;
  transition: all .2s ease-in-out
}

.txtbox:hover {
  border-color: #ccc
}

.focus .txtbox,.txtbox:focus {
	border-color: $uiColor;
	background: #fffbf6;
	color: $uiColor
}

.msginfo {
	padding: 6px 10px;
	background: #fffbf6;
	color: $uiColor;
	font-weight: 700;
	border: dashed 1px $uiColor
}



em {
  font-style: normal
}

.org {
	color: $uiColor
}

.red {
  color: red
}

.green {
  color: #282
}

.blue {
  color: #2778cb
}

.bg-org {
  background-color: #fffaf0
}

.bg-red {
  background-color: #fff0f0
}

.bg-green {
  background-color: #f0fff0
}

.tc {
  text-align: center
}

.logreg {
  background: url(../../assets/images/login/map.png) no-repeat center 0;
}

.logregfm .inner {
  background: #fff;
  border: solid 1px #e6e6e6;
  height: 482px;
}

.logregfm .login-bg {
  background: #fff url(../../assets/images/login/login-bg.jpg) no-repeat right center;
}

.logtxt {
  width: 222px;
  line-height: 24px;
  padding: 6px 38px;
  font-size: 14px;
  letter-spacing: 1px;
}

.logform {
  width: 500px;
  height: 482px;
  border-right: solid 1px #e6e6e6;
  fieldset {
    padding: 20px 100px;
  }
  .button {
      background-color: $uiColor;
      border-color: $uiColor;
  }
}

.logtit {
	font-size: 24px;
	font-weight: 400;
	color: $uiColor;
    padding: 50px 100px 20px;
    text-align: left;
}

.logtit em {
  font-size: 14px;
  color: #999;
  margin-left: 12px;
}

.loglist {
  position: relative;
  min-height: 188px;
  margin-top: 20px;
  .el-button {
    position: absolute;
    bottom: 0;
    left: 0;
  }
}

.regrec {
  width: 300px;
  margin-right: 100px;
  margin-top: 282px;
  h2 {
    font-size: 24px;
    font-weight: normal;
    margin-bottom: 20px;
  }
  p {
    margin-bottom: 20px;
    font-size: 14px;
  }
  .el-button {
    margin-top: 5px;
  }
}

.el-input {
  &:before {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    width: 16px;
    height: 16px;
    overflow: hidden;
    background: url(../../assets/images/login/logreg.png) no-repeat -32px 0;
  }
  /deep/ .el-input__inner{
        width: 300px;
        height: 36px;
        padding-left: 38px;
        border-radius: 3px;
    }
  
}


.password {
  &:before {
    background-position: -48px 0;
  }
}

.catcher {
  &:before {
    background-position: -128px 0;
  }
}



  .el-button {
    width: 300px;
    height: 34px;
    line-height: 32px !important;
    font-size: 16px;
    margin-left: 0 !important;
    padding: 1px 10px !important;
  }
  .el-button--line{
    background-color: #fff !important;
    border-color: #f48400 !important;
    color: #f48400 !important;
 }
  

  .forget-pwd {
    position: absolute;
    z-index: 20;
    right: 5px;
    top: 0px;
    font-size: 12px;
    color: #999 !important;
    cursor: pointer;
    
  }
  .forget-pwd:hover {
      color: #f48400;
    }
</style>