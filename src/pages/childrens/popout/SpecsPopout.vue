<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '新增' : '编辑'"
      :visible.sync="info.isShow"
      @close="reset"
    >
      <el-form :model="form" label-width="100px" :rules="rules" ref="form">
        <el-form-item label="属性名" prop="specsname">
          <el-input v-model="form.specsname" autocomplete="off" placeholder="请输入属性名"></el-input>
        </el-form-item>
        <el-form-item label="属性值">
          <div class="box" v-for="(item,index) in list" :key="index">
            <el-input class="inp" v-model="list[index]" autocomplete="off" placeholder="请输入属性值"></el-input>
            <el-button type="success" size="small" class="btn" v-if="index==0" @click="increat">添加</el-button>
            <el-button type="danger" size="small" class="btn" v-else @click="decreat(index)">删除</el-button>
          </div>
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
import { addSpecsLists, editSpecsLists } from "../../../model/Specs";
export default {
  props: ["info","params"],
  data() {
    return {
      form: {
        specsname:"",
        attrs:"",
        status: 1,
      },
      rules: {
        specsname: [{ required: true, message: "请输入名字", trigger: "blur" }],
        // menus: [{ required: true, message: "请勾选列表", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },
      list:[""]
    };
  },
  computed: {
    ...mapState({ specsList: (state) => state.specs.specsList }),
  },
  created() {
  },
  methods: {
    ...mapActions("specs",["getSpecsList"]),
    increat(){
      this.list.push("")
    },
    decreat(index){
     this.list.splice(index,1)
    },
    addAdminList() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.attrs=this.list.join(",")
          if (this.info.isAdd == true) {
            addSpecsLists(this.form).then((res) => {
              if (res.code == 200) {
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                this.getSpecsList(this.params);
                this.info.isShow = false;
              } else {
                this.$message({
                  message: res.msg,
                  type: "error",
                });
              }
            });
          } else {
            editSpecsLists(this.form).then((res) => {
              if (res.code == 200) {
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                this.getSpecsList(this.params);
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
      this.form = {
        specsname: "",
        attrs:"",
        status: 1,
      }
      this.list=[""]
    },
    sendmode(row) {
     this.form=row
     this.list=this.form.attrs
    },
  },
  components: {},
};
</script>
<style scoped>
.box{
  display: flex;
  justify-content: space-between;
}
.btn{
  margin-left: 5px;
  margin-bottom: 5px;
}
.inp{
  margin-bottom: 5px;
}
</style>