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
                <li class="step1">1、确认账号</li>
                <li class="step2 sibg">2、重置密码</li>
                <li class="step3 focus">3、完成</li>
              </ul>
            </div>
            <div id="regSuccess">
              <div class="regbd">
                <!-- register feedback -->
                <div class="reg-feedback clearfix">
                  <!-- result 1 -->
                  <div class="reg-result bg-green tc">
                    <i class="ico-success"></i>
                    <h3 class="reg-tit green">恭喜您，密码重置成功！！</h3>
                  </div>
                  <!-- wel-section -->
                  <div class="wel-section">
                    <p class="tc">系统将会在 <strong class="red" id="number">10</strong> 秒后自动跳转至登录页面。</p>
                    <p class="tc">
                      <a href="/login" class="btn-highlight">立即登录</a>
                    </p>
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

  export default {
    components:{
      loginHeader,
      loginFooter
    },
    data() {
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
        number: 0,
        counter: 0,
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
      timeCount(time) {
        window.setTimeout(() => {
          let t = time;
          t -= 1;
          if (t === 0) {
            this.$router.push('/login')
          } else {
            document.querySelector('#number').innerHTML = t;
            this.timeCount(t);
          }
        }, 1000);
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
      
      this.timeCount(10);
    },
    mounted() {
      // this.timer();
    }
  };
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import "../../assets/scss/findPwd.scss";
  .wel-section {
    strong {
      font-size: 18px;
      font-weight: 700;
    }
  }
  #userName {
    font-size: 20px;
  }
</style>
