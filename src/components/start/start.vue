<template>
  <div class="star" :class="'star-'+size">
    <span class="star-item" v-for="(sc,index) in startClasses" :key="index" :class="sc"></span>
  </div>
</template>

<script>
    export default{
      props:{
        score:Number,
        size:Number
      },
      computed:{
        startClasses(){
          let {score} = this;
          let scs = [];
          //class: on的个数
          let scoreInInteger = Math.floor(score);
          for(let i=0; i < scoreInInteger; i++){
            scs.push('on');
          }
          //class: half的个数0或者1
          if(score*10-scoreInInteger*10>5){
            scs.push("half");
          }
          //class: off的个数
          while(scs.length<5) {
            scs.push("off")
          }
          return scs
        }
      }
    }
</script>

<style>
</style>
