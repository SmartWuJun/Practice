<i18n>
  {
  "en": {
  "title": "图片轮播"
  },
  "cn": {
  "title": "图片轮播"
  }
  }
</i18n>
<template >
  <mt-popup     v-model="swipeShow"   position="right"  class="swipe" >
    <div id="xnHeader" >
      <mt-header class="xn-header" fixed  :title="$t('title')" >
        <div slot="left">
          <mt-button icon="back" @click="cancel"></mt-button>
        </div>
      </mt-header>
    </div>
    <mt-swipe :auto="4000" :defaultIndex="number">
      <mt-swipe-item v-for="(img ,index) in list"  :key="img" >
        <div class="swipe-img" :style="{backgroundImage:'url('+img+')'}"><!--<img :src="img">--></div>
      </mt-swipe-item>
    </mt-swipe>
  </mt-popup>
</template>

<script>
  import Vue from 'vue';

  import { Popup } from 'mint-ui';
  import { Swipe, SwipeItem } from 'mint-ui';
  Vue.component('mt-popup', Popup);
  Vue.component(Swipe.name, Swipe);
  Vue.component(SwipeItem.name, SwipeItem);
 import img1 from '../../assets/images/img1.jpg'
 import img2 from '../../assets/images/img2.jpg'

  export default {
    name: 'countryCodeShow',
    data() {
      return {
        list:[img1,img2]
      }
    },
    props: {
      number:{
        type: Number,
        default: 1
      }
    },
    methods:{
      cancel:function (e) {
        this.$store.commit({
          type :'closeSwipeFn',
        })
      }
    },
    computed : {
      swipeShow : function(){
        return this.$store.state.swipeShow
      }
    }
  };
</script>

<style lang="less"  scoped>

  #xnHeader{
    margin-bottom: 1.2rem;
  }
  .xn-header{
    height: 1.2rem;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #c3c3c3;
    color: #2d2d2d;
  }
  .xn-header .mint-button{
    color: #2368f3;
  }
  .xn-header .is-right .mint-button{
    color: #2d2d2d;
  }

  .swipe{
    height: 100%;
    width: 100%;
    background:#f7f7f7;
    display: flex;
    display: -webkit-flex; /* Safari */
    flex-direction: column;
  }
  .swipe-img{
    width: 100%;
    height: 100%;
    background-position:center 50%;
    background-repeat: no-repeat;
    background-size: contain;
  }


</style>
