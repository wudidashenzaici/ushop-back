import axios from '../utils/http'
//获取轮播图页面数据
export function getBannerLists(){
        let res=axios.get("/bannerlist")
        return res
    }
    //添加轮播图页面数据
export function addBannerLists(data){
    let res=axios.post("/banneradd",data)
    return res
}
   //编辑轮播图页面数据
   export function editBannerLists(data){
    let res=axios.post("/banneredit",data)
    return res
}
 //删除轮播图页面数据
 export function delBannerLists(id){
    let res=axios.post("/bannerdelete",{id:id})
    return res
}
