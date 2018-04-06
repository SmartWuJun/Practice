import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import getters from './getters';

Vue.use(Vuex);

const state = {
  slideShow: false,
  animateIn: 'slideInRight',
  animateOut: 'slideOutLeft',
  animateMode: '',
  swipeShow:false
};
const mutations = {
  showSlideFn: (state, payload) => {
    state.slideShow = true;
    console.log(payload);
  },
  closeSlideFn: (state, payload) => {
    state.slideShow = false;
    console.log(payload);
  },
  changeAnimate: (state, payload) => {
    if (payload.mode === 'normal') {
      state.animateIn = 'slideInRight';
      state.animateOut = 'slideOutLeft';
      state.animateMode = '';
    } else if (payload.mode === 'reverse') {
      state.animateIn = 'slideInLeft';
      state.animateOut = 'slideOutRight';
      state.animateMode = '';
    } else if (payload.mode === 'change') {
      state.animateIn = payload.animateIn;
      state.animateOut = payload.animateOut;
      state.animateMode = payload.animateMode;
    }
  },
  showSwipeFn:(state,payload)=>{
    state.swipeShow=true;
  },
  closeSwipeFn:(state,payload)=>{
    state.swipeShow=false;
  },
};

// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
