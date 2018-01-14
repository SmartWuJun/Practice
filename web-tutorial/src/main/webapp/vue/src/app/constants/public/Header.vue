<template>
  <div id="xnHeader" class="">
    <div class=""></div>
    <mt-header class="xn_header" :fixed="is_fixed" :title="title" >
      <div slot="left">
        <mt-button icon="back" @click="goBack"></mt-button>
      </div>
    </mt-header>

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
    props: [ 'title'],
    methods: {
      goBack:function (){
        /*this.$router.go(-1);*/
        window.history.back();
      }
    }
  };
</script>
<style  lang="less" scoped>
  #xnHeader{
    margin-bottom: 40px;
  }
</style>
