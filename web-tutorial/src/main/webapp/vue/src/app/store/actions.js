// import Vue from 'vue';
// import {Indicator} from 'mint-ui';

export const incrementCounter = (dispatch, state) => {
  console.log(state);
};
//
// export const getData = function (context, payload) {
//   Vue.http.get(payload.url, {
//     timeout: 3000,
//     before:() => {
//       Indicator.open({
//         text: '加载中....',
//         spinnerType: 'triple-bounce'
//       });
//     }
//   })
//     .then( function(response){
//     var data =null;
//     if(typeof response.body ==='object'){
//       data= response.body;
//     } else {
//       data= JSON.parse(response.body);
//     }
//     Indicator.close();
//     payload.callBack(data)
//     }, function (response) {
//     console.log(response);
//     }).catch( function (msg) {
//     console.log('请求程序出错：'+msg);
//   });
// };
