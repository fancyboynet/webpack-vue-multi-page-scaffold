import Base from './base'
import {ROLE} from './base'

export default class User extends Base {
  constructor (data = {}, map) {
    super(data, {
      id: 'InfoId',
      ...map
    })
  }
  static isAdmin(roleFlag){
    return roleFlag === ROLE.ADMIN.CODE
  }
}



