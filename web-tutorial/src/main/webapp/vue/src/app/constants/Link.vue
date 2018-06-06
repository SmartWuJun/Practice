<template>
  <div class="xn-app">
    <router-view  name="xnHeader" :title="title"  ></router-view>
    <div class="xn-main clearfix">
      <div class="module">
        <div class="h3">文档说明</div>
        <p class="p">1、跳转的方法： </p>
        <pre>
           this.$router.push({
            path:"link", /*路径*/
            query:{   /*传参*/
              id:1111111111111111111,
              keyword:"页面跳转"
            }
          })
        </pre>
        <p class="p">2、接收参数：  </p>
        <p class="p">id: {{id}}</p>
        <p class="p">keyword: {{keyword}}</p>
        <p class="p">3、接收参数方法：  </p>
        <pre>
           mounted: function () {
            this.id=this.$route.query.id;
            this.keyword=this.$route.query.keyword;
          },
        </pre>
      </div>
    </div>
  </div>

</template>

<script>
  import Vue from 'vue';
  import xnService from '../service/service';
  export default {
    name: 'Link',
    mounted: function () {
      this.id=this.$route.query.id;
      this.keyword=this.$route.query.keyword;
    },
    data () {
      return {
        title:"传递与接收参数",
        id:"",
        keyword:''
      }
    }
  }


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
