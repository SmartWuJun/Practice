/**
 * Created by DEV005 on 2017/4/1.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import * as types from "./app/store/types";
import store from "./app/store/store";

import xnHeader from './app/constants/public/Header.vue';

const TabLanguage = r => require.ensure([], () => r(require('./app/constants/public/TabLanguage.vue')), 'base');
const GoBack = r => require.ensure([], () => r(require('./app/constants/GoBack.vue')), 'base');
const Swipe = r => require.ensure([], () => r(require('./app/components/swipe.vue')), 'base');



/*按需加载方式*/
const Index = r => require.ensure([], () => r(require('./app/constants/Index.vue')), 'index');
const Language = r => require.ensure([], () => r(require('./app/constants/Language.vue')), 'language');
const Service = r => require.ensure([], () => r(require('./app/constants/Service.vue')), 'service');
const Vuex = r => require.ensure([], () => r(require('./app/constants/Vuex.vue')), 'vuex');
const RouterPage = r => require.ensure([], () => r(require('./app/constants/Router.vue')), 'router');
const Require = r => require.ensure([], () => r(require('./app/constants/Require.vue')), 'require');


const Link = r => require.ensure([], () => r(require('./app/constants/Link.vue')), 'link');


const Login = r => require.ensure([], () => r(require('./app/constants/Login.vue')), 'login');

const Scroll = r => require.ensure([], () => r(require('./app/constants/Scroll.vue')), 'scroll');
const Calendar = r => require.ensure([], () => r(require('./app/constants/Calendar.vue')), 'calendar');

const approval = r => require.ensure([], () => r(require('./app/constants/Approval.vue')), 'approval');
const approvalSubmit = r => require.ensure([], () => r(require('./app/constants/ApprovalSubmit.vue')), 'approvalSubmit');


Vue.use(VueRouter);

/**
 * routes    路由
 * path       网址
 * name       名称
 * components 组件
 * component  组件
 * children  子路由
 * meta {
 *    requireAuth  //判断该路由是否需要登录权限
 * }
 * redirect  //跳转页面
 * @type {*[]}
 */
const routes = [
  //  重定向
  {path: '/', name: '/',components: { default: Index }, children: [{path: '', components: { xnHeader,Swipe}}]},
  /*框架*/
  {path: '/language', components: {default: Language},children: [{ path: '', components: {xnHeader,TabLanguage}}]},
  {path: '/service', meta: { requireAuth: true }, components: {default: Service},children: [{ path: '', components: {xnHeader}}]},
  {path: '/vuex',  components: {default: Vuex},children: [{ path: '', components: {xnHeader}}]},
  {path: '/router',  components: {default: RouterPage},children: [{ path: '', components: {xnHeader}}]},
  {path: '/require',  components: {default: Require},children: [{ path: '', components: {xnHeader}}]},
  /*页面数据传递*/
  {path: '/link',name: 'link' ,  components: {default: Link},children: [{ path: '', components: {xnHeader}}]},
    /*页面交互*/
  {path: '/login', name: 'login', component: Login,children: [{path: '',components: { xnHeader}}]},

  {path: '/goBack', name: 'goBack',component: GoBack,children: [{path: '',components: { xnHeader}}]},
  {path: '/register', redirect: '/login'},
    /*组件*/
  {path: '/scroll',name: 'scroll',components: {default: Scroll},children: [{path: '',components: {xnHeader}}]},
  {path: '/calendar',name: 'calendar',components: {default: Calendar},children: [{path: '',components: {xnHeader}}]},

    /*定制化组件*/
  {path: '/approval',name: 'approval',components: {default: approval},children: [{path: '',components: {xnHeader}}]},
  {path: '/approvalUser',name: 'approvalUser',components: {default: approvalSubmit },children: [{ path: '', components: { xnHeader}}]}
];
//每次进入新组件后滚动条回到顶部

const router = new VueRouter({
  mode: 'history', // hash history    hash 正常的网站显示   history 需要服务器配置
  //base: '/dist/',
  //base : __dirname,
  routes
});


router.afterEach(function(to){
  window.scrollTo(0,0)
});

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
  store.commit(types.LOGIN, window.localStorage.getItem('token'))
}
router.beforeEach((to, from, next) => {
  console.log(to)
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    console.log("判断是否需要登陆")
    if (store.state.token) {  // 通过vuex state获取当前的token是否存在
      console.log("已经登陆")
      next();
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    }
  } else {
    next();
  }
});
export default router;
