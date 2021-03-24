import Vue from 'vue';
import Vuex from 'vuex';
// 2-注册
Vue.use(Vuex);
import menu from "../store/menu/menu"
import user from "../store/user/user"
import admin from "../store/admin/admin"
import vip from "../store/vip/vip"
import CateList from "../store/Category/Category"
import specs from "../store/specs/specs"
import seckill from "../store/seckill/seckill"
import goods from "../store/goods/goods"
import banner from "../store/banner/banner"
// 3-创建数据存储对象
const store=new  Vuex.Store({
    state:{},
    mutations:{},
    getter:{},
    actions:{},
    modules:{
        menu,
        user,
        admin,
        vip,
        CateList,
        specs,
        seckill,
        goods,
        banner,
    }
});

// 4-导出
export default store;