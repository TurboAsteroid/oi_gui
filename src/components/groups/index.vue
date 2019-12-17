<template>
  <span>
    <v-toolbar color="blue-grey lighten-5" class="noshadow">
      <v-tooltip bottom>
        <v-btn icon large @click="back" slot="activator" >
          <v-icon large>keyboard_arrow_left</v-icon>
        </v-btn>
        <span>Назад</span>
      </v-tooltip>
      <v-toolbar-title>Администрирование групп</v-toolbar-title>
    </v-toolbar>
    <add :groups="groups" :tags="tags" :allusers="allusers"/>
    <list :groups="groups" :tags="tags" :allusers="allusers" v-on:updatePlease="updatePlease"/>
  </span>
</template>

<script>
import axios from 'axios'
import add from './add'
import list from './list'
export default {
  name: 'indexGroups',
  components: { add, list },
  data () {
    return {
      groups: [],
      allusers: [],
      tags: []
    }
  },
  async mounted () {
    this.groups = (await axios.get(`${this.$config.api}/groups/get`)).data
    this.allusers = (await axios.get(`${this.$config.api}/getusers`)).data
    this.tags = (await axios.get(`${this.$config.api}/tags/get`)).data
  },
  methods: {
    async updatePlease () {
      this.groups = (await axios.get(`${this.$config.api}/groups/get`)).data
    },
    back () {
      this.router.go(-1)
    }
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
