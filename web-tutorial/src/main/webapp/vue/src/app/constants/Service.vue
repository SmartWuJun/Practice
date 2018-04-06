<template>
  <div class="xn-app">
    <router-view  name="xnHeader" :title="title"  ></router-view>
    <div class="xn-main clearfix">
      <div class="module">
        <div class="h3">文档说明</div>
        <p class="p">前提：  </p>
        <p class="p">1、修改网址：http://local.xiniunet.com  </p>
        <p class="p">2、用户登陆：auth.xiniunet.com  </p>
        <p class="p">结果：  </p>
        <p class="p">{{showData}}  </p>
      </div>
    </div>
  </div>

</template>

<script>
  import Vue from 'vue';
  import xnService from '../service/service';
  export default {
    name: 'service',
    mounted: function () {
      // 请求数据
      this.gitList();
    },
    data () {
      return {
        title:"服务请求",
        showData:""
      }
    },
    methods: {
      gitList:function(){
        let _this=this;
        var vm={
          pageSize:1,
          pageNumber:10
        };
        xnService.getList(vm).then(function (response){
          console.log("请求成功！")
          console.log(response)
          _this.showData=response.data;
        })
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
