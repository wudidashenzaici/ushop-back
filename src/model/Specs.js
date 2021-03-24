import axios from '../utils/http'
//获取商品规格页面数据
export function getSpecsLists(params){
        let res=axios.get("/specslist",{params})
        return res
    }
    //获取商品规格页面总数
export function getSpecsCount(){
    let res=axios.get("/specscount")
    return res
}
    //添加商品规格页面数据
export function addSpecsLists(data){
    let res=axios.post("/specsadd",data)
    return res
}
   //编辑商品规格页面数据
   export function editSpecsLists(data){
    let res=axios.post("/specsedit",data)
    return res
}
 //删除商品规格页面数据
 export function delSpecsLists(id){
    let res=axios.post("/specsdelete",{id:id})
    return res
}
//获取商品规格内所有总数的列表
export function getAllSpecsList(totle){
    let res =axios.get("/specslist",{params:totle})
    return res
}
