/**
 * Created by yesing on 2017/10/25.
 */
import {CONFIG} from "config/config"
import {get, post} from './api'
const base = CONFIG.api;

//登陆,登陆成功后保存token
export const login = (params, config) => {
    return post(`${base}/admin/user/login`, params, config || {})
};
//获取验证码，只需一个地址
export const captchaUrl = `${base}/admin/user/login/captcha`;

export const logout = (params, config) => {
    return get(`${base}/admin/user/login/logout`, params, config || {})
};