import {LANG as LANG_CONFIG} from 'config/lang'
export default class Base {
  constructor (data = {}, map = {}) {
    this.__map__ = map
    Object.keys(this.__map__).map((i) => {
      this[i] = data[this.__map__[i]]
    })
  }
  static getParsedList (list) {
    let data = []
    if (Array.isArray(list)) {
      data = list.map((val) => {
        return new this(val)
      })
    }
    return data
  }
  convertToSeverData() {
    let data = {}
    if(!this.__map__){
      return data
    }
    Object.keys(this.__map__).map((i) => {
      let k = this.__map__[i]
      let v = this[i]
      if(!Array.isArray(v)){
        if(!(v instanceof Base)){
          return data[k] = v
        }
        return data[k] = v.convertToSeverData()
      }
      let first = v[0]
      if(!v.length || !(first instanceof Base)){ //普通array
        return data[k] = v
      }
      data[k] = v.map(j => j.convertToSeverData())
    })
    return data
  }
}

export const ROLE = {
  ADMIN: {
    CODE: 1,
    TEXT: '管理员'
  },
  AUTHOR: {
    CODE: 2,
    TEXT: '作者'
  }
}

export const AUTH = {
  ADMIN: {
    CODE: 1,
    TEXT: '管理员'
  },
  AUTHOR: {
    CODE: 2,
    TEXT: '作者'
  }
}

export const LANG = LANG_CONFIG
