/**
 * Created by yesing on 2017/10/25.
 */
import {CONFIG} from "config/config"
import {get, post} from './api'
const base = CONFIG.api;

//文章列表（作者）
export const getList = (params, config) => {
    return get(`${base}/admin/article/info`, params, config || {})
};

//文章列表（管理员）
export const getListForManager = (params, config) => {
  return get(`${base}/admin/article/allmng`, params, config || {})
};

export const getGameList = (params, config) => { //获取游戏列表
  return get(`${base}/admin/getconfig/gamelist`, params, config ||{})
}

export const getPlateList = (params, config) => { // 获取板块列表
  return get(`${base}/admin/getconfig/cataloglist`, params, config ||{})
}

export const deleteArticle = (params, config) => { // 文章删除
  return get(`${base}/admin/article/info/delete`, params, config ||{})
}

export const deleteArticleAdmin = (params, config) => { // 管理员文章删除
  return get(`${base}/admin/article/allmng/delete`, params, config ||{})
}

export const applyDeleteArticle = (params, config) => { // 文章申请删除
  return get(`${base}/admin/article/info/applydel`, params, config ||{})
}

export const adminDeleteArticle = (params, config) => { // 管理员删除申请删除的文章
  return get(`${base}/admin/article/allmng/dodel`, params, config ||{})
}

export const publishArticle = (params, config) => { // 发布文章
  return post(`${base}/admin/article/info/save`, params, config ||{})
}

export const videoUrl = () => {
	return `${base}/admin/article/video/upload`
}

//文章审核（通过、不通过、撤回）
export const checkArticle = (params, config) => {
  return get(`${base}/admin/article/allmng/check`, params, config ||{})
}

export const getDetail = (params, config) => { // 获取板块列表
  return get(`${base}/admin/article/info/view`,params, config ||{})
}

export const setTop = (params, config) => { // 置顶
  return get(`${base}/admin/article/allmng/settop`,params, config ||{})
}

export const getComment = (params, config) => { // 评论列表
  return get(`${base}/admin/user/comment`,params, config ||{})
}

export const getAllReply = (params, config) => { // 获取全部回复
  return get(`${base}/admin/user/comment/reply`,params, config ||{})
}

export const setPraise = (params, config) => { // 修改赞数
  return get(`${base}/admin/user/comment/praise`,params, config ||{})
}

export const deleteComment = (params, config) => { // 删除评论
  return get(`${base}/admin/user/comment/delete`,params, config ||{})
}

export const setAttrComment = (params, config) => { // 设置评论属性
  return get(`${base}/admin/article/allmng/settop`,params, config ||{})
}

export const getUserpoints = (params, config) => { // 获取用户积分
  return get(`${base}/admin/data/userpoints/getuserpoints`,params, config ||{})
}

export const setUserpoints = (params, config) => { // 设计奖励积分
  return get(`${base}/admin/data/userpoints/editinfocommentreward`,params, config ||{})
}


