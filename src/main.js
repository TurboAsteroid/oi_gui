// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import 'es6-promise/auto'
import store from '@/store'
import sockets from '@/sockets'
import config from '@/config'
import auth from '@/auth'
auth.initAuth()
Vue.prototype.$appName = config.appName
Vue.prototype.$appVersion = config.appVersion
Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.prototype.$config = config
// sockets
Vue.prototype.$socket = sockets(Vue.prototype.$config)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
