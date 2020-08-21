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
   

</style>