/**
 * Created by tdzl2003 on 6/18/16.
 */

import { AsyncStorage ,NativeModules} from 'react-native';
import config from './../config';
import MD5 from "md5"


class ResponseError extends Error {
  constructor(message, code, origin) {
    super(message);
    this.code = code;
    this.origin = origin;
  }
}

export const isArray=(o)=> {
  return Object.prototype.toString.call(o) === '[object Array]';
}

function  getPassportId(){
  return new Promise(function (resolve, reject) {
    NativeModules.security.getPassportId().then((result) => {
          AsyncStorage.setItem("passportID", result);
          resolve(result);
        }
    ).catch((error) => {
      console.log(error)
    });
  })
}

function  identityId(){
  return  new Promise(function (resolve, reject) {
    NativeModules.security.getIdentityId().then((result) => {
          AsyncStorage.setItem("identityId", result);
          resolve(result);
        }
    ).catch((error) => {
      console.log(error)
    });
  })
}

// appKey需要提供给商城使用，保持export
export const app_key =config.app_key; //dev
export const secret =config.secret; //dev

async function getPostParameter (request){
  var post_data = '';
  var param_array = new Object();
  this.passportId = await getPassportId();
  this.identityId = await identityId();

  if (this.passportId != undefined && this.passportId != null && this.passportId > 0) {
    param_array.passportId = this.passportId;
  }
  if (this.identityId != undefined && this.identityId != null && this.identityId > 0) {
    param_array.identityId = this.identityId;
  }

  param_array.format = 'json';
  param_array.sign_method = 'md5';
  param_array.timestamp = Date.parse(new Date());
  param_array.app_key = app_key;
  param_array.v = '1.0';

  for (var p in request) { // 方法
    if (request[p] != null && request[p] != undefined && typeof (request[p]) != "function") {
      param_array[p] = request[p];
    }
  } {
    var param_sign;
    var arrayKey = [];
    var strTemp;
    var arrayKeyTemp = [];
    for (var p in param_array) { // 方法
      if (typeof (param_array[p]) != "function") {
        arrayKeyTemp.push(p);
      }
    }
    // 最后显示所有的属性
    arrayKeyTemp.sort();
    var strTemp = secret;
    for (var i = 0; i < arrayKeyTemp.length; i++) {
      if (isArray(param_array[arrayKeyTemp[i]])) {
        strTemp = strTemp + arrayKeyTemp[i] + JSON.stringify(param_array[arrayKeyTemp[i]]);
      } else {
        strTemp = strTemp + arrayKeyTemp[i] + param_array[arrayKeyTemp[i]];
      }
    }
    strTemp = strTemp + secret;
    param_sign = MD5(strTemp).toString().toUpperCase();
    post_data = 'sign=' + param_sign.toUpperCase();
    for (var i = 0; i < arrayKeyTemp.length; i++) {
      if (isArray(param_array[arrayKeyTemp[i]])) {
        post_data = post_data + '&' + arrayKeyTemp[i] + '=' + encodeURI(JSON.stringify(param_array[arrayKeyTemp[i]]));
      } else {
        post_data = post_data + '&' + arrayKeyTemp[i] + '=' + encodeURI(param_array[arrayKeyTemp[i]]);
      }
    }
  }

  return post_data;
}

async function request(url,data, _options) {
  const options = _options || {};
  options.method = options.method || 'GET';
  options.headers = options.headers || {};

  options.body=await getPostParameter(data)

  // console.warn(JSON.stringify(options.body));

  const resp = await fetch(url.toString(), options);
  const text = await resp.text();
  console.log('RESP:', text);
  const json = JSON.parse(text);

  // 如果请求失败
  if (resp.status !== 200) {
    if (resp.status === 401) {
      console.log(resp.status);
    }
    throw new ResponseError(json.message, resp.status, json);
  }
  return json;
}

export function post(data, options) {
  return request(config.apiUrl,data, {
    method: 'POST',
    mode: "cors",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    ...options,
  });
}
