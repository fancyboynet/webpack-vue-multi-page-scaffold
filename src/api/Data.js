import {CONFIG} from "config/config"
import {get, post} from './api'
const base = CONFIG.api;

export const getGuide = (params, config) => { // 获取数据概况
    return get(`${base}/admin/data/userinfo`, params, config || {})
};

export const getArticleData = (params, config) => { // 文章数据
    return get(`${base}/admin/data/userinfo/detail`, params, config || {})
};

export const getAdminArticleData = (params, config) => { // 管理员文章数据
    return get(`${base}/admin/data/allinfo`, params, config || {})
};

export const getAdminRecommendData = (params, config) => { // 官方推荐数据
    return get(`${base}/admin/data/ofcinfo`, params, config || {})
};

