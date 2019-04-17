<template>
    <div>
      <footer class="footer_guide">
        <a href="javascript:;" class="guide_item" :class="{on : '/msite' === $route.path}">
      <span class="item_icon">
        <i class="iconfont icon-waimai"></i>
      </span>
          <router-link to ="/msite">外卖</router-link>
        </a>
        <a href="javascript:;" class="guide_item" :class="{on : '/search' === $route.path}">
      <span class="item_icon">
        <i class="iconfont icon-search"></i>
      </span>
          <router-link to = "/search">搜索</router-link>
        </a>
        <a href="javascript:;" class="guide_item" :class="{on : '/order' === $route.path}">
      <span class="item_icon">
        <i class="iconfont icon-dingdan"></i>
      </span>
          <router-link to="/order">订单</router-link>
        </a>
        <a href="javascript:;" class="guide_item" :class="{on : '/profile' === $route.path}">
      <span class="item_icon">
        <i class="iconfont icon-geren"></i>
      </span>
          <router-link to="/profile">我的</router-link>
        </a>
      </footer>
    </div>
</template>

<script>
    export default{

    }
</script>

<style>
  .footer_guide {
    position: relative;
    position: fixed;
    z-index: 100;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    width: 100%;
    height: 50px;
    display: flex;
  }
  .footer_guide::before {
    content: '';
    position: absolute;
    z-index: 200;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    background-color: #e4e4e4;
  }
  .footer_guide .guide_item {
    display: flex;
    flex: 1;
    text-align: center;
    flex-direction: column;
    align-items: center;
    margin: 5px;
    color: #999;
  }
  .footer_guide .guide_item.on {
    color: #02a774;
  }
  .footer_guide .guide_item span {
    font-size: 12px;
    margin-top: 2px;
    margin-bottom: 2px;
  }
  .footer_guide .guide_item span .iconfont {
    font-size: 22px;
  }

</style>
