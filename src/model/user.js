import asios from "../utils/http"
//获取菜单管理数据
export function getmenutable(){
    let res=asios.get("/menulist?istree=1")
    return res
}
//添加用户数据
export function setmeutable(data){
    let res=asios.post("/menuadd",data)
    return res
}
//删除菜单
export function delmenutable(id){
    let res=asios.post("/menudelete",{id:id})
    return res
}
//修改菜单
export function editmenutable(data){
    let res=asios.post("/menuedit",data)
    return res
}