/**
 * Created by yesing on 2017/10/25.
 */
import {CONFIG} from "config/config"
import {get, post} from './api'
const base = CONFIG.api;

//登陆,登陆成功后保存token
export const getList = (params, config) => {
    return get(`${base}/admin/article/mymng`, params, config || {})
};


export const getGameList = (params, config) => { //获取游戏列表
  return get(`${base}/admin/getconfig/gamelist`,params, config ||{})
}

export const getPlateList = (params, config) => { // 获取板块列表
  return get(`${base}/admin/getconfig/cataloglist`,params, config ||{})
}

export const getDetail = (params, config) => { // 获取板块列表
  return get(`${base}/admin/article/info/view`,params, config ||{})
}
