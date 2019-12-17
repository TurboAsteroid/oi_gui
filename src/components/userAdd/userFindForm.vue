<template>
  <v-flex xs12 sm6 class="blue-grey lighten-5">
    <v-snackbar v-model="msg.alertStatus" :bottom="msg.y === 'bottom'" :left="msg.x === 'left'" :multi-line="msg.mode === 'multi-line'" :right="msg.x === 'right'" :timeout="msg.timeout" :top="msg.y === 'top'" :vertical="msg.mode === 'vertical'" :color="msg.color">
      {{msg.message}}
      <v-btn flat @click="msg.alertStatus = false">Закрыть</v-btn>
    </v-snackbar>
    <v-card class="blue-grey lighten-5 noshadow">
      <v-toolbar color="blue-grey lighten-5" class="noshadow">
        <v-toolbar-title>Добавление пользователя</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-layout row wrap>
          <v-flex xs12 md8>
            <v-text-field prepend-icon="search" name="username" v-model="username" label="ФИО пользователя" type="text" v-on:keyup.enter="find"></v-text-field>
          </v-flex>
          <v-flex xs12 md4>
          <v-btn color="primary" @click="find" :loading="loading"><i class="material-icons">search</i> Найти</v-btn>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-container class="blue-grey lighten-5 scroll-y" v-if="users.length > 0">
        <v-list two-line class="blue-grey lighten-5" :style="{height: windowHeight + 'px'}">
          <template v-for="item in users">
            <v-list-tile :key="item.employeeID" @click="select(item.employeeID)" avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.displayName"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.mail"></v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-avatar><i class="material-icons">person_add</i></v-list-tile-avatar>
            </v-list-tile>
          </template>
        </v-list>
      </v-container>
    </v-card>
  </v-flex>
</template>

<script>
import axios from 'axios'
export default {
  name: 'userFindForm',
  data () {
    return {
      loading: false,
      users: [],
      username: '',
      windowHeight: window.innerHeight * 0.35,
      msg: {
        message: 'Пользователи не найдены',
        alertStatus: false,
        color: 'error',
        y: 'top',
        x: null,
        mode: '',
        timeout: 3000
      }
    }
  },
  mounted () {
    window.addEventListener('resize', () => {
      this.windowHeight = window.innerHeight * 0.35
    })
  },
  methods: {
    async find () {
      this.loading = true
      const options = {
        method: 'GET',
        url: `${this.$config.api}/users/getADuser?user=${this.username}`
      }
      try {
        const res = await axios(options)
        this.users = res.data
        if (this.users.length < 1 || res.status !== 200) {
          this.msg.message = 'Пользователи не найдены'
          this.msg.alertStatus = true
          this.msg.color = 'error'
        }
        this.loading = false
      } catch (err) {
        this.loading = false
        console.log(err)
        localStorage.clear()
        this.$router.push({ name: 'auth' })
        this.$store.commit('navigation/exitButtonIsActive', false)
      }
    },
    async select (employeeID) {
      const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: {employeeID: employeeID},
        url: `${this.$config.api}/users/add`
      }
      try {
        const res = await axios(options)
        if (res.status === 200) {
          this.msg.message = 'Пользователь добавлен'
          this.msg.alertStatus = true
          this.msg.color = 'success'
          this.$emit('userList_refresh')
        } else {
          this.msg.message = 'Ошибка добавления пользователя'
          this.msg.alertStatus = true
          this.msg.color = 'error'
        }
      } catch (err) {
        console.log(err)
        localStorage.clear()
        this.$router.push({ name: 'auth' })
        this.$store.commit('navigation/exitButtonIsActive', false)
      }
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
