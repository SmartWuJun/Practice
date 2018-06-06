import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

axios.defaults.withCredentials = true;
axios.defaults.timeout = 5000;
// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  config.headers['Content-Type'] = 'text/plain';
  return config;
}, error => {
  // 对请求错误做些什么
  console.log('requestError');
  console.log(error);
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(response => {
  // 对响应数据做点什么
  console.log('response');
  console.log(response);
  return response;
}, error => {
  // 对响应错误做点什么
  return Promise.reject(error.response);   // 返回接口返回的错误信息
});

const myUrl = 'https://my.xiniunet.com/api/foundation.do';

const securityUrl = 'https://my.xiniunet.com/api/security.do';
const xnService = {

  Login: foo => {
    console.log(foo);
    return Vue.axios({
      method: 'post',
      url: `${securityUrl}?method=api.security.login`,
      data: foo
    });
  },
  getList: foo => {
    console.log(foo);
    return Vue.axios({
      method: 'post',
      url: `${myUrl}?method=api.foundation.messages.get`,
      data: foo
    });
  }
};

export default xnService;
