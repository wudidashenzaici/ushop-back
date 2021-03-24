<template>
  <div>
    <el-dialog :title="info.isAdd?'新增':'编辑'" :visible.sync="info.isShow" @close="reset">
      <el-form :model="form" label-width="100px" :rules="rules" ref="form">
        <el-form-item label="活动名称" prop="title">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动时间" prop="rolename">
         <el-date-picker
      v-model="value2"
      type="datetimerange"
      :picker-options="pickerOptions"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right">
    </el-date-picker>
        </el-form-item>
       <el-form-item label="一级分类" prop="first_cateid">
          <el-select v-model="form.first_cateid" placeholder="请选择"  @change="firstCate">
            <el-option v-for="item in CateList" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" prop="second_cateid">
          <el-select v-model="form.second_cateid" placeholder="请选择">
            <el-option v-for="item in secondCateid" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择商品" prop="goodsid">
          <el-select v-model="form.goodsid" placeholder="请选择"  @change="firstCate">
            <el-option v-for="item in CateList" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isShow=false">取 消</el-button>
        <el-button type="primary" @click="addRoleList"
          >提交</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { number } from 'echarts';
import {mapState,mapActions} from "vuex"
import {addSeckLists,editSeckLists} from '../../../model/seckill'
export default {
    props:["info"],
  data() {
    return {
      secondCateid:"",
      form: {
        title: "",
        begintime:"",
        endtime:"",
        first_cateid:"",
        second_cateid:"",
        goodsid:"",
        status:1
      },
      defaultProps: {
        children: "children",
        label: "title",
      },
      rules: {
        title: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        first_cateid: [{ required: true, message: "请选择一级分类", trigger: "blur" }],
        second_cateid: [{ required: true, message: "请选择二级分类", trigger: "blur" }],
        goodsid: [{ required: true, message: "请选择二级分类", trigger: "blur" }]
      },
      pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value2: ''
    };
  },
  computed:{
   ...mapState({seckList:state=>state.seckill.seckLists,CateList: (state) => state.CateList.CateLists})
  },
  created() {
      this.getSeckList()
      this.getCategoryList()
  },
  methods: {
      ...mapActions("seckill",["getSeckList"]),
      ...mapActions("CateList", ["getCategoryList"]),
      ...mapActions("goods", ["getGoodsList"]),
      addRoleList(){
        this.$refs.form.validate((valid) => {
        if (valid) {
          let a=new Date(this.value2[0]).getTime()
              this.form.begintime=a
              let b=new Date(this.value2[1]).getTime()
              this.form.endtime=b
            if(this.info.isAdd==true){
            addSeckLists(this.form).then(res=>{
                if(res.code==200){
                this.$message({
                message: res.msg,
                type: "success",
                
              });
              this.getSeckList()
              this.info.isShow=false
                }else{
                    this.$message({
                message: res.msg,
                type: "error",
                
              });
                }
            })
            }else{
            editSeckLists(this.form).then(res=>{
                if(res.code==200){
                this.$message({
                message: res.msg,
                type: "success",
                
              });
              this.getSeckList()
              this.info.isShow=false
                }else{
                    this.$message({
                message: res.msg,
                type: "error",
                
              });
                }
            })
            }
        } else {
          this.$message({
                message: "数据提交失败",
                type: "error",
              });
          return false;
        }
      });
      },
      firstCate(){
        //通过findIndex函数找到符合条件元素的下标，this.catelist为一级分类的所有项,
        //findIndex括号内为一个函数，函数第一项参数为所有的项,通过判断当前一级分类的id this.form.first_cateid和
        //所有项的id进行判断相同返回对应的下标
         let index =this.CateList.findIndex((item)=>item.id==this.form.first_cateid)
         this.secondCateid=this.CateList[index].children
         this.form.second_cateid=""
      },
      reset(){
       this.form={
        title: "",
        begintime:"",
        endtime:"",
        first_cateid:"",
        second_cateid:"",
        goodsid:"",
        status:1
      }
      this.value2=""
      },
      getPopoutList(row){
          this.form=row
         let begintime=new Date(parseInt(row.begintime))
         let endtime=new Date(parseInt(row.endtime))
        this.value2=new Array(begintime,endtime)
      }
  },
  components: {},
};
</script>
<style scoped>
</style>