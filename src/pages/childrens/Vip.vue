<template>
 <div>
     <el-card>
         <el-table
      :data="memberLists"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="用户id"> </el-table-column>
      <el-table-column prop="nickname" label="昵称"> </el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="addtime" label="注册日期"></el-table-column>
      <el-table-column prop="" label="操作">
        <template slot-scope="scope">
          <el-button
            @click="edit(scope.row)"
            type="success"
            icon="el-icon-edit"
            circle
            size="mini"
          ></el-button>
          
        </template>
      </el-table-column>
    </el-table>
     </el-card>
     <Vip-popout ref="model" :info="info"></Vip-popout>
 </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import VipPopout from './popout/VipPopout';
export default {
  data() {
    return {
        info:{
            isShow:false
        }
    };
  },
  created() {
    this.getmemberList();
  },
  computed: {
    ...mapState({ memberLists: (state) => state.vip.memberLists }),
  },
  methods: {
    ...mapActions("vip", ["getmemberList"]),
    edit(row) {
      this.info.isShow=true,
      this.$refs.model.sendRow(row)
    },
  },
  components: {VipPopout},
};
</script>
<style scoped>
</style>