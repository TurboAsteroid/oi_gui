<template>
  <v-app>
    <v-navigation-drawer app v-if="exitButtonIsActive" fixed clipped class="grey lighten-4" v-model="drawer"><navigation/></v-navigation-drawer>
    <v-toolbar app clipped-left>
      <v-toolbar-side-icon @click.native="drawer = !drawer" v-if="exitButtonIsActive"></v-toolbar-side-icon>
      <span class="title ml-3 mr-5">{{$appName}} <span :style="{color: headerColor}" v-if="headerColor === 'rgb(255, 40, 40)'"><i class="material-icons" style="vertical-align: bottom">error</i></span></span>
      <v-spacer></v-spacer>
      <v-btn color="info" v-if="exitButtonIsActive" flat @click="exit"><i class="material-icons">exit_to_app</i>&nbsp;Выход</v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-card height="100%" color="blue-grey lighten-5">
          <router-view></router-view>
        </v-card>
      </v-container>
    </v-content>
    <v-footer app>{{$appVersion}}</v-footer>
  </v-app>
</template>

<script>
import navigation from '@/components/navigation'
import { mapGetters } from 'vuex'
import S from '@/store'
export default {
  name: 'App',
  components: {navigation},
  data: () => ({
    drawer: null
  }),
  mounted () {
    if (localStorage.getItem('jwt') == null) {
      S.commit('navigation/exitButtonIsActive', false)
    } else {
      S.commit('navigation/exitButtonIsActive', true)
    }
  },
  methods: {
    exit () {
      localStorage.clear()
      this.$store.commit('navigation/exitButtonIsActive', false)
      this.$store.commit('headerColor', null)
      this.$router.push({ name: 'auth' })
    }
  },
  computed: {
    ...mapGetters({
      exitButtonIsActive: 'navigation/exitButtonIsActive',
      headerColor: 'headerColor'
    })
  }
}
</script>
