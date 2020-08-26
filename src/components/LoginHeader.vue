<template>
  <div class="topbar">
    <div class="inner">
      <span class="hotline fr"><i class="ico-tel"></i>24小时客服热线：<strong class="tel">{{ appInfo.hotline }}</strong></span>
        <span v-if="appInfo.projectName === 'lianyungang'" @click="backHome" class="hotline home fl">返回首页</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'loginHeader',
  props:{
  	appInfo:{
  		type:Object,
  		'default':{}
  	},
    isLoginPage:{
      type:Boolean,
      'default':false
    }
  },
  data() {
    return {
    }
  }
};
</script>
<style  lang="scss" rel="stylesheet/scss">
@import "../assets/scss/common.scss";
.topbar {
  height: 30px;
  background: #fff;
  border-bottom: solid 1px #e6e6e6;
  line-height: 30px;

  .inner {
    .home {
      cursor: pointer;
    }
  }
}

.topbar a:hover {
	color: $uiColor
}
.ico-phone,
.ico-qr,
.ico-tel {
  display: inline-block;
  width: 14px;
  height: 14px;
  margin: 8px 6px 8px 0;
  vertical-align: middle;
  background: url(../assets/images/login/logreg.png) no-repeat -1px -1px
}

.ico-tel {
  background-position: -1px -17px
}

.ico-phone {
  background-position: -17px -1px
}

.tel {

	color: $uiColor;
	font-size: 18px
}
   .inner {
  width: 1000px;
  margin: 0 auto
}

</style>