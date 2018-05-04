import axios from "axios"
import store from "store/index"
import qs from 'qs'
import {Loading, Notification} from "element-ui"
import * as customConfigKeys from './CustomConfigKeys'
import {RESPONSE_TYPE} from 'config/api'
window.axios = axios
// axios 配置
axios.defaults.timeout = 15000;
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;

let loadingInstance;

//每次请求，请求数量加1；请求结束，则减1；当减为0时才关闭instance
let requestCount = 0;
let responseCount = 0;

function showLoading(){
  let loadingOptions = {
    fullscreen: true,
    lock: true,
    customClass: 'el-mask-tiny-loading'
  };
  loadingInstance = Loading.service(loadingOptions);
}
function hideLoading(){
  if(responseCount !== responseCount){
    return
  }
  loadingInstance.close()
}

function check (code,response){
  if(!response.config[customConfigKeys.FAILED_CODE]){
    return false
  }
  if(typeof(response.config[customConfigKeys.FAILED_CODE]) !== 'object'){
    return response.config[customConfigKeys.FAILED_NOTIFY_MSG]
  }
  let arr = response.config[customConfigKeys.FAILED_CODE]
  for(let i=0; i < arr.length; i++){
    if(arr[i] === code){
      return response.config[customConfigKeys.FAILED_NOTIFY_MSG][i]
    }
  }
}

export function initAxiosInterceptors (router) {
  // http request 拦截器
  axios.interceptors.request.use(
    config => {
      requestCount = requestCount + 1
      config.headers['Accept-Language'] = i18n ? i18n.locale : 'zh-CN'
      showLoading()
      return config;
    },
    err => {
      hideLoading()
      Notification.error({message: myTranslation?myTranslation['request_error']:'request error', duration: 2000})
      return Promise.reject(err);
    }
  )

// http response 拦截器
  axios.interceptors.response.use(
    response => {
      responseCount = responseCount + 1
      hideLoading()
      let {code, msg} = response.data;
      if (code === RESPONSE_TYPE.SUCCESS.CODE) {
        if (response.config[customConfigKeys.SUCCESS_NOTIFY_MSG])
          Notification.success({
            title: '',
            message: response.config[customConfigKeys.SUCCESS_NOTIFY_MSG],
            type: 'success'
          });
        return response;
      }
      if (code === RESPONSE_TYPE.NOT_LOGIN.CODE ) { //未登录或者账号被管理员删除
        Notification.error({message: msg, duration: 2000});
        if (!/^\/login/.test(router.currentRoute.fullPath)) {
          router.replace({
            path: '/login',
            query: {redirect: router.currentRoute.fullPath}
          })
        }
        store.commit('Logout');
        return Promise.reject(new Error(msg))
      }
      if(response.config.__new__){
        Notification.error({message: msg, duration: 2000});
        return Promise.reject(new Error(msg))
      }
      // 原来的逻辑，涉及比较多先留着
      if (check(code,response)){
        Notification.error({
          message: check(code,response)
        });
        if(response.config[customConfigKeys.FAILED_ACTION]){
          response.config[customConfigKeys.FAILED_ACTION]()
        }
        return response;
      }
      let message = myTranslation ? myTranslation['newsweb_err_server'] : 'service error'
      if(code === RESPONSE_TYPE.NO_ACCESS.CODE){
        message = myTranslation ? myTranslation['access_change'] : 'access has change'
      }
      if(code===RESPONSE_TYPE.NO_USER.CODE){
        message = myTranslation ? myTranslation['news_txt_err_nouser'] : 'no user'
      }
      Notification.error({message: message, duration: 2000});
      if(response.config[customConfigKeys.FAILED_ALWAYS_ACTION]){
        response.config[customConfigKeys.FAILED_ALWAYS_ACTION]()
      }
      return response;
    },
    error => {
      responseCount = responseCount + 1
      hideLoading()
      const isTimeout = error.toString().indexOf('timeout') > -1;
      if (isTimeout) {
        Notification.error({message: myTranslation?myTranslation['request_timeout']:'request timeout', duration: 2000})
      } else {
        Notification.error({message: myTranslation?myTranslation['request_error']: 'request error', duration: 2000})
      }
      return Promise.reject(error)
    }
  )
}

export const post = (url, params, config) => { // 弃用建议改用requestP
  if (params instanceof FormData) {
    return axios.post(url, params, config).then(res => res.data);
  }
  return axios.post(url, qs.stringify(params), config).then(res => res.data);
}

export const get = (url, params, config) => {  // 弃用建议改用request
  return axios.get(url, {params, ...config}).then(res => res.data);
}

export function request(url, params, config){
  return get(url, params, {__new__: true, ...config})
}

export function requestP(url, params, config){
  return post(url, params, {__new__: true, ...config})
}
