import axios from '../utils/http'
//获取管理员页面数据
export function getAdminLists(params){
        let res=axios.get("/userlist",{params:params})
        return res
    }
    //添加管理员页面数据
export function addAdminLists(data){
    let res=axios.post("/useradd",data)
    return res
}
   //编辑管理员页面数据
   export function editAdminLists(data){
    let res=axios.post("/useredit",data)
    return res
}
 //获取管理员页面总数
 export function getAdminCounts(){
    let res=axios.get("/usercount")
    return res
}

  
 //删除管理员页面数据
 export function delAdminLists(uid){
    let res=axios.post("/userdelete",{uid:uid})
    return res
}
