<template>
    <div class="mgt10 mgl10">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
        label="code"
        width="220">
            <template slot-scope="scope">
                <span>{{scope.row._id}}</span>
            </template>
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
        label="预装量(吨)">
            <template slot-scope="scope">
                <span>{{scope.row.perWeight}}吨</span>
            </template>
        </el-table-column>
        <el-table-column
        label="货物重量(吨)">
            <template slot-scope="scope">
                <span>{{scope.row.goodsWeight}}吨</span>
            </template>
        </el-table-column>
        <el-table-column
        label="操作">
            <template slot-scope="scope">
                <el-button type="primary" @click="edite(scope.row._id)">编辑</el-button>
                <el-button type="success" @click="deletes(scope.row._id)">删除</el-button>
            </template>
        </el-table-column>
     </el-table>
    <div class="flex-fs mgt10 pdt10">
        <el-pagination background layout="prev, pager, next" :total="100"></el-pagination>
    </div>
     
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
        edite(code) {//修改任务单
            this.$confirm('确认修改任务？', '提示',{
                confirmButtonText:'确认',
                cancelButtonText: '取消',
                distinguishCancelAndClose: false,
            }).then(()=>{
                console.log('33')
            }).catch((action => {
                console.log(action)
            }))
        },
        deletes(code) {//删除任务单
            this.$confirm('确认要删除给任务?','提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
            }).then(()=>{
                console.log('删除成功');
            }).then(action=>{
                console.log(action);
            })
        }
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