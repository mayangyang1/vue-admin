<template>
  <div class="custom-page" id='page_layout_fright'>
    <div class="section">
      <h2 class="tmp-title">
        基本信息
      </h2>
      <el-row class="el-row">
        <!-- 调车模式-->
        <el-col :span="12">
          <el-form-item label="调车模式"  :required="true">
            <slot name="scheduleType"></slot>
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
        <!-- 货源编号 -->
        <el-col :span="12">
          <el-form-item label="货源号" :required="true">
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
          <el-form-item label="订单号" :required="true">
            <div class="flex-fs">
              <slot name="logisticsNo"></slot>
              <slot name="popSelect"></slot>
            </div>
          </el-form-item>
        </el-col>
        <!--计量标准  -->
        <el-col :span="12">
          <el-form-item label="计量标准" :required="true">
            <slot name="meterageType"></slot>
          </el-form-item>
        </el-col>
        <!--货源有效期  -->
        <el-col :span="12">
          <el-form-item label="货源有效期" :required="false">
            <slot name="freightEndTime"></slot>
          </el-form-item>
        </el-col>
        <!--车长要求  -->
        <el-col :span="24">
          <el-form-item label="车长要求" :required="false">
            <slot name="truckLengthRequire"></slot>
          </el-form-item>
        </el-col>
        <!--备注  -->
        <el-col :span="24">
          <el-form-item label="备注" :required="true">
            <slot name="description"></slot>
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
  .el-row{
    padding: 20px;
  }
  .sepline {
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: solid 1px #ddd;
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
  }

  .el-form-item__content{
    line-height: 24px;
    .el-input{
      width: auto;
      width: 120px;
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
