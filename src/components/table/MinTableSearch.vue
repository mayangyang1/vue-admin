/**
* mintableSearch.vue
*/
<template>
  <div class="mini-search" id="miniSearch">
    <div class="flex-sb as-hd">
      <div class="tit">高级搜索</div>
      <i type="primary" @click="closeSearch" class="el-icon-close"></i>
    </div>
    <el-form :inline="true" :model="searchModel" ref="searchModel" class="demo-form-inline table-mini-search">
      <el-row v-for="(searchField) in searchFields" :key="searchField.fieldConfigCode">
        <el-form-item  :label="searchField.showName">
          <ele-block :field="searchField" :domainObject="searchModel"></ele-block>
        </el-form-item>
      </el-row>

      <el-form-item class="el-buton-group">
        <el-button type="primary" @click="onSubmit">立即筛选</el-button>
        <el-button @click="resetForm('searchModel')">重置条件</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
import eleBlock from '../widget/EleBlock.vue'
  import { toggleClass } from '../../config/util.js';

  export default {
    name: 'tableSearch',
    props: {
      'getData': null,
      'searchFields': Array,
      'searchModel': {},
      'isShow': null,
      'defaultSearchModel': {},
    },
    components:{
      'ele-block': eleBlock
    },
    data() {
      return {
        fields: []
      };
    },
    methods: {
      onSubmit() {
        this.$emit('submit', 'fromSearch');
//        this.getData();
      },
      resetForm(formName) {
        // console.log(this.$refs[formName][0]);
        this.$refs[formName].resetFields();
        const keyArray = Object.keys(this.searchModel);
        keyArray.forEach((element) => {
          if (this.defaultSearchModel) {
            this.searchModel[element] = this.defaultSearchModel[element];
          } else {
            this.$set(this.searchModel, element, null);
          }
        });
        this.$emit('reset');
//        this.getData();
      },
      closeSearch(){
        this.$emit('changeSearch');
      }
    },
    created() {
      // console.log(this.searchData);
    }
  };
</script>

<style lang="scss" scoped rel="stylesheet/scss">
.mini-search .tit{
  font-size: 14px;
}
.mini-search .el-icon-close{
  font-size: 20px;
  cursor: pointer;
}
.mini-search .as-hd {
  line-height: 24px;
  padding: 10px;
  margin-bottom: 0px;
  border-bottom: solid 1px #e5e9ef;
  margin-bottom: 10px;
}
.mini-search{
  width: 200px;
  height: 600px;
  padding: 0px;
  background-color: #f6f6f6;
  align-self: flex-start;
  overflow: auto;
}
.table-mini-search {
  padding: 0 10px;
  .el-form-item{
    margin-bottom: 0;
    margin-right: 10px;
    text-align: left;
    /deep/.el-form-item__label{
      line-height: 14px;
    }
  }
  .el-button{
    line-height: 0 !important;
    height: 26px;
    font-size: 10px;
    padding: 12px 10px;
    
  }
  .el-buton-group.el-form-item{
    /deep/.el-form-item__content{
      line-height: 24;
      display: flex;
      justify-content: space-around;
    }
  }
  
  .el-button--default:hover, .el-button--default:focus {
    background-color: #fff !important;
    border-color: #f48400 !important;
    color: #f48400 !important;
  }
  /deep/.el-input__inner {
    height: 24px;
    border-color: #dadada;
    border-radius: 0;
  }
  #advanceSearch{
    margin-left: 10px;
    cursor: pointer;
  }
}
</style>