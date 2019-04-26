<template>
        <section class="msite">
          <!--首页头部-->
          <HeaderTop :title="address.name">
            <router-link class="header_search" slot="left" to="/search">
              <i class="iconfont icon-sousuo"></i>
            </router-link>
            <router-link class="header_login" slot="right" to="/login">
              <span class="header_login_text" v-if="!userInfo._id">登录|注册</span>
              <span v-else>
                <i class="iconfont icon-person"></i>
              </span>
            </router-link>
          </HeaderTop>
          <!--首页导航-->
          <nav class="msite_nav">
            <div class="swiper-container" v-if="categorys.length">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(categorys,index) in categorysArr" :key="index">
                  <a href="javascript:" class="link_to_food" v-for="(category,index) in categorys" :key='index'>
                    <div class="food_container">
                      <img :src="baseImageUrl + category.image_url">
                    </div>
                    <span>甜品饮品</span>
                  </a>
                </div>
              </div>
              <!-- Add Pagination -->
              <div class="swiper-pagination"></div>
            </div>
            <img src="./images/msite_back.svg" v-else>
          </nav>
          <!--首页附近商家-->
          <div class="msite_shop_list">
            <div class="shop_header">
              <i class="iconfont icon-xuanxiang"></i>
              <span class="shop_header_title">附近商家</span>
            </div>
            <ShopList></ShopList>
          </div >
        </section>
</template>

<script>
  import {mapState} from 'vuex'
  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
  import Swiper from 'swiper'
  import  'swiper/dist/css/swiper.min.css'
  import ShopList from '../../components/ShopList/ShopList.vue'
    export default{
      data(){
        return{
          baseImageUrl:'https://fuss10.elemecdn.com'
        }
      },
      components:{
        HeaderTop,
        ShopList
      },
      mounted(){
        this.$store.dispatch('getFootCategorys');
        this.$store.dispatch('getShops');
      },
      computed: {
        ...mapState(['address', 'categorys','shops','userInfo']),
        /*
        根据categorys一维数组生成一个二维数组
        小数组的个数最大是8
        */
        categorysArr () {
          const {categorys} = this;
          //定义二维数组
          let arr = [];
          //定义小数组
          let minArr = [];
          //遍历categorys
          categorys.forEach(function(category){
            if(minArr.length === 8){
              minArr = [];
            }
            if(minArr.length === 0){
              arr.push(minArr);
            }
            minArr.push(category)
          });
          return arr;
        }
      },
      watch: {
        categorys (value) { // categorys数组中有数据了, 在异步更新界面之前执行
          // 使用setTimeout可以实现效果, 但不是太好
          // 界面更新就立即创建Swiper对象
          this.$nextTick(() => {// 一旦完成界面更新, 立即调用(此条语句要写在数据更新之后)
            // 创建一个Swiper实例对象, 来实现轮播
            new Swiper('.swiper-container', {
              loop: true, // 可以循环轮播
              // 如果需要分页器
              pagination: {
                el: '.swiper-pagination',
              },
            })
          })

        }
      },
    }
</script>

<style>

 section.msite {
    width: 100%;
  }
 section.msite .msite_nav {
    position: relative;
    margin-top: 45px;
    height: 200px;
    background: #fff;
  }
 section.msite .msite_nav::before {
    content: '';
    position: absolute;
    z-index: 200;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: #e4e4e4;
    transform: scaleY(0.5);
  }
 section.msite .msite_nav .swiper-container {
    width: 100%;
    height: 100%;
  }
 section.msite .msite_nav .swiper-container .swiper-wrapper {
    width: 100%;
    height: 100%;
  }
 section.msite .msite_nav .swiper-container .swiper-wrapper .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
  }
 section.msite .msite_nav .swiper-container .swiper-wrapper .swiper-slide .link_to_food {
    width: 25%;
  }
 section.msite .msite_nav .swiper-container .swiper-wrapper .swiper-slide .link_to_food .food_container {
    display: block;
    width: 100%;
    text-align: center;
    padding-bottom: 10px;
    font-size: 0;
  }
 section.msite .msite_nav .swiper-container .swiper-wrapper .swiper-slide .link_to_food .food_container img {
    display: inline-block;
    width: 50px;
    height: 50px;
  }
 section.msite .msite_nav .swiper-container .swiper-wrapper .swiper-slide .link_to_food span {
    display: block;
    width: 100%;
    text-align: center;
    font-size: 13px;
    color: #666;
  }
 section.msite .msite_nav .swiper-container .swiper-pagination >span.swiper-pagination-bullet-active {
    background: #02a774;
  }
 section.msite .msite_shop_list {
    position: relative;
    margin-top: 10px;
    background: #fff;
  }
 section.msite .msite_shop_list::before {
    content: '';
    position: absolute;
    z-index: 200;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    background-color: #e4e4e4;
  }
 section.msite .msite_shop_list .shop_header {
    padding: 10px 10px 0;
  }
 section.msite .msite_shop_list .shop_header .shop_icon {
    margin-left: 5px;
    color: #999;
  }
 section.msite .msite_shop_list .shop_header .shop_header_title {
    color: #999;
    font-size: 14px;
    line-height: 20px;
  }
</style>
