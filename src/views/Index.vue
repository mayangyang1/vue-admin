<template>
    <div class="mgt10 mgl10">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
        prop="_id"
        label="code"
        width="220">
        </el-table-column>
        <el-table-column
        prop="goodsName"
        label="货物名称"
        width="180">
        </el-table-column>
        <el-table-column
        prop="company"
        label="公司">
        </el-table-column>
        <el-table-column
        prop="routeName"
        label="线路名称">
        </el-table-column>
        <el-table-column
        prop="address"
        label="地址">
        </el-table-column>
        <el-table-column
        prop="perWeight"
        label="预装量(吨)">
        </el-table-column>
        <el-table-column
        prop="goodsWeight"
        label="货物重量(吨)">
        </el-table-column>
     </el-table>
    </div>
</template>
<script>
export default {
    name: 'testPage',
    data() {
        return {
            tableData: []
        }
    },
    methods:{
        getWaybillList() {
            this.$axios.get('/api/getGoodsWaybillList').then((res) => {
                if(res.code === 200) {
                    this.tableData = res.content;
                }
            })
        },
    },
    created() {
        this.getWaybillList();
    }
}
</script>

<style scoped>
 .row{
     min-height: 100vh;
     font-size: 50px;
     color: #ddd;
 }
</style>