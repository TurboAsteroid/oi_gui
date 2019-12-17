import io from 'socket.io-client'
import S from '@/store'
const mainSocket = {
  connect: () => {
    console.log('socket connected')
  },
  disconnect: () => {
    console.log('socket disconnected. we are so sorry. reconnecting...')
  },
  incidents: (data) => {
    console.log('socket incidents')
    S.commit('monitor/incidents', {data: data, type: 'from_socket'})
  }
}

function exp (config) {
  const socket = io(config.api)
  const sockets = Object.assign({}, mainSocket)
  const keys = Object.keys(sockets)
  for (let i = 0; i < keys.length; i++) {
    socket.on(keys[i], async (res) => {
      await sockets[keys[i]](res)
    })
  }
}

export default exp
