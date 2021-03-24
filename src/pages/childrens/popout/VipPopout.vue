<template>
  <el-dialog @close="reset()" title="修改" :visible.sync="info.isShow" class="add">
    <el-form
      :model="formInfo"
      label-width="120px"
      :rules="rules"
      ref="formInfo"
    >
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="formInfo.nickname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="formInfo.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formInfo.icon" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="状态" prop="status">
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
import {editmemberedit} from '../../../model/vip'
import { mapState,mapActions} from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      formInfo: {
        uid: "",
        nickname: "",
        phone: "",
        password: 1,
        status: 1,
      },
      rules: {
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }]
      },
    };
  },
  created() {
  },
  computed: {
    ...mapState({ memberLists: (state) => state.vip.memberLists }),
  },
  methods: {
    ...mapActions("vip",["getmemberList"]),
    sendRow(row){
     this.formInfo=JSON.parse(JSON.stringify(row))
    },
    sendFormData() {
      this.$refs.formInfo.validate((valid) => {
        if (valid) {
            editmemberedit(this.formInfo).then(res=>{
              if(res.code==200){
              this.$message({
                message: res.msg,
                type: "success",
              });
              this.getmemberList()
              this.info.isShow = false
            }else{
              this.$message({
                message: res.msg,
                type: "error",
              });
            }
            })
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
      this.formInfo={
       uid: "",
        nickname: "",
        phone: "",
        password: 1,
        status: 1,
      }
    }
  },
  components: {},
};
</script>
<style scoped>
</style>