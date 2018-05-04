import {CONFIG} from "config/config"
const base = `${CONFIG.api}/admin`

export const RESPONSE_TYPE = {
  SUCCESS: {
    CODE: 0
  },
  NOT_LOGIN: {
    CODE: 1
  },
  NO_ACCESS: {
    CODE: 2
  },
  NO_USER:{
  	CODE:-9
  }
}
export const STAT = `${base}/data`
export const SUBJECT = `${base}/article/special`

export const UPDATE_SUBJECT_POS = `${SUBJECT}/setpos`
export const READ_SUBJECT_POS = `${SUBJECT}/getpos`
export const DELETE_SUBJECT = `${SUBJECT}/delete`
export const READ_SUBJECT = `${SUBJECT}/view`
export const CREATE_SUBJECT = `${SUBJECT}/save`
export const READ_STAT_SUBJECT = `${STAT}/special`

export const READ_GAME = `${base}/getconfig/gamelistext`

