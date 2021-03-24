import {getGoodsLists,getGoodsCounts} from "../../model/goods"
export default{
    namespaced:true,
    state(){
        return{
            goodsList:[],
            goodsCoust:0
        }
    },
    mutations:{
        goodsList(state,data){
         state.goodsList=data
        },
        goodsCoust(state,data){
        state.goodsCoust=data
        }
    },
    actions:{
        getGoodsList({commit,dispatch},params){
            getGoodsLists(params).then(res=>{
                commit("goodsList",res.list)
                dispatch("getGoodsCount")
            })
        },
        getGoodsCount({commit}){
            getGoodsCounts().then(res=>{
                // console.log(res.list[0].total);
                commit("goodsCoust",res.list[0].total)
            })
        }
    }
}