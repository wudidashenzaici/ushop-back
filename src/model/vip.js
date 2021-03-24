import asios from "../utils/http"
//获取会员管理数据
export function getmemberlist(){
    let res=asios.get("/memberlist")
    return res
}
//修改会员管理
export function editmemberedit(data){
    let res=asios.post("/memberedit",data)
    return res
}