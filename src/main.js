// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {Button} from 'mint-ui'

//加载mockServer 、webpack的入口文件main.js
import './mock/mockServer'

// 注册全局组件标签
Vue.component(Button.name,Button);//<mt-button>


new Vue({
  el: '#app',
  router,//用上路由
  components: { App },
  template: '<App/>',
  store//用上store
});
