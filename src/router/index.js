/*
* 路由器对象模块
* */
import Vue from 'vue'
import Router from 'vue-router'
import Msite from '../pages/Msite/Msite.vue'
import Search from '../pages/Search/Search.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Login from '../pages/Login/Login.vue'
import Shop from '../pages/Shop/Shop.vue'
import Goods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import Info from '../pages/Shop/ShopInfo/ShopInfo.vue'
import Ratings from '../pages/Shop/ShopRatings/ShopRatings.vue'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/msite'
    },
    {
      path: '/msite',
      component: Msite,
      meta:{
        showFooter : true
      }
    },
    {
      path: '/search',
      component: Search,
      meta:{
        showFooter : true
      }
    },
    {
      path: '/order',
      component: Order,
      meta:{
        showFooter : true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta:{
        showFooter : true
      }
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/shop',
      component: Shop,
      children:[
        {
          path:'/shop',
          redirect:'/shop/goods'
        },
        {
          path:'/shop/goods',
          component:Goods
        },
        {
          path:'/shop/info',
          component:Info
        },
        {
          path:'/shop/ratings',
          component:Ratings
        }
      ]
    }
  ]
})
