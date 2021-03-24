import {getAdminLists,getAdminCounts} from "../../model/admin"
export default{
    namespaced:true,
    state(){
        return{
          adminList:[],
          adminCoust:0
        }
    },
    mutations:{
        adminList(state,data){
         state.adminList=data
        },
        adminCoust(state,data){
        state.adminCoust=data
        }
    },
    actions:{
        getAdminList({commit,dispatch},params){
            getAdminLists(params).then(res=>{
                commit("adminList",res.list)
                dispatch("getAdminCount")
            })
        },
        getAdminCount({commit}){
            getAdminCounts().then(res=>{
                // console.log(res.list[0].total);
                commit("adminCoust",res.list[0].total)
            })
        }
    }
}