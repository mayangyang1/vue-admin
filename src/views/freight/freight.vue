<template>
  <div>
    <div class="as-bd flex-sb" id="asBd">
      <div class="opr-btn">
        <el-button @click="addFreight">新增</el-button>
      </div>  
      <v-tableSearch @reset="reset" @submit="submit" @changeSearch="changeSearch" :searchFields="searchFields" :searchModel="searchModel" :isShow="true" v-show="!showFullSearch" ref="tableSearch">
      </v-tableSearch>
    </div>
    <div class="flex-fs">
      <table-solt :columns="columns" :data="data" :operationList="operationList" @comom="comom" @operationAction="operationAction">

        <template slot-scope="{ row }" slot="freightNo">
          <span>{{ row.freightNo }}</span>
        </template>
        <template slot-scope="{ row }" slot="quoteType">
          <span v-if="row.quoteType == 'quote'">司机报价 {{meterageUnitConfig[row.meterageType]['driver.prices'][row.quotePriceUnitCode]}}</span>
          <span v-if="row.quoteType == 'price'">一口价 {{row.quotePrice}}{{meterageUnitConfig[row.meterageType]['driver.prices'][row.quotePriceUnitCode]}}</span>
        </template>
        <template slot-scope="{ row }" slot="truckModelRequire">
          <span >{{truckModelConfig[row.truckModelRequire]}}</span>
        </template>


      </table-solt>
      <v-minTableSearch @reset="reset" @submit="submit" @changeSearch="changeSearch" :searchFields="searchFields" :searchModel="searchModel" v-show="needFullSearch && showFullSearch" ref="tableSearch"></v-minTableSearch>
    </div>
    
    <v-page :page="page" :pageSize="pageSize" :total="total" v-on:change="change"></v-page>
  </div>
</template>

<script>
import tableSolt from '@/components/table/Table.vue'
import Pagination from '@/components/table/Pagination.vue'
import TableSearch from '@/components/table/TableSearch.vue'
import MinTableSearch from '@/components/table/MinTableSearch.vue'
import serviceUrl from '@/api/servise.js'
import * as freightConfig from '@/dataConfig/freight.js'
import {checkedPermission} from '@/config/util.js'
import {meterageUnitConfig} from '@/config/unitConfig.js'
export default {
    name: 'freightList',
    components: {
      tableSolt,
      'v-page':Pagination,
      'v-tableSearch': TableSearch,
      'v-minTableSearch': MinTableSearch
    },
    data() {
      return {
        page:1,
        pageSize:20,
        total: 0,
        columns:freightConfig.columns(),	
        data: [],
        operationList:[],
        searchFields:freightConfig.searchFields(),
        searchModel:freightConfig.searchModel(),
        needFullSearch: true,
        showFullSearch: false,
        meterageUnitConfig: meterageUnitConfig,
        truckModelConfig: JSON.parse(localStorage.getItem('truckModelConfig'))
      };
    },
    methods: {
      addFreight() {
        this.$router.push('/addFreight') 
      },
      actionOperationList() {
        const that = this;
        let operationOneArr = [
          {
              name: '去派车',
              actionUrl: 'dispatch'
            },
            {
              name: '刷新货源',
              actionUrl: 'refresh'
            },
            {
              name: '结束发布',
              actionUrl: 'over'
            },
            {
              name: '复制新建',
              actionUrl: 'copy'
            },
            {
              name: '删除',
              actionUrl: 'delete'
            }
        ]
        let operationTwoArr = [
          {
            name: '复制新建',
            actionUrl: 'copy'
          },
        ]
        that.operationList = [];
        that.data.forEach((item, index)=> {
          if(item.status == 'pushling') {
             that.operationList.push(operationOneArr);
          }else{
             that.operationList.push(operationTwoArr);
          }
         
        })
      },
      changeSearch(){
        console.log('show')
        this.showFullSearch = !this.showFullSearch;
      },
      change(newPage, newPageSize) {
        this.page = newPage;
        this.pageSize = newPageSize;
        this.getData();
      },
      getData(paramsString){
        console.log('获取列表数据')
        let params = `?page=${this.page}&size=${this.pageSize}`
        if(paramsString) {
          params+=paramsString;
        }
        this.$axios.get(serviceUrl.freightList+params).then((res)=>{
          if(res.code == 200) {
            this.data = res.content;
            this.total = res.total;
            this.actionOperationList();
          }
        })
      },
      comom(res) {
        console.log('上一级传来的数据',res)
      },
      operationAction(res){
        console.log('交互按钮事件',res)
      },
      reset(){
        console.log('重置搜索条件');
        this.page = 1;
        this.getData();
      },
      submit(res){
        console.log('根据搜索条件查询数据',res)
        if(res == 'fromSearch') {
          const keyArray = Object.keys(this.searchModel);
          let params = '';
          keyArray.forEach((item)=>{
            if(this.searchModel[item]) {
              params+=`&${item}=${this.searchModel[item]}`
            }
          })
          this.getData(params);
        }
      }
        
    },
    /**
     * 权限校验-- - start-- - 
     * //(logistics.get 查看订单列表权限)
     */
    // checkPermissionMessage() {
    //   const that = this;
    //   let logisticsGet = checkedPermission('logistics.get');
      
    // },
    created() {
      this.getData();
    }
}
</script>

<style>
.as-bd{
  padding: 6px 0 6px 6px;
  position: relative;
  z-index: 11;
  background-color: #fff;
}
.opr-btn .el-button{
  line-height: 0 !important;
  height: 26px;
}
.el-button--default:hover, .el-button--default:focus {
  background-color: #fff !important;
  border-color: #f48400 !important;
  color: #f48400 !important;
}
</style>