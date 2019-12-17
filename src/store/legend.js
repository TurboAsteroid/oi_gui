import config from '@/config'
import axios from 'axios'
const legend = {
  namespaced: true,
  state: {
    legend: {
      'incidents': {
        'title': '',
        'statuses': {
          'green': {
            'text': '', 'value': ''
          }
        }
      },
      'groups': {
        'title': '',
        'statuses': {
          'green': {
            'text': '', 'value': ''
          }
        }
      },
      'notifications': {
        'title': '',
        'statuses': {
          'green': {
            'text': '', 'value': ''
          }
        }
      }
    }
  },
  mutations: {
    legend: (state, data) => { state.legend = data }
  },
  getters: {
    legend: state => {
      return state.legend
    }
  },
  actions: {
    async legend (context) {
      context.commit('legend', (await axios.get(`${config.api}/getallstatuses`)).data)
    }
  }
}
export default legend
