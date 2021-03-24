<template>
 <el-card>
     <el-button @click="addList" type="primary" icon="el-icon-circle-plus-outline">添加秒杀</el-button>
     <el-divider class="xian"></el-divider>
     <Seckill :info="info" @sendPopout="sendPopout"></Seckill>
    <Seckill-popout :info="info" ref="model"></Seckill-popout>
 </el-card>
</template>

<script>
//导入子组件
import Seckill from './table/Seckill'
import SeckillPopout from './popout/SeckillPopout'
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
   Seckill,
   SeckillPopout
 }
}

</script>
<style scoped>
</style>