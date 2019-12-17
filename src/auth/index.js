import axios from 'axios'
import router from '@/router'
import store from '@/store'
export default {
  initAuth () {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwt')
    axios.interceptors.response.use((response) => {
      return Promise.resolve(response)
    }, (error) => {
      console.log(error)
      localStorage.clear()
      router.push({ name: 'auth' })
      store.commit('navigation/exitButtonIsActive', false)
      return Promise.reject(error)
    })
  }
}
