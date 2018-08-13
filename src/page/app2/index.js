import 'assets/reset.less'
import Vue from 'vue'
import App from './app.vue'

const app = new Vue({
  components: {
    App
  },
  template: '<App/>'
})
app.$mount('#app')
