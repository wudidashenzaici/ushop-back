import axios from '../utils/http'
//获取商品管理页面数据
export function getGoodsLists(params){
        let res=axios.get("/goodslist",{params:params})
        return res
    }
    //添加商品管理页面数据
export function addGoodsLists(data){
    let res=axios.post("/goodsadd",data)
    return res
}
   //编辑商品管理页面数据
   export function editGoodsLists(data){
    let res=axios.post("/goodsedit",data)
    return res
}
 //获取商品管理页面总数
 export function getGoodsCounts(){
    let res=axios.get("/goodscount")
    return res
}

  
 //删除商品管理页面数据
 export function delGoodsLists(id){
    let res=axios.post("/goodsdelete",{id:id})
    return res
}
