import Base from './base'
import { READ_GAME } from '../config/api'
import {request} from '../api/api'
import Pagination from './pagination'

export default class Game extends Base {
  constructor (data = {}, map) {
    super(data,{
      'id' : 'GameItemId',
      'name' : 'GameItemName',
      'bigIconUrl' : 'GameItemIcon',
      'smallIconUrl' : 'GameItemIconThumb',
      'banner' : 'GameBanner',
      'videoUrl' : 'PreviewVideo',
      'videoThumb' : 'PreviewVideoThumb',
      'langList' : 'NameList',
      ...map
    })
    this.langList = GameLang.getParsedList(this.langList)
  }
}


export class GameLang extends Base {
  constructor (data = {}, map){
    super(data, {
      'lang' : 'Lan',
      'gameName' : 'GameItemName',
      'gameDesc' : 'GameDesc',
      ...map
    })
  }
}

export function readGameList () {
  return request(READ_GAME).then((v) => {
    return  Game.getParsedList(v.datalist)
  })
}
