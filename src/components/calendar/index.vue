<template>
  <div>
    <v-toolbar color="blue-grey lighten-5" class="noshadow">
      <v-tooltip bottom>
        <v-btn icon large @click="$router.go(-1)" slot="activator" >
          <v-icon large>keyboard_arrow_left</v-icon>
        </v-btn>
        <span>Назад</span>
      </v-tooltip>
      <v-toolbar-title>График дежурств</v-toolbar-title>
      <v-spacer></v-spacer>
      <!--<v-btn @click="drawer = !drawer"><i class="material-icons">help_outline</i>&nbsp;Помощь</v-btn>-->
    </v-toolbar>
    <v-card>
      <calendar-create-new v-on:add="add" :loading="loading"/>
    </v-card>
    <v-card>
    <calendar-list :items1="items1" :items2="items2" v-on:updatePlease="updatePlease"/>

    </v-card>
  </div>
</template>

<script>
import axios from 'axios'
import CalendarList from './calendarList'
import CalendarCreateNew from './calendarCreateNew'
export default {
  name: 'index',
  components: {CalendarCreateNew, CalendarList},
  data: function () {
    return {
      dataFromAxios: [],
      items1: [],
      items2: [],
      loading: false
    }
  },
  methods: {
    updatePlease () {
      this.loadData()
    },
    async add (name) {
      this.loading = true
      await axios.post(`${this.$config.api}/calendar`, { name: name })
      this.loading = false
      this.loadData()
    },
    async loadData () {
      this.items1 = []
      this.items2 = []
      this.dataFromAxios = (await axios.get(`${this.$config.api}/calendar`)).data
      const size1 = parseInt(this.dataFromAxios.length / 2 - 0.5) + 1
      for (let i = 0; i < size1; i++) {
        this.items1.push(this.dataFromAxios[i])
      }
      for (let i = size1; i < this.dataFromAxios.length; i++) {
        this.items2.push(this.dataFromAxios[i])
      }
    }
  },
  mounted: function () {
    this.loadData()
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
