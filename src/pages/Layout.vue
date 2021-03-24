<template>
<fullscreen ref="fullscreen">
   
  <el-container>
    <el-aside :width="flag?'64px':'226px'">
      <h3 class="box">小U商城后台</h3>
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#333"
        text-color="#fff"
        unique-opened
         :collapse-transition="false"
        :collapse="flag"
       router
        active-text-color="#00000"
      >
        <el-menu-item index="/home">
          <i class="el-icon-menu"></i>
          <span slot="title">管理中心</span>
        </el-menu-item>
        <div v-for="(item,index) in userinfo.menus" :key="item.id">
          <el-submenu :index="String(index)" id="submenu-me" v-if="item.type==1"> 
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.title}}</span>
          </template>
          <el-menu-item v-for="a in item.children" :key="a.id" :index="a.url">
            <span slot="title">{{a.title}}</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item :index="item.url"  v-else>
          <i :class="item.icon"></i>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>
        </div>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="top">
        <div class="left">
          <el-button @click="flag=!flag"
            type="primary"
            icon="el-icon-s-fold"
            size="mini"
          ></el-button><span class="manage">管理中心</span><span class="ospan">/</span><span class="ospan2">{{$route.meta.title}}</span>
          <el-button icon="el-icon-back" circle size="mini" class="back" @click="retreat"></el-button>
        </div>
        <div class="right">
          <el-dropdown>
            <span class="el-dropdown-link">
              {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><div @click="personal"><i class="el-icon-user"></i>个人信息</div></el-dropdown-item>
              <el-dropdown-item><div @click="fullscreen"><i class="el-icon-full-screen"></i>全屏预览</div></el-dropdown-item>
              <el-dropdown-item><div @click="fn()"><i class="el-icon-switch-button"></i>安全退出</div></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</fullscreen>
</template>

<script>
import Vue from "vue";
import fullscreen from 'vue-fullscreen'
// 2-注册
Vue.use(fullscreen);
export default {
  data() {
    return {
        flag:false,
        userinfo:"",
        username:""
    };
  },
  mounted() {
    let userinfo=localStorage.getItem("userInfo"||"{}")
       this.userinfo=JSON.parse(userinfo)
       this.username=this.userinfo.username
  },
  methods: {
    fullscreen() {
          this.$refs.fullscreen.toggle();
        },
        personal(){
       this.$message({
                message: "功能建设中，敬请期待。",
                type: "success",
                
              });
        },
      retreat(){
          this.$router.go(-1)
      },
      fn(){
        localStorage.removeItem("userInfo")
        this.$message({
                message: "退出成功",
                type: "success",
                
              });
              this.$router.push("/login")
      }
  },
  components: {},
};
</script>
<style scoped>
.el-header {
  /* background-color: #b3c0d1; */
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 4px 2px rgb(0 0 0 / 50%);
  z-index: 1;
}

.el-aside {
  color: #333;
  width: 226px;
  background-color: rgb(51, 51, 51);
  /* text-align: center; */
  line-height: 200px;
  z-index: 2;
}

.el-main {
  background-color: #e9eef3;
  color: #333;

}

.el-container {
  height: 100vh;
}
.box {
  line-height: 60px;
  text-align: center;
  background: #444;
  color: #fff;
  font-weight: 400;
  letter-spacing: 4px;
  white-space: nowrap;
}

.el-menu {
  border: none;
}
.el-dropdown-link {
  cursor: pointer;
  /* color: #409eff; */
}
.el-icon-arrow-down {
  font-size: 12px;
}

.manage{
    font-weight: 700;
    text-decoration: none;
    transition: color .2s cubic-bezier(.645,.045,.355,1);
    color: #303133;
    margin-left: 10px;
    vertical-align: middle;
    font-size: 14px;
}
.ospan{
    margin: 0 9px;
    font-weight: 700;
    color: #C0C4CC;
    vertical-align: middle;
    font-size: 14px;
}
.ospan2{
        font-weight: 400;
    color: #606266;
    cursor: text;
    font-size: 14px;
    vertical-align: middle;
}
.back{
    margin-left: 5px;
}
.submenu-me:hover {
    background-color: #333!important;
}
</style>