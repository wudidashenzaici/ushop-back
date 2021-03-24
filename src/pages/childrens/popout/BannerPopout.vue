<template>
  <div>
    <el-dialog :titles="info.isAdd?'新增':'编辑'" :visible.sync="info.isShow" @close="reset">
      <el-form :model="form" label-width="100px" :rules="rules" ref="form">
        <el-form-item label="轮播图名称" prop="title">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="轮播图图片">
        <el-upload
        class="avatar-uploader"
        :auto-upload="false"
        action=""
        :show-file-list="false"
        :on-change="handleAvatarSuccess"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
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
import {mapState,mapActions} from "vuex"
import {addBannerLists,editBannerLists} from '../../../model/banner'
export default {
    props:["info"],
  data() {
    return {
      form: {
        title: "",
        img:"",
        status:1
      },
      rules: {
        title: [{ required: true, message: "请输入轮播图名字", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }]
      },
      imageUrl: ''
    };
  },
  computed:{
   ...mapState({bannerList:state=>state.banner.bannerLists})
  },
  created() {
  },
  methods: {
      ...mapActions("banner",["getBannerList"]),
       handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(res.raw);
        this.form.img=res.raw
      },
      addRoleList(){
        this.$refs.form.validate((valid) => {
        if (valid) {
          let fd=new FormData()
          for(let i in this.form){
            fd.append(i,this.form[i])
          }
            if(this.info.isAdd==true){
            addBannerLists(fd).then(res=>{
                if(res.code==200){
                this.$message({
                message: res.msg,
                type: "success",
                
              });
              this.getBannerList()
              this.info.isShow=false
                }else{
                    this.$message({
                message: res.msg,
                type: "error",
                
              });
                }
            })
            }else{
            editBannerLists(fd).then(res=>{
                if(res.code==200){
                this.$message({
                message: res.msg,
                type: "success",
                
              });
              this.getBannerList()
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
      reset(){
       this.form={
         title: "",
        img:"",
        status:1
      }
      this.imageUrl=""
      },
      getPopoutList(row){
          this.form={...row}
         this.imageUrl=this.$imgurls+this.form.img
      }
  },
  components: {},
};
</script>
<style scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .avatar-uploader-icon{
    border: 1px dashed #8c939d;
  }
</style>