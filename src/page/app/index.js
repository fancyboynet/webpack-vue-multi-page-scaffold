// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import "babel-polyfill";
import Vue from 'vue'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import 'common/css/my-element-theme.scss'
import App from './App'
import VueI18n from "vue-i18n";
import {LOCALE, LOCALE_DATA, NODE_ENV} from 'config/config'
import installFilters from '@/vue/filters'
import Lang from '@/vue/plugin/lang'
import store from "store/index";
import ROUTES from './routes'
import {initAxiosInterceptors} from 'api/api'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: ROUTES
})
initAxiosInterceptors(router)
installFilters();
Vue.use(ElementUI)
Vue.use(VueI18n)
Vue.use(Lang)


//Vue.config.productionTip = false

/* eslint-disable no-new */

window.i18n = new VueI18n({
  locale: LOCALE,    // 语言标识
  messages: LOCALE_DATA
});
window.myTranslation = i18n.messages[i18n.locale]


if (NODE_ENV === 'development') {
  Vue.config.devtools = true;
}
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
