<template>
  <div id="app">
      <router-view/>
    <FooterGuide v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
  import FooterGuide from './components/FooterGuide/FooterGuide.vue';
  import {reqFootCategorys} from './api'
export default {
  components:{
    FooterGuide
  },
  /*async mounted(){
    const result = await reqFootCategorys();
    console.log(result);
  }*/
  mounted(){
    this.$store.dispatch('getAddress');
    this.$store.dispatch('getUserInfo');
  }

}
</script>

<style>
  #app {
    width: 100%;
    height: 100%;
    background: #f5f5f5;
    position: relative;
  }

</style>
