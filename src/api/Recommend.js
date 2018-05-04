import {CONFIG} from "config/config"
import {get, post} from './api'
const base = CONFIG.api;

//官方推荐文章列表
export const getList = (params, config) => {
    return get(`${base}/admin/article/ofcinfo`, params, config || {})
};
// 新增编辑推荐文章
export const seveRecommend = (params, config) => {
    return post(`${base}/admin/article/ofcinfo/save`, params, config || {})
};
// 删除推荐文章
export const deleteRecommend = (params, config) => {
    return get(`${base}/admin/article/ofcinfo/delete`, params, config || {})
};
// 撤回推荐
export const cancelRecommend = (params, config) => {
    return get(`${base}/admin/article/ofcinfo/cancel`, params, config || {})
};













