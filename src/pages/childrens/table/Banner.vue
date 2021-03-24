<template>
 <el-table
      :data="bannerList"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="轮播图名称">
      </el-table-column>
      <el-table-column
        prop="img"
        label="图片">
        <template slot-scope="scope">
          <div>
            <img :src="$imgurls+scope.row.img" alt="" class="img">
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
        <template slot-scope="scope">
          <el-tag type="warning" v-if="scope.row.status == 2" size="small"
            >已启用</el-tag
          >
          <el-tag type="success" v-if="scope.row.status == 1" size="small"
            >未启用</el-tag
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
//使用辅助函数来获取banner的数据
import {mapState,mapActions} from 'vuex'
import {delBannerLists} from '../../../model/banner'
export default {
  props:["info"],
 data(){
 return{
     
 }
 },
 created(){
      this.getBannerList()
 },
 computed:{
...mapState({ bannerList: (state) => state.banner.bannerList}),
 },
 methods:{
       ...mapActions("banner",["getBannerList"]),
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
         delBannerLists(id).then(res=>{
             if(res.code==200){
                this.$message({
                message: res.msg,
                type: "success",
                
              });
              this.getBannerList()
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
.img{
  width:62px ;
  height:50px
}
</style>
