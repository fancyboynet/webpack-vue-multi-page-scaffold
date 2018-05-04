import urlParams from 'utils/urlParams'
import getLang from 'utils/getLang'
import {LANG} from 'model/base'
const extendify = require('extendify');
const nodeEnv = process.env.NODE_ENV;
let GetHost;
const urlLang = urlParams('lang');
if (urlLang) {
  GetHost = urlLang
} else {
  let currentLang = navigator.language;   //判断除IE外其他浏览器使用语言
  if (!currentLang) {//判断IE浏览器使用语言
    currentLang = navigator.browserLanguage;
  }
  GetHost = getLang(currentLang);
}


_.extend = extendify({
  inPlace: false,
  arrays: 'replace',
  isDeep: true
});

let getConfig = function(){
  let xhr = new XMLHttpRequest();
  xhr.open('get','/static/config.json',false);
  xhr.send(null);
  if (xhr.status === 200) {
    let data = JSON.parse(xhr.response);
    return data;
  }else{
    console.log(xhr.response);
  }
}
let configURL = getConfig();
window.baseURL = configURL[nodeEnv].api;
window.previewURL = configURL['preview'].api;
export const proURL = configURL['production'].api;
export const previewURL = window.previewURL;
export const CONFIG = configURL[nodeEnv];
export const LOCALE = GetHost;
export const LOCALE_DATA = {
  [LANG.ZH_CN.CODE]: require('lang/zh_CN.json'),
  [LANG.EN.CODE]: require('lang/en.json')
};
export const NODE_ENV = nodeEnv;
