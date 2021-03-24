import axios from '../utils/http'
//获取限时秒杀页面数据
export function getSeckLists(){
        let res=axios.get("/secklist")
        return res
    }
    //添加限时秒杀页面数据
export function addSeckLists(data){
    let res=axios.post("/seckadd",data)
    return res
}
   //编辑限时秒杀页面数据
   export function editSeckLists(data){
    let res=axios.post("/seckedit",data)
    return res
}
 //删除限时秒杀页面数据
 export function delSeckLists(id){
    let res=axios.post("/seckdelete",{id:id})
    return res
}
