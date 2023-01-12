import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { price } from '@/helpers/filters'

Vue.config.productionTip = false
Vue.filter('price', price)

new Vue({
  router,
  render: h => h(App)
}).$mount('#atm')
