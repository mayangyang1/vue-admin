<template>
  <div class="custom-page" id='page_layout_fright'>
    <div class="mode-select">
      <el-row>
        <!-- 调车模式-->
        <el-col :span="24" class="sepline">
          <div class="flex-fs">
            <el-form-item label="调车模式"  :required="true">
              <slot name="scheduleType"></slot>
            </el-form-item>
            <span class="mgl10" v-if="domainObject['scheduleType'] == 'self'">
              您选择的是
              <strong id="main-color">“自助调车模式”</strong>
              你需要自己跟司机结算
            </span>
            <span class="mgl10" v-if="domainObject['scheduleType'] == 'platform'">
              您选择的是
              <strong id="main-color">“委托调车模式”</strong>
              你可委托平台跟司机结算
            </span>
          </div>
          
        </el-col>
      </el-row>
    </div>
    <div class="section">
      
      <h2 class="tmp-title"> 
        基本信息
      </h2>
      <el-row class="el-row">
        <!-- 货源编号 -->
        <el-col :span="12">
          <el-form-item label="货源编号" :required="false">
            <slot name="freightNo"></slot>
          </el-form-item>
        </el-col>
        <!-- 状态 -->
        <el-col :span="12">
          <el-form-item label="状态"  :required="true">
            <slot name="status"></slot>
          </el-form-item>
        </el-col>
        <!--订单号  -->
        <el-col :span="12">
          <el-form-item label="订单号">
            <div class="flex-fs">
              <slot name="logisticsNo"></slot>
              <slot name="popSelect"></slot>
            </div>
          </el-form-item>
        </el-col>
        <!--客户  -->
        <el-col :span="12">
          <el-form-item label="客户" :required="true">
            <div class="flex-fs">
              <slot name="clientOrgName"></slot>
              <slot name="clientOrgpopSelect"></slot>
            </div>
          </el-form-item>
        </el-col>
        <!-- 结算方式 -->
        <el-col :span="12">
          <el-form-item label="结算方式"  :required="true">
            <slot name="settleMethod"></slot>
          </el-form-item>
        </el-col>
        <!-- 运单生成方式 -->
        <el-col :span="12">
          <el-form-item label="运单生成方式"  :required="true">
            <slot name="dispatchMode"></slot>
          </el-form-item>
        </el-col>
        <!-- 业务类型 -->
        <el-col :span="12">
          <el-form-item label="业务类型"  :required="true">
            <slot name="businessTypeCode"></slot>
          </el-form-item>
        </el-col>
        <!-- 货物类型 -->
        <el-col :span="12">
          <el-form-item label="货物类型"  :required="true">
            <slot name="cargoTypeClassificationCode"></slot>
          </el-form-item>
        </el-col>
        <!-- 货物名称 -->
        <el-col :span="12">
          <el-form-item label="货物名称"  :required="true">
            <slot name="goodsName"></slot>
          </el-form-item>
        </el-col>
        
        <!-- 货物单价 -->
        <el-col :span="12">
          <el-form-item label="货物单价"  >
            <div class="flex-fs">
            <slot name="goodsPrice"></slot>
            <slot name="goodsPriceUnitCode"></slot>
            </div>
          </el-form-item>
        </el-col>
        <!--计量标准  -->
        <el-col :span="12" class="sepline">
          <el-form-item label="计量标准" :required="true">
            <slot name="meterageType"></slot>
          </el-form-item>
        </el-col>
        <!--合理货差系数  -->
        <el-col :span="12" class="sepline">
          <el-form-item label="合理货差系数" :required="true">
            <div class="flex-fs">
              <slot name="goodsLossMethod"></slot>
              <slot name="goodsLoss"></slot>
              <slot name="goodsLossUnitCode"></slot>
            </div>
          </el-form-item>
        </el-col>
        <!--货物重量  -->
        <el-col :span="12">
          <el-form-item label="货物重量" >
            <div class="flex-fs">
              <slot name="goodsWeight"></slot>
              <slot name="goodsWeightUnitCode"></slot>
            </div>
          </el-form-item>
        </el-col>
        <!--货物体积  -->
        <el-col :span="12">
          <el-form-item label="货物体积">
            <div class="flex-fs">
              <slot name="goodsVolume"></slot>
              <slot name="goodsVolumeUnitCode"></slot>
            </div>
          </el-form-item>
        </el-col>
        <!--货物数量  -->
        <el-col :span="12">
          <el-form-item label="货物数量" >
            <div class="flex-fs">
              <slot name="goodsAmount"></slot>
              <slot name="goodsAmountUnitCode"></slot>
            </div>
          </el-form-item>
        </el-col>
        <!--需求车次  -->
        <el-col :span="12">
          <el-form-item label="需求车次">
            <div class="flex-fs">
              <slot name="truckQty"></slot>
              <div class="mgl10">车</div>
            </div>
          </el-form-item>
        </el-col>
        <!--车型要求  -->
        <el-col :span="12">
          <el-form-item label="车型要求">
            <slot name="truckModelRequire"></slot>
          </el-form-item>
        </el-col>
        <!--车长要求  -->
        <el-col :span="24" class="sepline">
          <el-form-item label="车长要求">
            <slot name="truckLengthRequire"></slot>
          </el-form-item>
        </el-col>
        <el-col :span="24" style="padding-left:10px;padding-right:10px;"  class="highlight-bg clearfix clear">
          <!--客户运价  -->
          <el-col :span="12">
            <el-form-item label="客户运价" >
              <div class="flex-fs">
                <slot name="clientFreightPrice"></slot>
                <slot name="clientFreightPriceUnitCode"></slot>

              </div>
            </el-form-item>
          </el-col>
          <!--司机报价类型  -->
          <el-col :span="12">
            <el-form-item label="司机报价类型"  :required="true">
              <div class="flex-fs">
                <slot name="quoteType"></slot>
                <slot name="quotePrice"></slot>
                <slot name="quotePriceUnitCode"></slot>
              </div>
            </el-form-item>
          </el-col>
          <!--司机电子合约模板  -->
          <el-col :span="24">
            <el-form-item class="ssq-mode" label="司机电子合约模板">
              <div class="flex-fs">
                <slot name="ssqTid"></slot>
              </div>
            </el-form-item>
          </el-col>
        </el-col>
        <!--线路名称  -->
          <el-col :span="12">
            <el-form-item label="线路名称" >
              <div class="flex-fs">
                <slot name="routeName"></slot>
                <slot name="routeNamepopSelect"></slot>
              </div>
            </el-form-item>
          </el-col>
          <!-- 标准运距 -->
          <el-col :span="12">
            <el-form-item label="标准运距" >
              <div class="flex-fs">
                <slot name="standardDistance"></slot>
                <slot name="standardDistanceUnitCode"></slot>
              </div>
            </el-form-item>
          </el-col>
          <!-- 发货单位 -->
          <el-col :span="12">
            <el-form-item label="发货单位" >
              <slot name="loadingOrgName"></slot>
            </el-form-item>
          </el-col>
          <!-- 收货单位 -->
          <el-col :span="12">
            <el-form-item label="收货单位" :required="true">
              <slot name="unloadingOrgName"></slot>
            </el-form-item>
          </el-col>
          <!-- 发货单位税号 -->
          <el-col :span="12">
            <el-form-item label="发货单位税号" >
              <slot name="loadingOrgTaxID"></slot>
            </el-form-item>
          </el-col>
          <!-- 收货单位税号 -->
          <el-col :span="12">
            <el-form-item label="收货单位税号" >
              <slot name="unloadingOrgTaxID"></slot>
            </el-form-item>
          </el-col>
          <!-- 发货联系人 -->
          <el-col :span="12">
            <el-form-item label="发货联系人" >
              <slot name="loadingUserFullName"></slot>
            </el-form-item>
          </el-col>
          <!-- 联系收货人 -->
          <el-col :span="12">
            <el-form-item label="联系收货人" >
              <slot name="unloadingUserFullName"></slot>
            </el-form-item>
          </el-col>
          <!-- 发货联系电话 -->
          <el-col :span="12">
            <el-form-item label="发货联系电话" >
              <slot name="loadingUserPhone"></slot>
            </el-form-item>
          </el-col>
          <!-- 收货联系电话 -->
          <el-col :span="12">
            <el-form-item label="收货联系电话" >
              <slot name="unloadingUserPhone"></slot>
            </el-form-item>
          </el-col>
           <!-- 发货地 -->
          <el-col :span="12">
            <el-form-item label="发货地" :required="true">
              <slot name="loadingArea"></slot>
            </el-form-item>
          </el-col>
           <!-- 收货地 -->
          <el-col :span="12">
            <el-form-item label="收货地" :required="true">
              <slot name="unloadingArea"></slot>
            </el-form-item>
          </el-col>
           <!-- 发货详细地址 -->
          <el-col :span="12">
            <el-form-item label="发货详细地址" :required="true">
              <slot name="loadingAddress"></slot>
            </el-form-item>
          </el-col>
           <!-- 收货详细地址 -->
          <el-col :span="12">
            <el-form-item label="收货详细地址" :required="true">
              <slot name="unloadingAddress"></slot>
            </el-form-item>
          </el-col>
           <!-- 联系人 -->
          <el-col :span="8">
            <el-form-item label="联系人" :required="true">
              <slot name="contactUserFullName"></slot>
            </el-form-item>
          </el-col>
           <!-- 联系电话 -->
          <el-col :span="8">
            <el-form-item label="联系电话" :required="true">
              <slot name="contactPhone"></slot>
            </el-form-item>
          </el-col>
        <!--货源有效期  -->
        <el-col :span="8">
          <el-form-item label="货源有效期" :required="true">
            <slot name="freightEndTime"></slot>
          </el-form-item>
        </el-col>
        <!--备注  -->
        <el-col :span="24">
          <el-form-item label="备注">
            <slot name="description"></slot>
          </el-form-item>
        </el-col>
      </el-row>
      <h2 class="tmp-title"> 
        附加项设定
      </h2>
      <el-row>
        <!--是否代开发票 -->
        <el-col :span="24">
          <el-form-item label="是否代开发票">
            <slot name="isProxyInvoice"></slot>
          </el-form-item>
        </el-col>
      </el-row>
      <h2 class="tmp-title"> 
        发布范围
      </h2>
      <el-row>
        <!--发布范围 -->
        <el-col :span="24">
          <el-form-item label="发布范围" :required="true">
            <slot name="releaseRange"></slot>
          </el-form-item>
        </el-col>
      </el-row>
    </div>
    
    <div class="form-button" v-show='editable || !isEdit'>
      <slot name="buttonSubmit"></slot>
      <slot name="buttonReset"></slot>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    domainObject: Object,
    fields: Object,
    isEdit: Boolean,
    isShowTag: Boolean,
    editable: Boolean,
    objectName: '',
    disableModeSelect: {
      type: Boolean,
      'default': false
    },
    clientDetailColumns: Array
  },
  data() {
    return {
      scheduleType: this.domainObject['scheduleType'],
      projectName: JSON.parse(localStorage.getItem('appInfo')).projectName || '',
      centerDialogVisible: false,
      codeImg: '',
      province: '',
      province1: '',
      city: '',
      city1: '',
      county: '',
      county1: '',
      platformLogoUrl: ''
    }
  },
  computed: {
    
  },
  methods: {
   
  },
  mounted() {},
  created() {}
};

</script>
<style lang="scss" rel="stylesheet/scss">
@import "../../assets/scss/common.scss";

#page_layout_fright{

  text-align: left;
  padding-bottom: 20px;
  .innerblock{
    display: flex;
    .el-form-item{
      margin-right: 6px;
    }
  }
  .ssq-mode{
    .el-form-item__label{
      width: 110px!important;
    }
  }
  .el-row {
    position: relative;
    box-sizing: border-box;
  }
  .mode-select{
    margin-bottom: -30px;
    .el-form-item{
      margin-bottom: 0px;
    }
  }
  .highlight-bg {
    padding-top: 10px;
    margin-bottom: 10px;
    background-color: #fff5c0;
  }
  .el-row{
    padding: 20px;
    
  }
  // .el-col{
  //     height: 31px;
  //   }
  .sepline {
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: dashed  1px #ddd;
  }
  .tmp-title {
    margin: 20px 20px 0;
    padding: 10px 20px 10px 10px;
    background-color: #f9fafc;
    font-size: 14px;
    font-weight: 700;
  }
  .el-form-item__label{
    line-height: 24px;
    text-align: left;
    font-size: 12px;
    position: relative;
  }
  .el-form-item.is-required:not(.is-no-asterisk) .el-form-item__label-wrap>.el-form-item__label:before, .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before{
    position: absolute;
    left: -8px;
  }
  .el-select {
    .el-input__inner{
      padding-right: 24px;
    }
    .el-input__icon{
      width:20px;
    }
  }
  .el-form-item{
    margin-bottom: 8px;
  }
  .el-form-item__content{
    line-height: 24px;
    .el-input{
      width: auto;
      width: 130px;
      .el-input__inner:focus {
      border-color: $uiColor;
      outline: 0;
      }
      .el-input__inner{
        height: 24px;
      }
      .el-input__icon{
        line-height: 24px;
      }
    }
    .el-input--suffix{
      width: 100px;
    }
    .el-form-item__error{
      z-index: 10;
    }
  }
  .innerblock .el-date-editor{
    width: 174px!important;
  }
  .el-input__prefix{
   display: none;
    
  }
  .el-input--prefix {
    .el-input__inner{
      padding-left: 10px!important;
    }
  }
  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
    background-color: $uiColor!important;
    border-color: $uiColor!important;
  }
  .el-checkbox__input.is-checked+.el-checkbox__label {
    color: $uiColor!important;
  }
  .el-checkbox__inner:hover {
    border-color: $uiColor!important;
}
.form-button{
  text-align: center;
}
  
  
  
}
</style>
