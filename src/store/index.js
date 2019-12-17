import Vue from 'vue'
import 'es6-promise/auto'
import Vuex from 'vuex'
import navigation from './navigation'
import monitor from './monitor'
import legend from './legend'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {navigation, monitor, legend},
  state: {
    headerColor: 'grey'
  },
  mutations: {
    headerColor: (state, val) => {
      state.headerColor = val
    }
  },
  getters: {
    headerColor: state => {
      return state.headerColor
    }
  }
})
export default store
