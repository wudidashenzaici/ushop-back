import axios from '../utils/http'
//获取角色页面数据
export function getUserLists(){
        let res=axios.get("/rolelist")
        return res
    }
    //添加角色页面数据
export function addUserLists(data){
    let res=axios.post("/roleadd",data)
    return res
}
   //编辑角色页面数据
   export function editUserLists(data){
    let res=axios.post("/roleedit",data)
    return res
}
 //删除角色页面数据
 export function delUserLists(id){
    let res=axios.post("/roledelete",{id:id})
    return res
}
