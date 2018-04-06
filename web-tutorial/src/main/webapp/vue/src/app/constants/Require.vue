<template>
  <div class="xn-app">
    <router-view  name="xnHeader" :title="title"  ></router-view>
    <div class="xn-main clearfix">
      <div class="module">
        <div class="h3">文档说明</div>
        <p class="p">文件分拆压缩：  </p>
        <p class="p">const index = r => require.ensure([], () => r(require('./app/constants/Index.vue')), 'index'); </p>
        <p class="p">const Language = r => require.ensure([], () => r(require('./app/constants/Language.vue')), 'language'); </p>
        <p class="p">根据最后一个参数压缩出不同的文件 </p>

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
        title:"按需加载",
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
