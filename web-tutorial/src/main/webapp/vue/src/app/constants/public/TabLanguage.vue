<template>
  <div class="xn-fixed" >
    <li class="li" @click="setLocale"><span v-if="locale=='cn'">EN</span><span v-else="locale=='en'">CN</span></li>
    <li class="li to-top"  @click="goTop"></li>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Header } from 'mint-ui';
  import { Button } from 'mint-ui';
  Vue.component(Header.name, Header);
  Vue.component(Button.name, Button);

  export default {
    name: 'xnHeader',
    data () {
      return {
        is_fixed:true
      }
    },
    methods: {
      setLocale:function () {
        if(this.$i18n.locale=="en"){
          this.$i18n.locale="cn";
        }else {
          this.$i18n.locale="en";
        }
      },
      goTop:function(){
        document.querySelector(".xn-main").scrollTop=0;
      }

    },
    computed:{
      locale:function () {
        return this.$i18n.locale;
      }
    }

  };
</script>
<style  lang="less" scoped>
 .xn-fixed{
   position: fixed;
   right: 0.625rem;
   bottom: 0.625rem;
   width: 1.0625rem;
   height: 2.5rem;
 }
 .xn-fixed .li{
   width: 1.0625rem;
   height: 1.0625rem;
   margin-bottom: 0.25rem;
   border-radius: 50%;
   background: #2368f3;
   color: #fff;
   display:flex;
   -webkit-box-align: center;
   -ms-flex-align: center;
   align-items: center;
   justify-content: center;
   box-shadow: 0 2px 5px #dbdbdb;
 }
 .xn-fixed .to-top{
   margin-bottom:0;
   background: #fff url("../../../assets/images/toTop.png") center 50% no-repeat;
   background-size: 70% 70%;
 }
</style>
