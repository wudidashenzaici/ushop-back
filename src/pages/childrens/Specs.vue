<template>
 <el-card>
     <el-button @click="addList" type="primary" icon="el-icon-circle-plus-outline">新增</el-button>
     <el-divider class="xian"></el-divider>
     <Specs :info="info" @sendrow="sendrow" :params="params"></Specs>
    <Specs-popout :info="info" ref="model" :params="params"></Specs-popout>
 </el-card>
</template>

<script>
//导入子组件
import Specs from './table/Specs'
import SpecsPopout from './popout/SpecsPopout.vue'
//请求角色添加
export default {
 data(){
 return{
     info:{
       isShow:false,
       isAdd:true
     },
     params:{
         page:1,
         size:10,
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
   sendrow(row){
   this.$refs.model.sendmode(row)
   }
 },
 components:{
   Specs,
  SpecsPopout
 }
}

</script>
<style scoped>
</style>