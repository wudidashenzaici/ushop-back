import {getSpecsLists,getSpecsCount,getAllSpecsList} from "../../model/Specs"
export default{
    namespaced:true,
    state(){
        return{
          specsList:[],
          specsCoust:0,
          AllSpecsList:""
        }
    },
    mutations:{
        specsList(state,data){
         state.specsList=data
        },
        specsCoust(state,data){
        state.specsCoust=data
        },
        specsAllList(state,data){
            state.AllSpecsList=data
            }
    },
    actions:{
        getSpecsList({commit,dispatch},params){
            getSpecsLists(params).then(res=>{
                commit("specsList",res.list)
                dispatch("getSpecsCounts")
            })
        },
        getSpecsCounts({commit}){
            getSpecsCount().then(res=>{
                //  console.log(res.list[0].total);
                commit("specsCoust",res.list[0].total)
                getAllSpecsList(res.list[0].total).then(res=>{
                    commit("specsAllList",res.list)
                })
            })
        }
    }
}
  