import {CONFIG} from "config/config"
import {get, post} from './api'
const base = CONFIG.api;

export const getPlateList = (params, config) => { // 获取板块管理列表（管理员）
    return get(`${base}/admin/article/catalog`, params, config || {})
};

export const deletePlate = (params, config) => { // 删除板块管理列表（管理员）
    return get(`${base}/admin/article/catalog/delete`, params, config || {})
};

export const addPlate = (params, config) => { // 增加板块管理列表（管理员）
    return post(`${base}/admin/article/catalog/save`, params, config || {})
};