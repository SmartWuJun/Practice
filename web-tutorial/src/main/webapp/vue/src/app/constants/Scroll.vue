<template >

  <div class="xn-app">
    <router-view  name="xnHeader" :title="title"  ></router-view>
    <div class="xn-main  clearfix" v-infinite-scroll="loadMore"  infinite-scroll-disabled="loading"  infinite-scroll-distance="30">
      <div class="module" v-for="item in list">
        <div class="h3">文档说明</div>
        <p class="p">引入： import { InfiniteScroll } from 'mint-ui';  </p>
        <p class="p">声明： Vue.use(InfiniteScroll);</p>
        <p class="p">DOM： </p>
        <p class="p">1、v-infinite-scroll="loadMore" </p>
        <p class="p"> loadMore：调用加载数据</p>
        <p class="p">2、infinite-scroll-disabled="loading" </p>
        <p class="p">loading：是否继续调用方法</p>
        <p class="p">3、infinite-scroll-distance="30"   </p>
        <p class="p"> 下面距离设置   </p>
      </div>
    </div>

  </div>
</template>

<script>
  import Vue from 'vue';

  import { InfiniteScroll } from 'mint-ui';
  Vue.use(InfiniteScroll);

  export default {
    name: 'Index',
    data() {
      return {
        title:"滚动加载数据",
        list:[]
      };
    },
    methods:{
      loadMore:function(){
        console.log("请求数据");
        this.list.push({});
        this.list.push({});
        this.list.push({});
        this.list.push({});
        this.list.push({});
      }

    }

//    beforeCreate: function () {console.log('beforeCreate is triggered.')},
//    created: function () {console.log('created is triggered.')},
//    beforeMount: function () {console.log('beforeMount is triggered.')},
//    mounted: function () {console.log('mounted is triggered.')},
//    beforeUpdate: function () {console.log('beforeUpdate is triggered.')},
//    updated: function () {console.log('updated is triggered.')},
//    beforeDestroy: function () {console.log('beforeDestroy is triggered.')},
//    destroyed: function () {console.log('destroyed is triggered.')}
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
  }
  .module .p{
    margin: 0.2rem 0.5rem;
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
