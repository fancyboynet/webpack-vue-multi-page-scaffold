import 'assert/reset.less'
import Vue from 'vue'
import App from './app.vue'
const app = new Vue({
  template: '<App/>',
  components: {
    App
  }
})
app.$mount('#app')
