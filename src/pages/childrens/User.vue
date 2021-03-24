<template>
 <el-card>
     <el-button @click="addList" type="primary" icon="el-icon-circle-plus-outline">新增</el-button>
     <el-divider class="xian"></el-divider>
     <Role :info="info" @sendPopout="sendPopout"></Role>
    <User-popout :info="info" ref="model"></User-popout>
 </el-card>
</template>

<script>
//导入子组件
import Role from './table/Role'
import UserPopout from './popout/UserPopout.vue'
//请求角色添加
export default {
 data(){
 return{
     info:{
       isShow:false,
       isAdd:true
     }
 }
 },
 computed:{

 },
 created(){
  
 },
 methods:{
   addList(){
     this.info.isShow=true,
     this.info.isAdd=true
   },
   sendPopout(row){
   this.$refs.model.getPopoutList(row)
   }
 },
 components:{
   Role,
   UserPopout
 }
}

</script>
<style scoped>
</style>