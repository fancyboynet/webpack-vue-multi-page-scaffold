const userInfo = state => state.app.userInfo
const gameList = state => state.app.gameList
const plateList = state => state.app.plateList
const langList = state => state.app.langList
const langListNew = state => state.app.langListNew

const isManager = state => state.app.userInfo ? state.app.userInfo.role === 1 : false

export {
  userInfo,
  gameList,
  plateList,
  langList,
  isManager,
  langListNew
}
