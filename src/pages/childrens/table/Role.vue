<template>
 <el-table
      :data="userList"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="id"
        width="180">
      </el-table-column>
      <el-table-column
        prop="rolename"
        label="角色名称"
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
            @click="del(scope.row.id)"
            type="danger"
            icon="el-icon-delete"
            circle
            size="mini"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
</template>

<script>
//使用辅助函数来获取user的数据
import {mapState,mapActions} from 'vuex'
import {delUserLists} from '../../../model/menu'
export default {
  props:["info"],
 data(){
 return{
     
 }
 },
 created(){
      this.getUserList()
 },
 computed:{
...mapState({ userList: (state) => state.user.userList}),
 },
 methods:{
       ...mapActions("user",["getUserList"]),
       edit(row){
           this.info.isShow=true
           this.info.isAdd=false
           this.$emit("sendPopout",row)
       },
       del(id){
         this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         delUserLists(id).then(res=>{
             if(res.code==200){
                this.$message({
                message: res.msg,
                type: "success",
                
              });
              this.getUserList()
             }
           })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
           
       }
 },
 components:{}
}

</script>
<style scoped>
</style>
