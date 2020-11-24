<template>
  <div class="ele-pop-select">
    <div class="button" @click="popSelect">选择</div>
    <ele-dialog ref="dialog" :title="title" @submit="handleCancel" @cancel="handleCancel">

      <div class="pop-table-search">
        <v-tableSearch @reset="reset" @submit="submit" :searchFields="searchFields" :searchModel="searchModel" :isShow="false"  ref="tableSearch">
        </v-tableSearch>
      </div>

      <table-solt :needCheckBox='false' :columns="columns" :data="data" :operationList="operationList" @operationAction="operationAction">
      </table-solt>

      <v-page :page="page" :pageSize="pageSize" :total="total" v-on:change="change"></v-page>
      
    </ele-dialog>
  </div>
</template>
<script>
import EleDialog from './EleDialog.vue'
import TableSolt from '../table/Table.vue'
import VPage from '../table/Pagination.vue'
import TableSearch from '../table/TableSearch.vue'
import serviceUrl from '../../api/servise.js'
export default {
  props: {
    title: {
      type: String,
      'default': '提示'
    },
    popInfoConfig: {
      type: Object,
      'default': ()=> {
        return {}
      }
    }
  },
  data() {
    return {
      page:1,
      pageSize: 20,
      total:0,
      searchFields: this.popInfoConfig.searchFields,
      searchModel: this.popInfoConfig.searchModel,
      columns: this.popInfoConfig.columns,
      data:[

      ],
      operationList: []
    }
  },
  methods: {
    actionOperationList() {
      const that = this;
      let operationArr = [
        {
          name: '选用',
          actionUrl: 'choice'
        },
      ]
      that.operationList = [];
      that.data.forEach((item, index)=> {
          that.operationList.push(operationArr);
        
      })
    },
    operationAction(res){
      this.$refs.dialog.close();
      console.log(this.$refs)
      console.log('交互按钮事件',res)
      this.$emit('selectOperation',res);
    },
    handleCancel() {
      this.$refs.dialog.close();
    },
    popSelect() {
      this.$refs.dialog.open();
      this.getData();
    },
    getData(paramsString){
      console.log('获取列表数据')
      let params = `?page=${this.page}&size=${this.pageSize}`
      if(paramsString) {
        params+=paramsString;
      }
      let url = this.popInfoConfig.popServiceUrl;
      this.$axios.get(serviceUrl[url] + params).then((res)=>{
        if(res.code == 200) {
          this.data = res.content;
          this.total = res.total;
          this.actionOperationList();
        }
      })
    },
    change(newPage, newPageSize) {
      this.page = newPage;
      this.pageSize = newPageSize;
      this.getData();
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
  components:{
    'ele-dialog': EleDialog,
    'table-solt': TableSolt,
    'v-page': VPage,
    'v-tableSearch': TableSearch,
  },
  created() {
    
  }
}
</script>
<style lang="scss"> 
  @import '../../assets/scss/common.scss';
  .ele-pop-select .fix-table-wrap .fix-col {
    width: 100px!important;
  }
  .pop-table-search{
    padding: 0 0 10px 0;
    display: flex;
    justify-content: flex-end;
  }
  .el-dialog__body{
    padding: 10px 20px !important;
  }
  .el-dialog__header {
    padding: 20px 20px 0px!important;
  }
  .el-dialog__footer {
    padding: 0px 20px 20px!important;
  }
  .el-button--default:hover, .el-button--default:focus {
    background-color: #fff !important;
    border-color: $uiColor !important;
    color: $uiColor !important;
  }
  .ele-pop-select .fix-table-wrap{
    max-height: 300px!important;
    min-height: 300px!important;
  }
  .ele-pop-select.ele-pop-select {
    margin-left: 10px;
    .button{
      border: 1px solid #ccc;
      padding: 3px 6px;
      width: 50px;
      cursor: pointer;
      border-radius: 4px;
      color: #666;
      box-shadow: 1px 1px #eee;
      text-align: center;
      line-height: 16px;
    }
  }
</style>