<template>
  <div>
    <div class="as-bd flex-sb" id="asBd">
      <div class="opr-btn">
        <el-button>添加</el-button>
      </div>
      <v-tableSearch @reset="reset" @submit="submit" :searchFields="searchFields" :searchModel="searchModel" :isShow="true" ref="tableSearch">
      </v-tableSearch>
    </div>
    <div class="flex-fs">
      <table-solt :columns="columns" :data="data" :operationLst="operationLst" @comom="comom">

        <template slot-scope="{ row }" slot="freightNo">
          <span>{{ row.freightNo }}</span>
        </template>

      </table-solt>
      <!-- <div class="mini-search" id="miniSearch" >
        <v-minTableSearch @reset="reset" @submit="submit" :searchFields="searchFields" :searchModel="searchModel" :isShow="isAdvanced && needFullSearch" ref="tableSearch" :miniSearchNum="miniSearchNum"></v-minTableSearch>
      </div> -->
    </div>
    
    <v-page :page="page" :pageSize="pageSize" :total="total" v-on:change="change"></v-page>
  </div>
</template>

<script>
import tableSolt from '../components/table/Table.vue'
import Pagination from '../components/table/Pagination.vue'
import TableSearch from '../components/table/TableSearch.vue'
import MinTableSearch from '../components/table/MinTableSearch.vue'
import serviceUrl from '../api/servise.js'
import * as freightConfig from '../dataConfig/freight.js'
export default {
    name: 'resource',
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
        operationLst:[
          [
            {
              name: '派车',
              actionUrl: 'comom'
            },
            {
              name: '发货',
              actionUrl: 'comom'
            }
          ],
          [
            {
              name: '派车',
              actionUrl: 'comom'
            },
            {
              name: '发货',
              actionUrl: 'comom'
            }
          ],
          [
            {
              name: '派车',
              actionUrl: ''
            },
            {
              name: '发货',
              actionUrl: ''
            }
          ],
          [
            {
              name: '派车',
              actionUrl: ''
            },
            {
              name: '发货',
              actionUrl: ''
            }
          ]
        ],
        searchFields:freightConfig.searchFields(),
        searchModel:freightConfig.searchModel()
      };
    },
    methods: {
      change(newPage, newPageSize) {
        this.page = newPage;
        this.pageSize = newPageSize;
        this.getData();
      },
      getData(){
        console.log('获取列表数据')
        let params = `?page=${this.page}&size=${this.pageSize}`
        this.$axios.get(serviceUrl.freightList+params).then((res)=>{
          if(res.code == 200) {
            this.data = res.content;
            this.total = res.total;
          }
        })
      },
      comom(res) {
        console.log('上一级传来的数据',res)
      },
      reset(){
        console.log('重置搜索条件');
      },
      submit(){
        console.log('根据搜索条件查询数据')
      }
        
    },
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