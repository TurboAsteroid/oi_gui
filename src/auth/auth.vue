
<template>
  <v-container>
    <v-layout align-center justify-center row fill-height wrap>
      <v-form v-model="valid" ref="form">
        <v-text-field
          label="Имя пользователя"
          v-model="login"
          :rules="loginRules"
          required
          id="login"
          @keyup.enter="submit"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :append-icon="show1 ? 'visibility_off' : 'visibility'"
          :rules="passwordRules"
          :type="show1 ? 'text' : 'password'"
          name="password"
          counter
          @click:append="show1 = !show1"
          label="Пароль"
          required
          id="password"
          @keyup.enter="submit"
        ></v-text-field>
        <v-layout justify-space-between>
          <v-btn @click="submit" color="info" :disabled="!valid" id="loginbtn">Вход</v-btn>
        </v-layout>
      </v-form>
    </v-layout>
  </v-container>
</template>
<script>
import axios from 'axios'
import S from '@/store'
import router from '@/router'
export default {
  name: 'auth',
  props: [ 'redirPath' ],
  data () {
    return {
      show1: false,
      valid: false,
      e1: false,
      password: '',
      passwordRules: [
        (v) => !!v || 'Требуется ввести пароль'
      ],
      login: '',
      loginRules: [
        (v) => !!v || 'Требуется ввести имя пользователя'
      ]
    }
  },
  mounted () {
    if (localStorage.getItem('jwt') !== null && this.redirPath === undefined) {
      router.push({ path: '/im' })
    } else if (localStorage.getItem('jwt') !== null) {
      router.push({ path: this.redirPath })
    }
  },
  methods: {
    async submit () {
      if (this.$refs.form.validate()) {
        let login = this.login.split('@')[0]
        login = login + '@elem.ru'
        const options = {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          data: {
            user: {
              login: login,
              password: this.password
            }
          },
          url: `${this.$config.api}/auth/login`
        }
        // const res = { status: 200, data: { user: { name: 'me', isAdmin: 1}, token: 'ttt' } }
        try {
          const res = await axios(options)
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token
          if (res.status === 200) {
            let isAdmin = res.data.user.isAdmin
            localStorage.setItem('user', JSON.stringify(res.data.user))
            localStorage.setItem('jwt', res.data.token)
            if (localStorage.getItem('jwt') != null) {
            // this.$emit('loggedIn')
              if (this.$route.params.nextUrl != null) {
                this.router.push(this.$route.params.nextUrl)
              } else {
                if (isAdmin === 1) {
                  router.push({ name: 'groups' })
                  S.commit('navigation/exitButtonIsActive', true)
                } else {
                  router.push({ name: 'indexRegister' })
                  S.commit('navigation/exitButtonIsActive', true)
                }
              }
            }
          } else {
            console.log('bad')
          }
        } catch (err) {
          console.log(err)
          localStorage.clear()
          router.push({ name: 'auth' })
          S.commit('navigation/exitButtonIsActive', false)
        }
      }
    }
  }
}
</script>

<style>
</style>
