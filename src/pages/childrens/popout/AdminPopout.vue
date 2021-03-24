<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '新增' : '编辑'"
      :visible.sync="info.isShow"
      @close="reset"
    >
      <el-form :model="form" label-width="100px" :rules="rules" ref="form">
        <el-form-item label="角色">
          <el-select v-model="form.roleid" placeholder="请选择">
            <el-option v-for="item in userList" :key="item.id" :label="item.rolename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账号" prop="username">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isShow = false">取 消</el-button>
        <el-button type="primary" @click="addAdminList">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { addAdminLists, editAdminLists } from "../../../model/admin";
export default {
  props: ["info","params"],
  data() {
    return {
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
      rules: {
        username: [{ required: true, message: "请输入名字", trigger: "blur" }],
        menus: [{ required: true, message: "请勾选列表", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapState({ userList: (state) => state.user.userList }),
  },
  created() {
    this.getUserList()
    this.getAdminList(this.params)
  },
  methods: {
    ...mapActions("user", ["getUserList"]),
    ...mapActions("admin",["getAdminList"]),
    addAdminList() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.info.isAdd == true) {
            addAdminLists(this.form).then((res) => {
              if (res.code == 200) {
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                this.getAdminList(this.params);
                this.info.isShow = false;
              } else {
                this.$message({
                  message: res.msg,
                  type: "error",
                });
              }
            });
          } else {
            console.log(111);
            editAdminLists(this.form).then((res) => {
              if (res.code == 200) {
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                this.getAdminList(this.params);
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
      this.form =  {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      }
    },
    sendmode(row) {
     this.form=row
     this.form.password=""
    },
  },
  components: {},
};
</script>
<style scoped>
</style>