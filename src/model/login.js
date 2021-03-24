import axios from '../utils/http'

// 管理员登录
export function userLogin(data) {
    let res =  axios.post('/userlogin', data)
    return res
}