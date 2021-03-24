<template>

     <el-card class="bing">
         <el-button class="btn" @click="showModel" type="primary" icon="el-icon-circle-plus-outline">新增</el-button>
         <el-divider class="xian"></el-divider>
         <Table :info="info" @sendRow="sendRow"></Table>
         <Popout :info="info" ref="model"></Popout>
     </el-card>


</template>

<script>
import Table from './table/Table'
import Popout from './Popout'
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
     Table,Popout
 }
}

</script>
<style scoped>
.xian{
    margin: 24px 0;
}
</style>