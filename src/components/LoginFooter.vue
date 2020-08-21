<template>
  <footer class="footer">
    <p>
      为了您可以更好的使用{{ appInfo.appName }}系统，请使用 Chrome(谷歌) 浏览器<br>
      为了能够浏览或下载{{ appInfo.appName }}系统内的文档，您需要在浏览器设置中允许来自{{ appInfo.appDomain }} 的弹出窗口。
    </p>
    <p class="copyright">
      &copy; Copyright {{ years }} {{ appInfo.company }} All Rights Reserved. <a href="http://www.miitbeian.gov.cn" target="_balnk"> {{ appInfo.ICP }} </a> <br> <span v-if="powerBy">Powered by <a href="http://www.rltx.com" target="_blank">融链天下</a></span>
      <!-- <a v-if="isDev" href="javascript:;" @click="apiVisible = true"><i class="el-icon-setting" /></a> -->
    </p>
  </footer>
</template>
<script type="text/ecmascript-6">
// import Observer from '../common/observer'
// var apiConst = require('../../api/ApiConst');
export default {
  name: 'loginHeader',
  props: {
    appInfo: {
      type: Object,
      'default': {}
    },
    isLoginPage: {
      type: Boolean,
      'default': false
    }
  },
  computed: {
  },
  data() {
    return {
      years: '',
      powerBy: true,
      appDomainUrl: window.localStorage.getItem('domain_url') || process.env.rltx,
      apiVisible:false,
    //   isDev:apiConst.env==='dev'
    }
  },
  methods: {
    handleSetting() {
      this.apiVisible = false
      if(this.appDomainUrl) {
        window.localStorage.setItem('domain_url', this.appDomainUrl)
      }
      window.location.reload()
    },
    handleresetSetting() {
      window.localStorage.removeItem('domain_url')
      window.location.reload()
    },
    getYearsTest() {
      let webappConfig = JSON.parse(localStorage.getItem('webappConfig')),
        start = '2019',
        end = new Date().getFullYear(),
        text = '';
        if(webappConfig && webappConfig['webapp.copyright.start.time']) start = webappConfig['webapp.copyright.start.time']
      text = start === end ? `${start}` : `${start}-${end}`;
      this.years = text;
    },
    getPowerBy() {
      let result = true,
        webappConfig = JSON.parse(localStorage.getItem('webappConfig'));
      if (webappConfig && webappConfig['webapp.powered.company'] === 'FALSE') result = false;
      this.powerBy = result;
    }
  },
  mounted() {
  },
  created() {
    let self = this;
    if (self.isLoginPage) {
    //   Observer.addObservers('webappConfig',(res) => {
        self.getYearsTest();
        self.getPowerBy();
    //   });
    } else {
      self.getYearsTest();
      self.getPowerBy();
    }
  }
};

</script>

<style>
.el-input__inner {
      padding-left: 10px;
    }

</style>
