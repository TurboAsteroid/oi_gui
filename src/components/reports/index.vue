<template>
  <span>
    <statusLegend :drawer="drawer2"/>
    <v-toolbar color="blue-grey lighten-5" class="noshadow">
      <v-tooltip bottom>
        <v-btn icon large @click="back" slot="activator" >
          <v-icon large>keyboard_arrow_left</v-icon>
        </v-btn>
        <span>Назад</span>
      </v-tooltip>
      <v-toolbar-title>Отчеты по инцидентам</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="drawer2 = !drawer2"><i class="material-icons">help_outline</i>&nbsp;Легенда</v-btn>
    </v-toolbar>
    <filters @results="results"/>
    <list-of-incidents :incidents="incidents"/>
  </span>
</template>

<script>
import moment from 'moment'
import statusLegend from '@/components/statusLegend'
import filters from './filters'
import { mapGetters } from 'vuex'
import ListOfIncidents from '../listOfIncidents'
export default {
  name: 'indexMonitor',
  components: { ListOfIncidents, statusLegend, filters },
  data () {
    return {
      M: moment,
      drawer2: true
    }
  },
  created () {
    this.$store.commit('monitor/incidents', {data: [], type: 'from_report'})
    moment.locale('ru')
  },
  mounted () {
    console.log(this.$socket)
    if (!this.$socket.disconnected()) {
      this.$socket.disconnect()
    }
  },
  methods: {
    results (data) {
      this.$store.commit('monitor/incidents', {data: data, type: 'from_report'})
    },
    back () {
      this.$router.go(-1)
    }
  },
  destroyed () {
    if (this.$socket.disconnected()) {
      this.$socket.connect()
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
