<template>
 <el-card>
     <el-button @click="addList" type="primary" icon="el-icon-circle-plus-outline">新增</el-button>
     <el-divider class="xian"></el-divider>
     <Banner :info="info" @sendPopout="sendPopout"></Banner>
    <Banner-popout :info="info" ref="model"></Banner-popout>
 </el-card>
</template>

<script>
//导入子组件
import Banner from './table/Banner'
import BannerPopout from './popout/BannerPopout'
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
   Banner,
   BannerPopout
 }
}

</script>
<style scoped>
</style>