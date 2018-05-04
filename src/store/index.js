import * as actions from "./actions"
import * as getters from "./getters"
import app from "./app"
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex);

export default new Vuex.Store({
    strict: false,
    actions,
    getters,
    modules: {
        app
    },
    state: {},
    mutations: {}
});