<template>
 <div>
   <el-table
      :data="adminList"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="id"
        width="180">
      </el-table-column>
      <el-table-column
        prop="username"
        label="账号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="rolename"
        label="角色"
        width="180">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="180">
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
            @click="del(scope.row.uid)"
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
      :total="adminCoust">
    </el-pagination>
 </div>
</template>

<script>
//使用辅助函数来获取user的数据
import {mapState,mapActions} from 'vuex'
import {delAdminLists} from '../../../model/admin'
export default {
  props:["info","params"],
 data(){
 return{
     
 }
 },
 created(){
      this.getAdminList(this.params)
      
 },
 computed:{
...mapState({ adminList: (state) => state.admin.adminList,adminCoust:state=>state.admin.adminCoust}),
 },
 methods:{
       ...mapActions("admin",["getAdminList"]),
       edit(row){
           this.info.isShow=true
           this.info.isAdd=false
           this.$emit("sendRow",row)
       },
       del(uid){
         console.log(uid);
         this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         delAdminLists(uid).then(res=>{
             if(res.code==200){
                this.$message({
                message: res.msg,
                type: "success",
                
              });
              this.getAdminList(this.params)
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
        this.getAdminList(this.params)
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.params.page=val
        console.log(val);
        this.getAdminList(this.params)
        // console.log(`当前页: ${val}`);
      }
 },
 components:{}
}

</script>
<style scoped>
</style>
