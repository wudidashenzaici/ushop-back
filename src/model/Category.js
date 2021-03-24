import asios from "../utils/http"
//获取商品分类管理数据
export function getcatelist(){
    let res=asios.get("catelist?istree=1")
    return res
}
//添加商品分类数据
export function setcateadd(data){
    let res=asios.post("/cateadd",data)
    return res
}
//删除商品分类
export function delcatedelete(id){
    let res=asios.post("/catedelete",{id:id})
    return res
}
//修改商品分类
export function editcateedit(data){
    let res=asios.post("/cateedit",data)
    return res
}