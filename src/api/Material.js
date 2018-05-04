/**
 * Created by yesing on 2017/10/25.
 */
import {CONFIG} from "config/config"
import {get, post} from './api'
const base = CONFIG.api;

//列表
export const getList = (params, config) => {
    return get(`${base}/admin/article/material/getlist`, params, config || {})
}
//删除
export const deleteMaterial = (params, config) => {
    return get(`${base}/admin/article/material/delete`, params, config || {})
}
//上传，返回url
export const uploadMaterial = (params, config) => {
    return post(`${base}/admin/article/image/upload`, params, config || {})
}
// 上传成功后保存
export const saveMaterial = (params, config) => {
    return post(`${base}/admin/article/material/savematerial`, params, config || {})
}

//素材设置星标
export const setStar = (params, config) => {
    return post(`${base}/admin/article/material/setStar`, params, config || {})
}