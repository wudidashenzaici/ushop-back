import {getUserLists} from "../../model/menu"
export default{
    namespaced:true,
    state(){
        return{
            userList:[]
        }
    },
    mutations:{
        UserList(state,data){
         state.userList=data
        }
    },
    actions:{
        getUserList({commit}){
            getUserLists().then(res=>{
                commit("UserList",res.list)
            })
        }
    }
}