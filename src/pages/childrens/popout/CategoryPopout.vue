<template>
  <el-dialog
    @close="reset()"
    :title="info.isAdd ? '新增' : '编辑'"
    :visible.sync="info.isShow"
    class="add"
  >
    <el-form
      :model="formInfo"
      label-width="80px"
      :rules="rules"
      ref="formInfo"
    >
      <el-form-item label="上级分类" prop="pid">
        <el-select v-model="formInfo.pid">
          <el-option label="顶级分类" value="0"></el-option>
          <el-option
            v-for="item in CateList"
            :key="item.id"
            :value="item.id"
            :label="item.catename"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称" prop="catename">
        <el-input v-model="formInfo.catename" autocomplete="off" placeholder="请输入分类名称"></el-input>
      </el-form-item>
     <el-form-item label="分类图片" v-show="formInfo.pid!=0">
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
      <el-form-item label="分类状态" prop="status">
        <el-radio-group v-model="formInfo.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="2">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="info.isShow = false">取 消</el-button>
      <el-button type="primary" @click="sendFormData">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { setcateadd, editcateedit } from "../../../model/Category";
import { mapState, mapActions } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      formInfo: {
      pid: "0",
       catename:"",
       img:"",
       status:1
      },
      rules: {
        type: [{ required: true, message: "请选择类型", trigger: "blur" }],
        title: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },
      imageUrl: ''
    };
  },
  created() {
    this.getCategoryList()
  },
  computed: {
    ...mapState({ CateList: (state) => state.CateList.CateLists }),
  },
  methods: {
    ...mapActions("CateList", ["getCategoryList"]),
    sendmode(row) {
      this.formInfo = row;
      this.imageUrl=this.$imgurls+this.formInfo.img
    },
     handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(res.raw);
        this.formInfo.img=res.raw
      },
    sendFormData() {
      this.$refs.formInfo.validate((valid) => {
        if (valid) {
          let fd=new FormData()
           for(let a in this.formInfo){
             fd.append(a,this.formInfo[a])
           }
          if (this.info.isAdd == true) {
            setcateadd(fd).then((res) => {
              if (res.code == 200) {
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                this.getCategoryList();
                this.info.isShow = false;
              } else {
                this.$message({
                  message: res.msg,
                  type: "error",
                });
              }
            });
          } else {
            editcateedit(fd).then((res) => {
              console.log(11);
              if (res.code == 200) {
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                this.getCategoryList()
                this.info.isShow = false;
              } else {
                this.$message({
                  message: res.msg,
                  type: "error",
                });
              }
            });
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
    reset() {
      this.formInfo ={
        pid: "0",
       catename:"",
       img:"",
       status:1
      }
      this.imageUrl=""
    },
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