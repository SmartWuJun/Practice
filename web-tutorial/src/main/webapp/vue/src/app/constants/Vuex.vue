<template>
  <div class="xn-app">
    <router-view  name="xnHeader" :title="title"  ></router-view>
    <div class="xn-main clearfix">
      <div class="module">
        <div class="h3">文档说明</div>
        <p class="p">需求：  </p>
        <p class="p">Vuex 主要用于解决兄弟组件及多层嵌套组件之间传递数据的作用 </p>
        <p class="p">网址 </p>
        <p class="p">http://vuex.vuejs.org/zh-cn/intro.html  </p>
        <p class="p">使用 </p>
        <p class="p">1、定义一个文件夹store 及一个store.js文件</p>
        <p class="p">
          new Vuex.Store({
          state,
          mutations,
          actions,
          getters
          });
        </p>
        <p class="p">
          state：用一个对象就包含了全部的应用层级状态。
        </p>
        <p class="p">2、index.js引用</p>
        <p class="p">
          import store from './app/store/store';
        </p>
        <p class="p">
          new Vue({ store});
        </p>

      </div>
      <div class="module">
        <div class="h3">state</div>
        <p class="p">通过在根实例中注册 store 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 this.$store 访问到。</p>
        <pre>
         export default {
           ...
            computed : {
              swipeShow : function(){
                return this.$store.state.swipeShow
              }
            }
          };
        </pre>
      </div>
      <div class="module">
        <div class="h3">mutations</div>
        <p class="p">1、更改 Vuex 的 store 中的状态的唯一方法是提交 mutation</p>
        <p class="p">2、Vuex 中的 mutations 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。</p>
        <pre>    const store = new Vuex.Store({
          state: {
            count: 1
          },
          mutations: {
            increment (state) {
              // 变更状态
              state.count++
            }
          }
        })
        </pre>
        <p class="p">3、通过 mutations以相应的 type 调用store.commit 方法</p>
         <pre>    store.commit('increment') </pre>
        <p class="p">4、mutation 的 载荷（payload）：</p>
        <pre>
          mutations: {
            increment (state, n) {
              state.count += n
            }
          }
          store.commit('increment', 10)
        </pre>
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

    },
    data () {
      return {
        title:"Vuex",
        showData:""
      }
    },
    methods: {

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
