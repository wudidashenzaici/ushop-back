<template>

     <el-card class="bing">
         <el-button class="btn" @click="showModel" type="primary" icon="el-icon-circle-plus-outline">新增</el-button>
         <el-divider class="xian"></el-divider>
         <Category :info="info" @sendRow="sendRow"></Category>
         <Category-popout :info="info" ref="model"></Category-popout>
     </el-card>
</template>

<script>
import Category from './table/Category'
import CategoryPopout from './popout/CategoryPopout'
export default {
 data(){
 return{
     info:{
         isShow:false,
         isAdd:true,
     }
 }
 },
 created(){},
 methods:{
     showModel(){
        this.info.isShow=true
        this.info.isAdd=true
     },
     sendRow(row){
    this.$refs.model.sendmode(row)
     }
 },
 components:{
     Category,
  CategoryPopout
 }
}

</script>
<style scoped>
.xian{
    margin: 24px 0;
}
</style>