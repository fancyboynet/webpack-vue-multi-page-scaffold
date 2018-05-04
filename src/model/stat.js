import Base from './base'
import Pagination from './pagination'
import { READ_STAT_SUBJECT } from '../config/api'
import { request } from '../api/api'
import {SUBJECT_STATUS} from './subject'

export const DAY = {
  ALL: {
    CODE: -1,
    TEXT: '所有'
  },
  TODAY: {
    CODE: 1,
    TEXT: '今天'
  }
}

class StatSubject extends Base {
  constructor (data = {}, map) {
    super(data, {
      id: 'id',
      title: 'title',
      viewNum: 'viewnum',
      viewUser: 'viewuser',
      favorite: 'favorite',
      comment: 'comment',
      viewTime: 'viewtime',
      ...map
    })
  }
}

export function readStatSubjectList (opt = {
  day: DAY.TODAY.CODE,
  status: null
}, pagination = new Pagination()) {
  return request(READ_STAT_SUBJECT, {
    day: opt.day,
    status: opt.status,
    ...pagination.createParams()
  }).then((v) => {
    return {
      data: StatSubject.getParsedList(v.datalist),
      pagination: new Pagination(v)
    }

  })
}

