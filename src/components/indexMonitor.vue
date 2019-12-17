<template>
  <span>
    <statusLegend :drawer="drawer"/>
    <v-toolbar color="blue-grey lighten-5" class="noshadow">
      <v-tooltip bottom>
        <v-btn icon large @click="back" slot="activator" >
          <v-icon large>keyboard_arrow_left</v-icon>
        </v-btn>
        <span>Назад</span>
      </v-tooltip>
      <v-toolbar-title>Мониторинг инцидентов</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="drawer = !drawer"><i class="material-icons">help_outline</i>&nbsp;Легенда</v-btn>
    </v-toolbar>
    <list-of-incidents :incidents="incidents"/>
  </span>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import router from '@/router'
import { mapGetters } from 'vuex'
import statusLegend from '@/components/statusLegend'
import ListOfIncidents from './listOfIncidents'
export default {
  name: 'indexMonitor',
  components: { statusLegend, ListOfIncidents },
  data () {
    return {
      M: moment,
      groups: [],
      allusers: [],
      drawer: true
    }
  },
  created () {
    moment.locale('ru')
  },
  async mounted () {
    try {
      this.$store.commit('monitor/incidents', {data: (await axios.get(`${this.$config.api}/incident/getall`)).data, type: 'from_monitor'})
    } catch (err) {
      console.log(err)
      localStorage.clear()
      router.push({ name: 'auth' })
      this.$store.commit('navigation/exitButtonIsActive', false)
    }
  },
  methods: {
    back () {
      router.go(-1)
    }
  },
  computed: {
    ...mapGetters({
      incidents: 'monitor/incidents'
    })
  }
}
</script>

<style scoped>
  .noshadow {
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
  }
</style>
