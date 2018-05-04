import {getCodeList, getCodeAndTranslationList} from 'config/lang'
import state from './state'

state.langList = getCodeList()
state.langListNew = getCodeAndTranslationList()

const mutations = {
    'Login': (state, data) => {
        state.userInfo = data;
        window.localStorage && localStorage.setItem('currentUser', JSON.stringify(data));
    },
    'Logout': (state, data) => {
        state.userInfo = null;
        window.localStorage && localStorage.removeItem('currentUser');
    },
    'getGameList': (state, data) => {
      state.gameList = data
    },
    'getPlateList': (state, data) => {
      state.plateList = data
    }
}

export default {
    state,
    mutations
}
