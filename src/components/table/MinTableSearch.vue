/**
* mintableSearch.vue
*/
<template>
  <el-form :inline="true" :model="searchModel" ref="searchModel" class="demo-form-inline">
    <el-form-item v-if="(isMin && index < miniSearchNum) || !isMin">
      <el-form-item v-for="(searchField) in searchFields" :key="searchField.fieldConfigCode" :label="searchField.showName">
        <!-- <ele-block :field="searchField" :domainObject="searchModel"></ele-block> -->
      </el-form-item>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit"><i class="el-icon-search"></i> 立即筛选</el-button>
      <el-button @click="resetForm('searchModel')">重置条件</el-button>
      <span id="advanceSearch" v-if="isShow" @click="showAdvanceSearch">高级搜索</span>
    </el-form-item>
  </el-form>
</template>

<script type="text/ecmascript-6">
  import { toggleClass } from '../../config/util.js';

  export default {
    name: 'tableSearch',
    props: {
      'getData': null,
      'searchFields': Array,
      'searchModel': {},
      'isShow': null,
      'defaultSearchModel': {},
      miniSearchNum: {
        type: Number,
        'default': 2
      },
      isMin: {
        type: Boolean,
        'default': true
      }
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
      showAdvanceSearch() {
        const listPage = document.querySelector('#list'),
          miniSearch = document.querySelector('#miniSearch');
        toggleClass(listPage, 'opened');
        toggleClass(miniSearch, 'hide');
      }
    },
    created() {
      // console.log(this.searchData);
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
</style>