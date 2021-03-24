<template>
  <div>
    <el-dialog :title="info.isAdd?'新增':'编辑'" :visible.sync="info.isShow" @close="reset">
      <el-form :model="form" label-width="100px" :rules="rules" ref="form">
        <el-form-item label="角色名称" prop="rolename">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限">
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            ref="tree"
            :props="defaultProps"
          >
          </el-tree>
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
import {addUserLists,editUserLists} from '../../../model/menu'
export default {
    props:["info"],
  data() {
    return {
      form: {
        rolename: "",
        menus:"",
        status:1
      },
      defaultProps: {
        children: "children",
        label: "title",
      },
      rules: {
        rolename: [{ required: true, message: "请输入名字", trigger: "blur" }],
        menus: [{ required: true, message: "请勾选列表", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }]
      },
    };
  },
  computed:{
   ...mapState({menuList:state=>state.menu.menuLists})
  },
  created() {
      this.getmenuList()
  },
  methods: {
      ...mapActions("menu",["getmenuList"]),
      ...mapActions("user",["getUserList"]),
      addRoleList(){
        this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.menus=this.$refs.tree.getCheckedKeys().join(",")
            if(this.info.isAdd==true){
            addUserLists(this.form).then(res=>{
                if(res.code==200){
                this.$message({
                message: res.msg,
                type: "success",
                
              });
              this.getUserList()
              this.info.isShow=false
                }else{
                    this.$message({
                message: res.msg,
                type: "error",
                
              });
                }
            })
            }else{
            editUserLists(this.form).then(res=>{
                if(res.code==200){
                this.$message({
                message: res.msg,
                type: "success",
                
              });
              this.getUserList()
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
        rolename: "",
        menus:"",
        status:1
      }
      this.$refs.tree.setCheckedKeys([])
      },
      getPopoutList(row){
          this.form={...row}
          let menus=this.form.menus.split(",")
          this.$nextTick(()=>{
              this.$refs.tree.setCheckedKeys(menus)
          })
        //   this.$refs.tree.setCheckedKeys(menus)
      }
  },
  components: {},
};
</script>
<style scoped>
</style>