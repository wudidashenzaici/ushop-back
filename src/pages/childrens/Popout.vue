<template>
  <el-dialog @close="reset()" title="新增" :visible.sync="info.isShow" class="add">
    <el-form
      :model="formInfo"
      label-width="120px"
      :rules="rules"
      ref="formInfo"
    >
      <el-form-item label="类型" prop="type">
       <el-radio-group v-model="formInfo.type">
          <el-radio :label="1">目录</el-radio>
          <el-radio :label="2">菜单</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="上级" v-show="formInfo.type == 2">
        <el-select v-model="formInfo.pid">
          <el-option label="顶级菜单" value="0"></el-option>
          <el-option
            v-for="item in menuList"
            :key="item.id"
            :value="item.id"
            :label="item.title"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="title">
        <el-input v-model="formInfo.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="地址" v-show="formInfo.type == 2">
        <el-input v-model="formInfo.url" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图标" v-show="formInfo.type == 1">
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
import {setmeutable,editmenutable} from '../../model/user'
import { mapState,mapActions} from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      formInfo: {
        pid: "0",
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
      rules: {
        type: [{ required: true, message: "请选择类型", trigger: "blur" }],
        title: [{ required: true, message: "请输入名称", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }]
      },
    };
  },
  created() {
  },
  computed: {
    ...mapState({ menuList: (state) => state.menu.menuLists }),
  },
  methods: {
    ...mapActions("menu",["getmenuList"]),
    sendRow(row){
     this.formInfo=row
    },
    sendFormData() {
      this.$refs.formInfo.validate((valid) => {
        if (valid) {
          if(this.info.isAdd==true){
            setmeutable(this.formInfo).then(res=>{
            if(res.code==200){
              this.$message({
                message: res.msg,
                type: "success",
              });
              this.getmenuList()
              this.info.isShow = false
            }else{
              this.$message({
                message: res.msg,
                type: "error",
              });
            }
          })
          }else{
            editmenutable(this.formInfo).then(res=>{
              if(res.code==200){
              this.$message({
                message: res.msg,
                type: "success",
              });
              this.getmenuList()
              this.info.isShow = false
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
      this.formInfo={
        pid: "0",
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      }
    }
  },
  components: {},
};
</script>
<style scoped>
</style>