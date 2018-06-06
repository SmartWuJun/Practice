<i18n>
    {
    "en": {
    "title": "Language"
    },
    "cn": {
    "title": "多语言"
    }
    }
</i18n>
<template >
    <div class="xn-app">
        <router-view  name="xnHeader" :title="$t('title')"  ></router-view>
        <div class="xn-main  clearfix">
            <div class="module">
                <div class="h3">文档说明</div>
                <p class="p">文档： http://kazupon.github.io/vue-i18n/en/installation.html  </p>
                <p class="p">安装： npm install vue-i18n </p>
                <p class="p">方法： </p>
                <p class="p">1、index.js 引入import VueI18n from 'vue-i18n';</p>
                <p class="p">2、index.js 声明 Vue.use(VueI18n);</p>
                <p class="p">3、index.js 定义全局常量 const i18n = new VueI18n({locale: 'cn', messages: { cn: {},en:{}}})</p>
                <p class="p">4、index.js  vue 初始化  new Vue({i18n})</p>
                <p class="p">5、但组件页面使用：i18n 标签  {"en": {"title": "Language"}, "cn": {"title": "多语言"  }}</p>
                <p class="p">配置：</p>
                <p class="p">1、webpack.conf.js配置</p>
                <p class="p"> rules{  {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                    loaders: {
                    i18n: '@kazupon/vue-i18n-loader'
                    }
                    }
                    }}
                </p>
            </div>
        </div>
        <router-view class="xnFixed"  name="TabLanguage"  ></router-view>
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
                title:"DEMO首页"
            };
        },
        methods:{
            goLink:function(){

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
