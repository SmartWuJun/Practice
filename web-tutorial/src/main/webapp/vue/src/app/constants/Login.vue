<template>
  <div class="xn-app">
    <router-view  name="xnHeader" :title="title"  ></router-view>
    <div class="xn-main  clearfix">
      <div class="module">
        <div class="h3">文档说明</div>
        <p class="p">前提：  </p>
        <p class="p">1、修改网址：http://local.xiniunet.com  </p>

      </div>

      <ul class="xn-input-list">
        <li class="list-item">
          <label class="item-label" >用户名</label>
          <div class="item-value"> <input type="text"  v-model="account"   placeholder="用户名" /></div>
        </li>
        <li class="list-item">
          <label class="item-label">密码</label>
          <div class="item-value"><input type="password"  v-model="password"  placeholder="密码"  /></div>
        </li>

      </ul>
      <div class="clearfix">
        <button class="mint-button mint-button--primary  xn-btn-primary mt-b-top" @click="login">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import Md5 from "md5";
  import xnService from '../service/service';
  import { Field } from 'mint-ui';
  import { Toast } from 'mint-ui';
  Vue.component(Field.name, Field);
  import { Button } from 'mint-ui';
  Vue.component(Button.name, Button);

  export default {
    name: 'service',
    mounted: function () {

    },
    data () {
      return {
        title:"登录页面",
        account: "zhaoxing@800000",
        password: ''
      }
    },
    methods: {
      login:function(){
        let _this=this;
        let vm={
          account:_this.account,
          password:Md5(_this.password),
          id:"192.168.1.100"
        };
        xnService.Login(vm).then(function (response){
          if (response.data.errors === null || (response.data.errors.length > 0)){
            Toast(response.data.errors[0].message);
          } else {
            _this.$router.push({
              path :"/service"
            })
          }
        });

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

  /*登录*/
  .xn-input-list{
    margin-top:0.5rem;
    background: #fff;
  }
  .xn-input-list .list-item{
    height: 1.45rem;
    border-bottom:1px solid #ececec;
    display: flex;
    flex-direction:row;
    -webkit-box-align: center;
    -ms-flex-align: center;
  }
  .xn-input-list .list-item .item-label{
    width: 2.875rem;
    height: 100%;
    padding: 0 0.4rem;
    font-size: 14px;
    color: #707070;
    position: relative;

    display:flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .xn-input-list .list-item .item-value{
    height: 100%;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    display:flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .xn-btn-primary{
    margin: auto;
    width: 9.3rem;
    height: 1.28rem;

  }
  .mt-b-top{
    margin-top: 0.5rem;
  }
</style>
