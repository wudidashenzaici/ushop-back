import Vue from 'vue'
import Router from 'vue-router'
import Login from "../pages/Login"
import Layout from "../pages/Layout"
import Menu from "../pages/childrens/Menu"
import User from "../pages/childrens/User"
import Admin from "../pages/childrens/Admin"
import Category from "../pages/childrens/Category"
import Vip from "../pages/childrens/Vip"
import Banner from "../pages/childrens/Banner"
import Seckill from "../pages/childrens/Seckill"
import Home from "../pages/childrens/Home"
let Specs=()=>import("../pages/childrens/Specs")
let Goods=()=>import("../pages/childrens/Goods")

Vue.use(Router)
// 解决跳转到登录页报错问题，重复点击导航
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

let router= new Router({
  routes: [
    {
      path: '/',
      redirect:"/home",
      meta:{
        title:"管理中心"
      },
      
      component: Home 
    },
    {
      path: '/layout',
      name: 'Layout',
      meta:{
        title:"后台页面"
      },
      children:[
        {
          path: '/home',
          meta:{
            title:"管理中心"
          },
          
          component: Home 
        },
        {
          path:"/menu",
          name:"menu",
          meta:{
          title:"菜单管理"
          },
          component: Menu
        },
        {
          path:"/user",
          name:"user",
          meta:{
          title:"角色管理"
          },
          component: User
        },
        {
          path:"/admin",
          name:"admin",
          meta:{
          title:"管理员管理"
          },
          component: Admin
        },
        {
          path:"/category",
          name:"Category",
          meta:{
          title:"商品分类"
          },
          component: Category
        },
        {
          path:"/specs",
          name:"specs",
          meta:{
          title:"商品规格"
          },
          component: Specs
        },
        {
          path:"/goods",
          name:"goods",
          meta:{
          title:"商品管理"
          },
          component: Goods
        },
        {
          path:"/vip",
          name:"Vip",
          meta:{
          title:"会员管理"
          },
          component: Vip
        },
        {
          path:"/banner",
          name:"Banner",
          meta:{
          title:"轮播图管理"
          },
          component: Banner
        },
        {
          path:"/seckill",
          name:"Seckill",
          meta:{
          title:"秒杀活动"
          },
          component: Seckill
        },
      ],
      
      component: Layout
    },
    {
      path: '/login',
      name: 'Login',
      meta:{
        title:"登录页"
      },
      component: Login
    },

  ]
})
router.beforeEach(function(to,from,next){{
  if(to.path != '/login') {
    let userInfo = JSON.parse(localStorage.getItem('userInfo')||'{}')
    if(!userInfo.token) {
      return next('/login')
    }
  }
  document.title=to.meta.title
  next()
}

})
export default router
