<template >

  <div class="xn-app">
    <router-view  name="xnHeader" :title="title"  ></router-view>
    <div class="xn-main  clearfix">

      <div class="module ">
        <h3 class="h3">框架</h3>
        <ul class="ul">
          <mt-cell title="多语言" to="/language"  value="多语言"  is-link></mt-cell>
          <mt-cell title="axios" to="/service"  value="跨域请求数据"  is-link></mt-cell>
          <mt-cell title="Vuex" to="/vuex"  value="Vuex"  is-link></mt-cell>
          <mt-cell title="router" to="/router"  value="路由"  is-link></mt-cell>
          <mt-cell title="require" to="/require"  value="分拆压缩文件使用异步加载"  is-link></mt-cell>
        </ul>
      </div>
      <div class="module ">
        <h3 class="h3">页面交互及数据传递</h3>
        <ul class="ul">
          <li class="li xn-text-right" @click="goLink" >点击页面跳转和传参</li>
          <li class="li xn-text-right" @click="setProp" >单页面弹出</li>
        </ul>
      </div>
      <div class="module ">
        <h3 class="h3">页面交互</h3>
        <ul class="ul">
          <mt-cell title="登陆页面" to="/login"  value="注册"  is-link></mt-cell>
          <mt-cell title="注册" to="/register"  value="重定向到登录页面"  is-link></mt-cell>
          <mt-cell title="调用公共方法" to="/goBack"  value="返回"  is-link></mt-cell>
        </ul>
      </div>

      <div class="module ">
        <h3 class="h3">组件</h3>
        <ul class="ul">
          <mt-cell title="滚动加载更多" to="/scroll"  value="滚动加载更多"  is-link></mt-cell>
          <mt-cell title="日历组件" to="/calendar"  value="日历组件"  is-link></mt-cell>
          <mt-cell title="审批" to="/approval"  value="审批组件"  is-link></mt-cell>
          <mt-cell title="提交审批" to="/approvalUser"  value="选择提交人"  is-link></mt-cell>
        </ul>
      </div>

    </div>
    <router-view   name="Swipe"  :number="number"  ></router-view>
  </div>

</template>

<script>
  import Vue from 'vue';
  import { Cell } from 'mint-ui';
  Vue.component( Cell.name, Cell);
  export default {
    name: 'Index',
    data() {
      return {
        title:"DEMO首页",
        number:0

      };
    },
    methods:{
      goLink:function(){
        this.$router.push({
          path:"link", /*路径*/
          query:{   /*传参*/
            id:1111111111111111111,
            keyword:"页面跳转"
          }
        })
      },
      setProp:function(){
        this.$store.commit('showSwipeFn', {});
      }
    },
   /* beforeCreate: function () {console.log('beforeCreate is triggered.')},
    created: function () {console.log('created is triggered.')},
    beforeMount: function () {console.log('beforeMount is triggered.')},
    mounted: function () {console.log('mounted is triggered.')},
    beforeUpdate: function () {console.log('beforeUpdate is triggered.')},
    updated: function () {console.log('updated is triggered.')},
    beforeDestroy: function () {console.log('beforeDestroy is triggered.')},
    destroyed: function () {console.log('destroyed is triggered.')}*/
  };
</script>

<style  scoped>
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
  .module{
    margin-bottom: 0.3rem;
    background: #fff;
  }
  .module .h3{
    color: red;
    padding: 0 0.5rem;
    line-height: 1rem;
    border-bottom: 1px solid #dcdcdc;
    text-align: center;
  }
  .module .ul{
  }
  .module .li{
    width: 100%;
    height: 1.2rem;
    line-height: 1.2rem;
    background: #fff;
    padding: 0 0.5rem;
    border-bottom: 1px dashed #ddd;
  }
  .mint-cell{
    border-bottom: 1px dashed #ddd;
  }
</style>
