import Base from './base'
import { SUBJECT, CREATE_SUBJECT, DELETE_SUBJECT, READ_SUBJECT, UPDATE_SUBJECT_POS, READ_SUBJECT_POS, READ_STAT_SUBJECT } from '../config/api'
import {request, requestP} from '../api/api'
import Pagination from './pagination'
import {LANG} from 'config/lang'
import state from 'store/state'
export const SUBJECT_STATUS = {
  RELEASE: {
    CODE: 1,
    TEXT: '发布'
  },
  DRAFT: {
    CODE: 2,
    TEXT: '草稿'
  },
  DELETE: {
    CODE: 3,
    TEXT: '垃圾箱'
  }
}

export const SUBJECT_TYPE = {
  GAME: {
    CODE: 1,
    TEXT: '游戏'
  }
}

export const SUBJECT_PRIVACY_TYPE = {
  ALL: {
    CODE: 0,
    TEXT: '所有人'
  },
  NOT_INTERWORK: {
    CODE: 1,
    TEXT: '非互通用户'
  }
}
export default class Subject extends Base {
  constructor (data = {}, map) {
    super(data,{
      'id' : 'InfoId',
      'type' : 'ObjectType',
      'status' : 'PostStatus',
      'privacyType' : 'PrivacyFlag',
      'uin' : 'Uin',
      'username' : 'Username',
      'nickname' : 'Nickname',
      'title' : 'DefTitle',
      'brief' : 'DefBriefIntro',
      'smallCoverUrl' : 'SmallCoverUrl',
      'bigCoverUrl' : 'bigCoverUrl',
      'langList' : 'LangList',
      'gameList' : 'GameList',
      ...map
    })
    this.type = this.type === undefined ? SUBJECT_TYPE.GAME.CODE : this.type
    this.privacyType = this.privacyType === undefined ? SUBJECT_PRIVACY_TYPE.ALL.CODE : this.privacyType
    this.langList = SubjectLang.getParsedList(this.langList)
    this.gameList = SubjectGame.getParsedList(this.gameList)
  }
  setTitle(v){
    this.title = v
  }
  setBrief(v){
    this.brief = v
  }
  deleteCover(){
    this.smallCoverUrl = undefined
    this.bigCoverUrl = undefined
  }
  setCover(small, big){
    this.smallCoverUrl = small
    this.bigCoverUrl = big
  }
  setDraftStatus(){
    this.status = SUBJECT_STATUS.DRAFT.CODE
  }
  setReleaseStatus(){
    this.status = SUBJECT_STATUS.RELEASE.CODE
  }
  setDeleteStatus(){
    this.status = SUBJECT_STATUS.DELETE.CODE
  }
}

export function readSubjectList (opt = {
  status: null
}, pagination = new Pagination()) {
  return request(SUBJECT, {
    status: opt.status,
    ...pagination.createParams()
  }).then((v) => {
    return {
      data: Subject.getParsedList(v.datalist),
      pagination: new Pagination(v)
    }
  })
}

export function createSubject (subject) {
  return requestP(CREATE_SUBJECT, Object.assign(subject.convertToSeverData(), {
    Uin: state.userInfo.uin
  })).then((data) => {
  }).catch((error) => {
    return Promise.reject(error)
  })
}

export function readSubject (id) {
  return request(READ_SUBJECT, {id}).then((data) => {
    return new Subject(data.info)
  })
}

export function deleteSubject (subject) {
  return requestP(DELETE_SUBJECT, {
    'id': subject.id
  })
}

export class SubjectLang extends Base {
  constructor (data = {}, map){
    super(data, {
      'lang' : 'Lang',
      'title' : 'Title',
      'brief' : 'BriefIntro',
      ...map
    })
  }
  setLang (v){
    this.lang = v
  }
  hasTitle(){
    return !!this.title
  }
  hasBrief(){
    return !!this.brief
  }
  setTitle(v){
    this.title = v
  }
  setBrief(v){
    this.brief = v
  }
}

export class SubjectGame extends Base {
  constructor (data = {}, map){
    super(data ,{
      'id' : 'GameId',
      'name' : 'GameName',
      'brief' : 'GameDesc',
      'desc' : 'IosDownloadUrl',
      'packageName' : 'PackageName',
      'iosDownloadUrl' : 'IosDownloadUrl',
      'androidDownloadUrl' : 'AndroidDownloadUrl',
      'smallIconUrl' : 'SmallIconUrl',
      'bigIconUrl' : 'BigIconUrl',
      'smallCoverUrl' : 'SmallCoverUrl',
      'bigCoverUrl' : 'BigCoverUrl',
      'videoUrl' : 'VideoUrl',
      'videoThumb' : 'VideoThumb',
      'langCount' : 'LangCount',
      'langList' : 'LangList',
      ...map
    })
    this.langList = SubjectGameLang.getParsedList(this.langList)
  }
  hasName(){
    return !!this.name
  }
  hasIcon(){
    return !!this.smallIconUrl
  }
  hasVideo(){
    return !!this.smallCoverUrl
  }
  hasCover(){
    return !!this.videoUrl
  }
  deleteIcon(){
    this.smallIconUrl = undefined
    this.bigIconUrl = undefined
  }
  setIcon(small, big){
    this.smallIconUrl = small
    this.bigIconUrl = big
  }
  deleteCover(){
    this.smallCoverUrl = undefined
    this.bigCoverUrl = undefined
  }
  setCover(small, big){
    this.smallCoverUrl = small
    this.bigCoverUrl = big
  }
  setVideo(url, thumb){
    this.videoUrl = url
    this.videoThumb = thumb
  }
  deleteVideo(){
    this.videoUrl = undefined
    this.videoThumb = undefined
  }
  addGameLang(v) {
    this.langList.push(v)
  }
  removeGameLangByLang(v) {
    let index = this.langList.findIndex(i => i.lang === v)
    if(index === -1){
      return
    }
    this.langList.splice(index)
  }
  getGameLangByLang(v){
    return this.langList.find((i) => {
      return i.lang === v
    })
  }
  hasGameLang(lang){
    return this.langList.some((i) => i.lang === lang)
  }
}

export class SubjectGameLang extends Base {
  constructor (data = {}, map) {
    super(data ,{
      'lang' : 'Lang',
      'gameName' : 'GameName',
      'gameDesc' : 'GameDesc',
      'iosDownloadUrl' : 'IosDownloadUrl',
      'androidDownloadUrl' : 'AndroidDownloadUrl',
      ...map
    })
    this.lang = this.lang || LANG.EN.CODE
  }
  setLang(v) {
    this.lang = v
  }
  setName(v) {
    this.gameName = v
  }
  setDesc(v) {
    this.gameDesc = v
  }
}

export function updatePos (i) {
  return request(UPDATE_SUBJECT_POS, {
    pos: i
  })
}

export function readPos () {
  return request(READ_SUBJECT_POS).then(v => v.position)
}
