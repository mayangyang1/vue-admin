<template>
  <el-form :inline="false" :model="searchModel" ref="searchModel" class="demo-form-inline flex-fs table-search">
    <el-row v-for="searchField in searchFields" :key="searchField.fieldConfigCode">
      <el-form-item :label="searchField.showName" class="flex-fs">
        <ele-block :field="searchField" :domainObject="searchModel"></ele-block>
      </el-form-item>
    </el-row>
    <el-row class="as-ft flex-fs">
      <el-button type="primary" @click="onSubmit"><i class="el-icon-search"></i> 立即筛选</el-button>
      <el-button @click="resetForm('searchModel')">重置条件</el-button>
      <span id="advanceSearch" v-if="isShow">高级搜索</span>
    </el-row>
  </el-form>
</template>

<script type="text/ecmascript-6">
import eleBlock from '../widget/EleBlock.vue'

  export default {
    name: 'tableSearch',
    props: {
      'getData': null,
      'searchFields': Array,
      'searchModel': {},
      'isShow': null,
      'defaultSearchModel': {}
    },
    components:{
      'ele-block':eleBlock
    },
    data() {
      return {
        fields: []
      };
    },
    methods: {
      onSubmit() {
        this.$emit('submit', 'fromSearch');
      },
      resetForm() {
        const keyArray = Object.keys(this.searchModel);
        keyArray.forEach((element) => {
          if (this.defaultSearchModel) {
            this.searchModel[element] = this.defaultSearchModel[element];
          } else {
            this.searchModel[element] = null;
          }
        });
        this.$emit('reset');
      }
    }
  };
</script>

<style lang="scss" scoped rel="stylesheet/scss">
.table-search {
  padding: 0 10px;
  .el-form-item{
    margin-bottom: 0;
    margin-right: 10px;
  }
  .el-button{
    line-height: 0 !important;
    height: 26px;
    /deep/.el-icon-search{
      line-height: 0;
    }
  }
  .el-form-item__content{
    line-height: 24
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