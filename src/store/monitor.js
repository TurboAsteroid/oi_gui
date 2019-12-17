import config from '@/config'
import S from '@/store'
import router from '@/router'
const monitor = {
  namespaced: true,
  state: {
    incidents: []
  },
  mutations: {
    incidents: (state, data) => {
      if (router.currentRoute.name === 'reports' && data.type === 'from_socket') {
        return
      }
      data = data.data
      let headerColor = null
      for (let i = 0; i < data.length; i++) {
        let files = []
        for (let j = 0; j < data[i].files.length; j++) {
          files.push({a: `${config.api}/incident/${data[i].hash}/${data[i].files[j]}?jwt=${localStorage.getItem('jwt')}`, name: data[i].files[j]})
        }
        data[i].files = files
      }
      for (let i = 0; i < data.length; i++) {
        data[i].color = null
        for (let a = 0; a < data[i].groups.length; a++) {
          if (data[i].color === null) {
            data[i].color = data[i].groups[a].complete
            headerColor = data[i].groups[a].complete
          } else if (data[i].color === 'rgb(76, 175, 80)') {
            data[i].color = data[i].groups[a].complete
            headerColor = 'rgb(76, 175, 80)'
          } else if (data[i].color === 'rgb(255, 40, 40)') {
            data[i].color = 'rgb(255, 40, 40)'
            headerColor = 'rgb(255, 40, 40)'
          }
        }
      }
      S.commit('headerColor', headerColor)
      state.incidents = data
    }
  },
  getters: {
    incidents: state => state.incidents
  },
  actions: {}
}
export default monitor
