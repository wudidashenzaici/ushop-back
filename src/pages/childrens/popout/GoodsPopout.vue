<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '新增' : '编辑'"
      :visible.sync="info.isShow"
      :fullscreen="true"
      @close="reset"
    >
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="基本信息" name="first"><el-form :model="form" label-width="100px" :rules="rules" ref="form">
        <el-form-item label="一级分类" prop="first_cateid">
          <el-select v-model="form.first_cateid" placeholder="请选择"  @change="firstCate">
            <el-option v-for="item in CateList" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" prop="second_cateid">
          <el-select v-model="form.second_cateid" placeholder="请选择">
            <el-option v-for="item in secondCateid" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" prop="goodsname">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品图片">
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
     <el-form-item label="商品价格" prop="price">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" prop="market_price">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
        </el-form-item>
       <el-form-item label="商品规格" prop="specsid">
          <el-select v-model="form.specsid" placeholder="请选择" @change="specsAttr">
            <el-option v-for="item in specsList" :key="item.id" :label="item.specsname" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性值" prop="specsattr">
          <el-select v-model="form.specsattr" placeholder="请选择">
            <el-option v-for="(item,index) in specsattrs" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" prop="isnew">
          <el-radio-group v-model="form.isnew">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否热卖" prop="ishot">
          <el-radio-group v-model="form.ishot">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form></el-tab-pane>
    <el-tab-pane label="配置管理" name="second">商品详情</el-tab-pane>
  </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isShow = false">取 消</el-button>
        <el-button type="primary" @click="addGoodsList">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { addGoodsLists, editGoodsLists } from "../../../model/goods";
export default {
  props: ["info","params"],
  data() {
    return {
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price:"",
        market_price:"",
        img:"",
        description:"",
        specsid:"",
        specsattr:"",
        isnew:1,
        ishot:1,
        status:1
      },
      rules: {
        first_cateid: [{ required: true, message: "请输入选项", trigger: "blur" }],
        second_cateid: [{ required: true, message: "请勾选列表", trigger: "blur" }],
        goodsname: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        price: [{ required: true, message: "商品价格", trigger: "blur" }],
        market_price: [{ required: true, message: "请输入市场价格", trigger: "blur" }],
         second_cateid: [{ required: true, message: "请勾选列表", trigger: "blur" }],
          specsid: [{ required: true, message: "请勾选列表", trigger: "blur" }],
        specsattr: [{ required: true, message: "请勾选列表", trigger: "blur" }],
        isnew: [{ required: true, message: "请勾选是否新品", trigger: "blur" }],
        ishot: [{ required: true, message: "请勾选是否热卖", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },
      activeName: 'first',
      imageUrl: '',
      secondCateid:"",
      specsattrs:""
    };
  },
  computed: {
    ...mapState({ CateList: (state) => state.CateList.CateLists,specsList: (state) => state.specs.AllSpecsList }),
  },
  created() {
    this.getCategoryList()
    this.getGoodsList(this.params)
    this.getSpecsList("")
  },
  methods: {
    ...mapActions("CateList", ["getCategoryList"]),
    ...mapActions("goods",["getGoodsList"]),
   ...mapActions("specs",["getSpecsList"]),
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(res.raw);
        this.form.img=res.raw
      },
      firstCate(){
        //通过findIndex函数找到符合条件元素的下标，this.catelist为一级分类的所有项,
        //findIndex括号内为一个函数，函数第一项参数为所有的项,通过判断当前一级分类的id this.form.first_cateid和
        //所有项的id进行判断相同返回对应的下标
         let index =this.CateList.findIndex((item)=>item.id==this.form.first_cateid)
         this.secondCateid=this.CateList[index].children
         this.form.second_cateid=""
      },
      specsAttr(){
       let index =this.specsList.findIndex((item)=>item.id==this.form.specsid)
         this.specsattrs=this.specsList[index].attrs
          this.form.specsattr=""
      },
    addGoodsList() {
      this.$refs.form.validate((valid) => {
        if (valid) {
           this.$delete(this.form,"firstcatename")
             this.$delete(this.form,"secondcatename")
          let fs=new FormData()
          for(let i in this.form){
            fs.append(i,this.form[i])
          }
          if (this.info.isAdd == true) {
            addGoodsLists(fs).then((res) => {
              if (res.code == 200) {
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                this.getGoodsList(this.params);
                this.info.isShow = false;
              } else {
                this.$message({
                  message: res.msg,
                  type: "error",
                });
              }
            });
          } else {
            editGoodsLists(fs).then((res) => {
              if (res.code == 200) {
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                this.getGoodsList(this.params);
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
        id: "",
        first_cateid: "",
        second_cateid: "",
        goodsname: 1,
        price:"",
        market_price:"",
        img:"",
        description:"",
        sepcsid:"",
        specsattr:"",
        isnew:"",
        ishot:"",
        status:""
      }
    },
    sendmode(row) {
     this.form=row
     this.imageUrl=this.$imgurls+this.form.img
      let index1 =this.CateList.findIndex((item)=>item.id==this.form.first_cateid)
         this.secondCateid=this.CateList[index1].children
         let index2 =this.specsList.findIndex((item)=>item.id==this.form.specsid)
         this.specsattrs=this.specsList[index2].attrs
    },
    handleClick(tab, event) {
        console.log(tab, event);
      }
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