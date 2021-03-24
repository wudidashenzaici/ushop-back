<template>
  <div>
    <el-table
      :data="CateList"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="ID"> </el-table-column>
      <el-table-column prop="img" label="分类图片">
        <template slot-scope="scope">
          <img :src="$imgurls+scope.row.img" alt="" class="img" v-if="scope.row.pid!=0">
        </template>
      </el-table-column>
      <el-table-column prop="catename" label="分类名称"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag type="warning" v-if="scope.row.status == 2" size="small"
            >禁用</el-tag
          >
          <el-tag type="success" v-if="scope.row.status == 1" size="small"
            >正常</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作">
        <template slot-scope="scope">
          <el-button
            @click="edit(scope.row)"
            type="success"
            icon="el-icon-edit"
            circle
            size="mini"
          ></el-button>
          <el-button
            @click="del(scope.row.id)"
            type="danger"
            icon="el-icon-delete"
            circle
            size="mini"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
 import { delcatedelete } from "../../../model/Category";
export default {
  props:["info"],
  data() {
    return {};
  },
  created() {
    this.getCategoryList();
  },
  computed: {
    ...mapState({ CateList: (state) => state.CateList.CateLists }),
  },
  methods: {
    ...mapActions("CateList", ["getCategoryList"]),
    edit(row) {
      this.info.isShow=true,
      this.info.isAdd=false
      this.$emit("sendRow",row)
    },
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(id);
         delcatedelete(id).then(res=>{
           if(res.code==200){
             this.getCategoryList();
             this.$message({
            type: 'success',
            message: res.msg
          });
           }else{
             this.$message({
            type: 'error',
            message: res.msg
          });
           }
         })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  components: {},
};
</script>
<style scoped>
.img{
  width: 150px;
  height: 100px;
}
</style>