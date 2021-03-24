import {getBannerLists} from "../../model/banner"
export default{
    namespaced:true,
    state(){
        return{
            bannerList:[]
        }
    },
    mutations:{
        BannerList(state,data){
         state.bannerList=data
        }
    },
    actions:{
        getBannerList({commit}){
            getBannerLists().then(res=>{
                commit("BannerList",res.list)
            })
        }
    }
}