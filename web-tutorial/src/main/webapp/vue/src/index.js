import Vue from 'vue';
import VueI18n from 'vue-i18n';
import VueLazyload from 'vue-lazyload';
import router from './router.js';
import store from './app/store/store';
import './main.less';
import './assets/css/animate.css';
import 'mint-ui/lib/style.css';


import {xnMethod,xnNative} from './app/method/xnVue';

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: './assets/images/error.png',
  loading: './assets/images/loading-red.gif',
  attempt: 1
});

// 声明方法
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'cn',
  messages: {
    cn: {
      countryList:[{
        name: "常用",
        childList: [
          {name: "中国", value: "86"},
          {name: "美国", value: "001"},
          {name: "香港地区", value: "00852"},
          {name: "台湾地区", value: "00886"},
          {name: "澳门地区", value: "00853"}
        ]},{
        name:"A",
        childList:[
          {name:"澳大利亚",value:"0061"},
          {name:"澳门地区",value:"00853"}
        ]},{
        name:"B",
        childList:[
          {name:"巴西",value:"0055"}
        ]},{
        name:"D",
        childList:[
          {name:"德国",value:"0049"},
          {name:"德国",value:"0049"}
        ]}
      ]
    },
    en: {
      countryList:[{
        name: "常用",
        childList: [
          {name: "China", value: "86"},
          {name: "美国", value: "001"},
          {name: "香港地区", value: "00852"},
          {name: "台湾地区", value: "00886"},
          {name: "澳门地区", value: "00853"}
        ]},{
        name:"A",
        childList:[
          {name:"澳大利亚",value:"0061"},
          {name:"澳门地区",value:"00853"}
        ]},{
        name:"B",
        childList:[
          {name:"巴西",value:"0055"}
        ]},{
        name:"D",
        childList:[
          {name:"德国",value:"0049"},
          {name:"德国",value:"0049"}
        ]}
      ]
    }
  }
});

// 声明方法
Vue.use(xnMethod);
Vue.use(xnNative);
//监控返回
Vue.xnMethod.watchGoBack();

new Vue({
  i18n,
  el: '#app',
  router,
  store,
  render: h => h('router-view')
});



