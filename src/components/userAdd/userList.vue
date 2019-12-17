<template>
  <v-flex xs12 sm6 class="blue-grey lighten-5">
    <v-card class="noshadow">
      <v-toolbar color="blue-grey lighten-5" class="noshadow">
        <v-toolbar-title>Список текущих пользователей</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field prepend-icon="search" v-on:keyup.native="filter" label="ФИО пользователя"></v-text-field>
      </v-toolbar>
      <v-container class="scroll-y blue-grey lighten-5" >
        <v-list class="blue-grey lighten-5" :style="{height: windowHeight + 'px'}">
          <template v-for="(item, index) in showedItems">
            <v-subheader v-bind:key="index+item"><i class="material-icons">person</i>&nbsp;&nbsp;&nbsp;{{ item.name }}</v-subheader>
            <v-divider :key="index" v-if="showedItems[index+1]"></v-divider>
          </template>
        </v-list>
      </v-container>
    </v-card>
  </v-flex>
</template>

<script>
import axios from 'axios'
export default {
  name: 'userList',
  props: ['refresh'],
  data () {
    return {
      items: [],
      showedItems: [],
      filterText: '',
      windowHeight: window.innerHeight * 0.45
    }
  },
  mounted () {
    window.addEventListener('resize', () => {
      this.windowHeight = window.innerHeight * 0.45
    })
    this.getData()
  },
  methods: {
    filter () {
      this.showedItems = this.items.filter(item => {
        if (item.name.toLowerCase().indexOf(this.filterText.toLowerCase()) > -1) {
          return true
        } else {
          return false
        }
      })
    },
    async getData () {
      this.items = (await axios.get(`${this.$config.api}/users/getallusers`)).data
      this.showedItems = this.items
    }
  },
  watch: {
    async refresh (val, oldVal) {
      await this.getData()
      this.filter()
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
