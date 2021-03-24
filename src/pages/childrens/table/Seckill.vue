<template>
 <el-table
      :data="seckList"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="活动名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="begintime"
        label="开始时间"
        width="180">
        <template slot-scope="scope">
          <div >
             {{scope.row.begintime|formatDate}}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="endtime"
        label="结束时间"
        width="180">
        <template slot-scope="scope">
          <div >
             {{scope.row.endtime|formatDate}}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="180">
        <template slot-scope="scope">
          <el-tag type="warning" v-if="scope.row.status == 2" size="small"
            >未启用</el-tag
          >
          <el-tag type="success" v-if="scope.row.status == 1" size="small"
            >已启用</el-tag
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
import { number } from 'echarts'
//使用辅助函数来获取user的数据
import {mapState,mapActions} from 'vuex'
import {delSeckLists} from '../../../model/seckill'
export default {
  props:["info"],
 data(){
 return{
     
 }
 },
 created(){
      this.getSeckList()
 },
 computed:{
...mapState({ seckList: (state) => state.seckill.seckLists}),
 },
 methods:{
       ...mapActions("seckill",["getSeckList"]),
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
         delSeckLists(id).then(res=>{
             if(res.code==200){
                this.$message({
                message: res.msg,
                type: "success",
                
              });
              this.getSeckList()
             }
           })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
           
       },
 },
      filters: {
    formatDate: function (value) {
       var date = new Date(parseInt(value)) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
        var D = date.getDate() < 10 ? '0'+date.getDate(): date.getDate() 
        var h = date.getHours() < 10 ? '0'+date.getHours()+':' : date.getHours() +':'
        var m = date.getMinutes() < 10 ? '0'+date.getMinutes()+':' : date.getMinutes() +':'
        var s = date.getSeconds()< 10 ? '0'+date.getSeconds() : date.getSeconds()
        return Y+M+D+"  "+h+m+s
      }
  },

 components:{}
}

</script>
<style scoped>
</style>

