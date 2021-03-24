<template>
 <div>
   <el-table
      :data="goodsList"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="id"
        width="80"
        height="100">
      </el-table-column>
      <el-table-column
        prop="firstcatename"
        label="一级分类"
        width="120">
      </el-table-column>
      <el-table-column
        prop="secondcatename"
        label="二级分类"
        width="120">
      </el-table-column>
      <el-table-column
        prop="goodsname"
        label="商品名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="img"
        label="商品图片"
        width="120">
        <template slot-scope="scope">
          <img class="img" :src="$imgurls+scope.row.img" alt="">
        </template>
      </el-table-column>
      <el-table-column
        prop="price"
        label="零售价格"
        width="120">
        <template slot-scope="scope">
          <div>
             ￥{{scope.row.price}}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="market_price"
        label="市场价格"
        width="120">
        <template slot-scope="scope">
          <div>
             ￥{{scope.row.market_price}}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="120">
        <template slot-scope="scope">
          <el-tag type="warning" v-if="scope.row.status == 2" size="small"
            >禁用</el-tag
          >
          <el-tag type="success" v-if="scope.row.status == 1" size="small"
            >正常</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="操作">
        <template slot-scope="scope">
            <el-button
            @click="edit(scope.row)"
            type="success"
            icon="el-icon-edit"
            circle
            size="mini"
          ></el-button>
          <el-button
            @click="del(scope.row.id)"
            type="danger"
            icon="el-icon-delete"
            circle
            size="mini"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 30, 40]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="goodsCoust">
    </el-pagination>
 </div>
</template>

<script>
//使用辅助函数来获取user的数据
import {mapState,mapActions} from 'vuex'
import {delGoodsLists} from '../../../model/goods'
export default {
  props:["info","params"],
 data(){
 return{
     
 }
 },
 created(){
      this.getGoodsList(this.params)
      },
 computed:{
...mapState({ goodsList: (state) => state.goods.goodsList,goodsCoust:state=>state.goods.goodsCoust}),
 },
 methods:{
       ...mapActions("goods",["getGoodsList"]),
       edit(row){
           this.info.isShow=true
           this.info.isAdd=false
           this.$emit("sendRow",row)
       },
       del(id){
         this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         delGoodsLists(id).then(res=>{
             if(res.code==200){
                this.$message({
                message: res.msg,
                type: "success",
                
              });
              this.getGoodsList(this.params)
             }
           })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
           
       },
       handleSizeChange(val) {
        this.params.size=val
        this.getGoodsList(this.params)
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.params.page=val
        console.log(val);
        this.getGoodsList(this.params)
        // console.log(`当前页: ${val}`);
      }
 },
 components:{}
}

</script>
<style scoped>
.el-table td{
  padding: 12px 0;
}
.img{
  width: 80px;
  height: 80px;
}
</style>
