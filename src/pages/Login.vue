<template>
  <div>
    <div class="login_wrap">
      <div class="login_form">
        <h3 class="login_title">小U商城后台管理系统</h3>
        <el-form
          :model="loginInfo"
          :rules="rules"
          ref="loginInfo"
          class="demo-ruleForm"
        >
          <el-form-item prop="username">
            <el-input placeholder="请输入用户名" v-model="loginInfo.username" autocomplete="off">
              <template slot="prepend"
                ><i class="el-icon-user-solid"></i
              ></template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="请输入密码" v-model="loginInfo.password" autocomplete="off" show-password>
              <template slot="prepend"><i class="el-icon-lock"></i></template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              class="sub"
              @click="submitForm()"
              >提交</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { userLogin } from "../model/login"
export default {
  data() {
    return {
      loginInfo: {
        username: "admin",
        password: "admin888",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.loginInfo.validate((valid) => {
        if (valid) {
          userLogin(this.loginInfo).then((res) => {
            if (res.code == 200) {
              // 1.把登录接收到的信息存储到localStorage
              localStorage.setItem("userInfo", JSON.stringify(res.list));
              // 2.弹出登录成功的消息
              this.$message({
                message: res.msg,
                type: "success",
              });
              // 3.跳转到Layout页面
              this.$router.push('/')
            } else {
              // 1.弹出失败消息
              this.$message({
                message: res.msg,
                type: "error",
              });
            }
          });;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style scoped>
.login_wrap {
  width: 100%;
  height: 100vh;
  position: relative;
  background: url(../assets/loginbg.jpeg);
}
.login_form {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 400px;
  height: 300px;
  background-color: white;
  border-radius: 4px;
  padding: 0 30px;
}
.login_title {
  color: #409eff;
  text-align: center;
  margin: 40px 0;
}
.sub {
  width: 100%;
}
</style>