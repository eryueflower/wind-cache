import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import windCache from 'wind-cache'
const winux = new windCache({
  isLasting: true
})
Vue.prototype.$winux = winux
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
