/**
 * 通过mutations更新state的多个方法的对象
 */
import vue from 'vue'
import {RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USERINFO,
  RESET_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART,
  RECEIVE_SEARCH_SHOPS
} from './mutation-types'
import {reqAddress,reqFootCategorys,reqShops,reqUserInfo,reqLogout,reqShopGoods,reqShopRatings,reqShopInfo,reqSearchShop} from '../api'

export default {
  //异步获取地址
  async getAddress({commit,state}){//state.js中的state
    //发送ajax请求
    const geohash = state.latitude + ','+ state.longitude;
    const result = await reqAddress(geohash);
    //提交一个mutation
    if(result.code === 0){
      const address = result.data;
      commit(RECEIVE_ADDRESS,{address})
    }
  },
  //异步获取食品列表
  async getFootCategorys({commit,state}){
    //发送ajax请求
    const result = await reqFootCategorys();
    //提交一个mutation
    if(result.code === 0){
      const categorys = result.data;
      commit(RECEIVE_CATEGORYS,{categorys})
    }
  },
  //异步获取商家列表
  async getShops({commit,state}){
    //发送ajax请求
    const latitude = state.latitude;
    const longitude = state.longitude;
    const result = await reqShops(longitude,latitude);
    //提交一个mutation
    if(result.code === 0){
      const shops = result.data;
      commit(RECEIVE_SHOPS,{shops})
    }
  },
  //在login页面已经发送ajax请求得到userInfo，同步记录用户信息
  recordUser({commit},userInfo){
    commit(RECEIVE_USERINFO,{userInfo})
  },
  //获取用户信息
  async getUserInfo({commit}){
    //根据会话session获取用户信息
    const result = await reqUserInfo();
    if(result.code == 0){//成功
      const userInfo = result.data;
      commit(RECEIVE_USERINFO,{userInfo});
    }

  },
  //异步登出
  async logout({commit}){
    const result = await reqLogout();
    if(result.code == 0){
      commit(RESET_USER_INFO)
    }
  },

  // 异步获取商家商品列表
  async getShopGoods({commit},callback){
    const result = await reqShopGoods();
    if(result.code == 0){
      const goods = result.data;
      commit(RECEIVE_GOODS,{goods});
      //数据更新了，通知一下组件
      callback && callback()
    }
  },
  // 异步获取商家评价列表
  async getShopRatings({commit},callback){
    const result = await reqShopRatings();
    if(result.code == 0){
      const ratings = result.data;
      commit(RECEIVE_RATINGS,{ratings});
      //数据更新了，通知一下组件
      callback && callback();
    }
  },
  // 异步获取商家信息
  async getShopInfo({commit}){
    const result = await reqShopInfo();
    if(result.code == 0){
      const info = result.data;
      commit(RECEIVE_INFO,{info});
    }
  },
  //同步更新food中的count
  updateFoodCount({commit},{isAdd,food}){
    if(isAdd){//count增加
      commit(INCREMENT_FOOD_COUNT,{food})
    }else {//count监少
      commit(DECREMENT_FOOD_COUNT,{food})
    }
  },
  //同步清空购物车
  clearCart({commit}){
    commit(CLEAR_CART)
  },
  //搜素得到商家列表
  async getSearchShops({commit,state},keyword){
    const geohash = state.latitude + ','+ state.longitude;
    const result = await reqSearchShop(geohash,keyword);
    if(result.code === 0){
      const searchShops =result.data;
        commit(RECEIVE_SEARCH_SHOPS,{searchShops});
    }
  }
}



