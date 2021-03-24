import Vue from "vue"
import axios from "axios"
import router from "../router/index"
axios.defaults.baseURL="http://127.0.0.1:3000/api"
axios.interceptors.request.use(function(request){
    if(request.url!="/userLogin"){
        let token=JSON.parse(localStorage.getItem("userInfo")||"{}")
        let token1=token.token
        request.headers.authorization=token1
    }
    return request
})
axios.interceptors.response.use(function(response){
    if(response.data.code==403){
     router.push("/login")
    }
    return response.data
})
Vue.prototype.$http=axios
export default axios