/**
 * Created by yesing on 2017/10/25.
 */
import {CONFIG} from "config/config"
import {get, post} from './api'
const base = CONFIG.api;

export const getAuthorList = (params, config) => { // 获取作者列表
    return get(`${base}/admin/user/author`, params, config || {})
};
export const findAuthor = (params, config) => { // 查找uin用户
    return get(`${base}/admin/user/author/find`, params, config || {})
};

export const addAuthor = (params, config) => { // 添加作者
    return get(`${base}/admin/user/author/add`, params, config || {})
};

export const editAuthor = (params, config) => { // 编辑权限
    return get(`${base}/admin/user/author/edit`, params, config || {})
};

export const deleteAuthor = (params, config) => { // 删除作者
    return get(`${base}/admin/user/author/delete`, params, config || {})
};

export const applyAuthor = (params, config) => { // 申请作者列表
    return get(`${base}/admin/user/apply`, params, config || {})
};

export const applyPass = (params, config) => { // 申请通过
    return get(`${base}/admin/user/apply/pass`, params, config || {})
};

export const applyDelete = (params, config) => { // 申请删除
    return get(`${base}/admin/user/apply/delete`, params, config || {})
};

