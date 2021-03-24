<template>

     <el-card class="bing">
         <el-button class="btn" @click="showModel" type="primary" icon="el-icon-circle-plus-outline">新增</el-button>
         <el-divider class="xian"></el-divider>
         <Controller :info="info" @sendRow="sendRow" :params="params"></Controller>
         <Admin-popout :info="info" ref="model" :params="params"></Admin-popout>
     </el-card>


</template>
<script>
import Controller from './table/Controller'
import Popout from "../childrens/Popout"
import AdminPopout from './popout/AdminPopout.vue'
export default {
 data(){
 return{
     info:{
         isShow:false,
         isAdd:true,
     },
     params:{
         page:1,
         size:10
     }
 }
 },
 created(){
 },
 methods:{
     showModel(){
        this.info.isShow=true
        this.info.isAdd=true
     },
     sendRow(row){
    this.$refs.model.sendmode(row)
     },
      
 },
 
 components:{
     Controller,AdminPopout,Popout

 }
}

</script>
<style scoped>
.xian{
    margin: 24px 0;
}
</style>