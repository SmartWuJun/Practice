<template>
  <div class="xn-app">
    <router-view  name="xnHeader" :title="title"  ></router-view>
    <div class="xn-main clearfix">
      <div class="module">
        <div class="h3">文档说明</div>
        <p class="p">前提：  </p>
        <p class="p">1、修改网址：http://local.xiniunet.com  </p>
        <div class="li" @click="goBack">调用公共方法返回</div>
      </div>
    </div>
  </div>

</template>

<script>
  import Vue from 'vue';
  import {Cell} from 'mint-ui';
  import { Toast } from 'mint-ui';

  import xnApprovalSubmit from '../components/xnApprovalSubmit.vue';

  Vue.component(Cell.name, Cell);
  Vue.component("xn-approval-submit", xnApprovalSubmit);

  export default {
    name: 'ApprovalSubmit',
    data () {
      return {
        title:"审批组件"
      }
    },
    methods: {
      //添加人员
      goBack:function () {
        var _this=this;
        //返回上一级
        _this.$xnMethod.goBack();
      }
    }
  };
</script>

<style scoped>
  .xn-app{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .xn-main{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: auto;
    width: 100%;
  }
  .xn-main .li{
    width: 100%;
    height: 1.2rem;
    line-height: 1.2rem;
  }
</style>
