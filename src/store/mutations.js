/**
 *更新state中的数据
 */
import Vue from 'vue'
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
export default {
  [RECEIVE_ADDRESS](state,{address}){//state.js文件中的state,{address}是actions传的参数
    state.address = address
  },
  [RECEIVE_CATEGORYS](state,{categorys}){
    state.categorys = categorys
  },
  [RECEIVE_SHOPS](state,{shops}){
    state.shops = shops
  },
  [RECEIVE_USERINFO](state,{userInfo}){
    state.userInfo = userInfo
  },
  [RESET_USER_INFO](state){//用户登出清除用户信息
    state.userInfo = {}
  },
  [RECEIVE_GOODS](state,{goods}){
    state.goods = goods;
  },
  [RECEIVE_RATINGS](state,{ratings}){
    state.ratings = ratings;
  },
  [RECEIVE_INFO](state,{info}){
    state.info = info;
  },
  [INCREMENT_FOOD_COUNT](state,{food}){
    if(!food.count){//cart中食物数量第一次增加
      // food.count = 1  // 新增属性(没有数据绑定)
      Vue.set(food,'count',1);// 让新增的属性也有数据绑定
      state.cartFoods.push(food);
    }else{
      food.count++;
    }
  },
  [DECREMENT_FOOD_COUNT](state,{food}){
    if(food.count>0){
      food.count--;
      // 将food从cartFoods中移除
      if(food.count === 0){
        state.cartFoods.splice(state.cartFoods.indexOf(food),1)
      }
    }
  },
  //清空购物车
  [CLEAR_CART](state){
    //清空食物的数量
    state.cartFoods.forEach(food => food.count = 0);
    //cartFoods清空
    state.cartFoods = [];
  },
  //搜索
  [RECEIVE_SEARCH_SHOPS](state,{searchShops}){
    state.searchShops = searchShops;
  }
}





