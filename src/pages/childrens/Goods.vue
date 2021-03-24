<template>

     <el-card class="bing">
         <el-button class="btn" @click="showModel" type="primary" icon="el-icon-circle-plus-outline">新增</el-button>
         <el-divider class="xian"></el-divider>
         <Goods :info="info" @sendRow="sendRow" :params="params"></Goods>
         <Goods-popout :info="info" ref="model" :params="params"></Goods-popout>
     </el-card>


</template>
<script>
import Goods from './table/Goods'
import GoodsPopout from './popout/GoodsPopout.vue'
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
     Goods,GoodsPopout

 }
}

</script>
<style scoped>
.xian{
    margin: 24px 0;
}
</style>