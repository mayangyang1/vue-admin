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
                <li class="step1 sibg">1、填写个人信息</li>
                <li class="step2 focus">2、填写公司信息</li>
                <li class="step3">3、注册成功</li>
              </ul>
            </div>
            <div class="regbd">
              <!-- register feedback -->
              <div class="reg-feedback clearfix">
                <!-- result 1 -->
                <div class="reg-result bg-green tc">
                  <i class="ico-success"></i>
                  <h3 class="reg-tit green">恭喜您，个人信息注册成功！</h3>
                </div>
                <!-- result 2 -->
                <div class="reg-result bg-org tc hide">
                  <i class="ico-info"></i>
                  <h3 class="reg-tit org">很抱歉，注册失败！</h3>
                </div>
                <!-- result 3 -->
                <div class="reg-result bg-red tc hide">
                  <i class="ico-error"></i>
                  <h3 class="reg-tit red">很抱歉，服务器内部错误！</h3>
                </div>
                <!-- join-section -->
                <div class="join-section">
                  <div id="orgWrap">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="reg-form formlist">
                      <!-- <el-form-item label="邀请码" prop="inviteCode">
                        <el-row>
                          <el-col :span="6">
                            <el-input v-model='ruleForm.inviteCode' placeholder="请输入邀请码" name="inviteCode"></el-input>
                          </el-col>
                          <el-col :span="18">
                            <span class="light">目前平台处于邀请试用阶段。如想体验，请拨打热线021-20534899，以获取邀请码！</span>
                          </el-col>
                        </el-row>
                      </el-form-item> -->
                      <el-form-item label="请选择公司类型" prop="orgType" v-if="showOrgType">
                        <el-radio-group v-model="ruleForm.orgType">
                          <el-radio :label="3">托运方(B)</el-radio>
                          <span class="light">说明：货主或者有货源的物流公司</span>
                          <el-radio :label="2">承运方(b)</el-radio>
                          <span class="light">说明：车队、信息部或者小物流公司</span>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="公司全称" prop="orgFullName">
                        <el-input v-model='ruleForm.orgFullName' placeholder="请输入工商局注册的公司全称" name="orgFullName"></el-input>
                      </el-form-item>
                      <!-- <el-form-item label="公司所在地区" class="is-required">
                        <el-row>
                          <el-col :span="6">
                            <el-form-item prop="province">
                              <el-select v-model="ruleForm.province" placeholder="请选择省" @change="provinceChange">
                                <el-option
                                  v-for="item in province"
                                  :key="item.id"
                                  :label="item.value"
                                  :value="item.id"
                                  name="province">
                                </el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <el-form-item prop="city">
                              <el-select v-model="ruleForm.city" placeholder="请选择市" @change="cityChange">
                                <el-option
                                  v-for="item in city"
                                  :key="item.id"
                                  :label="item.value"
                                  :value="item.id"
                                  name="city">
                                </el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <el-form-item prop="county">
                              <el-select v-model="ruleForm.county" placeholder="请选择区">
                                <el-option
                                  v-for="item in county"
                                  :key="item.id"
                                  :label="item.value"
                                  :value="item.id"
                                  name="county">
                                </el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <el-form-item prop="address">
                              <el-input v-model='ruleForm.address' placeholder="请输入详细地址" name="address"></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </el-form-item> -->
                      <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')" :disabled="btnDisabled">提交注册信息</el-button>
                      </el-form-item>
                    </el-form>
                  </div>
                </div>
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
  // import * as apiConst from '../../api/ApiConst';

//   import * as registerService from '../../api/registerService';

//   import * as DataSourceService from '../../api/DataSourceService';

  // import * as Utils from '../../api/Utils';

  // const axios = require('axios');

  export default {
    components:{
      loginHeader,
      loginFooter
    },
    data() {
      const checkInviteCode = (rule, value, callback) => {
          const paramObj = {
            inviteCode: value
          };
        //   registerService.checkInviteCode(paramObj, (success, error) => {
        //     if (success) {
        //       const result = success.content.status;
        //       if (result === false) {
        //         callback(new Error('请输入正确的邀请码'));
        //       } else {
        //         callback();
        //       }
        //     }
        //     if (error) {
        //       console.log(error);
        //     }
        //   });
        },
        checkOrgName = (rule, value, callback) => {
          const paramObj = {
            'field': 'orgFullName',
            'value': value
          };
          this.$axios.postAjax(serviceUrl.validateCompany, paramObj).then((res)=>{
            if(res.code == 200) {
              const result = res.content.status;
              if (result === false) {
                callback(new Error('该公司已被注册，请联系管理员！'));
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
          inviteCode: '',
          orgType: 3,
          orgFullName: ''
          // province: '',
          // city: '',
          // county: '',
          // address: '',
          // loginAccount: window.localStorage.loginAccount
        },
//         province: [],
//         city: [],
//         county: [],
        rules: {
          // inviteCode: [
          //   { required: true, message: '请输入邀请码', trigger: 'blur' },
          //   { validator: checkInviteCode, trigger: 'blur' }
          // ],
          // orgType: [
          //   { required: true, message: '请选择公司类型', trigger: 'change' }
          // ],
          orgFullName: [
            { required: true, message: '请输入公司全称', trigger: 'blur' },
            { min: 2, max: 50, message: '公司全称至少输入2个字，最多50个字', trigger: 'blur' },
            { validator: checkOrgName, trigger: 'blur' }
          ]
          // province: [
          //   { required: true, message: '请选择省', trigger: 'change', type: 'string' }
          // ],
          // city: [
          //   { required: true, message: '请选择市', trigger: 'change', type: 'string' }
          // ],
          // county: [
          //   { required: true, message: '请选择区', trigger: 'change', type: 'string' }
          // ],
          // address: [
          //   { required: true, message: '请输入详细地址', trigger: 'blur' }
          // ]
        },
        options: [
          {
            value: 2,
            label: '承运方'
          },
          {
            value: 3,
            label: '托运方'
          }
        ],
        btnDisabled: false,
        showOrgType: false
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
      submitForm(formName) {
        
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.btnDisabled = true;
            this.$axios.postAjax(serviceUrl.registerOrg, this.ruleForm).then((res) => {
              if(res.code === 200) {
                this.$router.push('/registerSuccess')
                this.btnDisabled = false;
              }else{
                this.$message({
                  type: 'error',
                  message: res.content,
                  duration: 5000
                });
                this.btnDisabled = false;
                return false;
              }
            })
          } else {
            return false;
          }
        });
      },
    //   provinceChange(item) {
    //     DataSourceService.city.getData({ keyword: item }, (dataSource) => {
    //       console.log(dataSource);
    //       this.city = dataSource;
    //     });
    //   },
    //   cityChange(item) {
    //     DataSourceService.county.getData({ keyword: item }, (dataSource) => {
    //       console.log(dataSource);
    //       this.county = dataSource;
    //     });
    //   }
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

      // 如果配置里面没有默认组织类型，则显示组织类型字段
      if (!lsObj.defaultOrgType) {
        this.showOrgType = true;
      } else {
        this.showOrgType = false;
        this.ruleForm.orgType = lsObj.defaultOrgType;
      }

      // console.log('lsObj.defaultOrgType is', lsObj.defaultOrgType);
      // this.showOrgType = lsObj.defaultOrgType ? true : false;

      // DataSourceService.province('', (dataSource) => {
      //   this.province = dataSource;
      // });
    }
  };
</script>

<style lang="scss" scoped rel="stylesheet/scss">
@import "../../assets/scss/common.scss";
@import "../../assets/scss/register.scss";
.el-button--primary{
   background-color: $uiColor !important;
   border-color: $uiColor !important;
   color: #fff !important;
 }
.el-radio-group {
  position: relative;
  width: 100%;
  .el-radio {
    display: block;
    margin-bottom: 10px;
    text-align: left;
  }
  .light {
    position: absolute;
    top: 0;
    left: 80px;
    font-size: 14px;
    &:last-child {
      top: 28px;
    }
  }
}
</style>

