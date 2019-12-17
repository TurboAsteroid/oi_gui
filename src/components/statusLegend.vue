<template>
  <v-navigation-drawer fixed right app v-if="drawer">
    <span v-for="item in legend" :key="item.title" v-if="item.title !== ''">
      <v-toolbar>
        <v-toolbar-title>{{item.title}}</v-toolbar-title>
      </v-toolbar>
      <v-list>
        <v-list-tile v-for="status in item.statuses" :key="item.title + status.text + status.value"><!-- @click=""-->
          <v-list-tile-action>
            <v-icon v-if="status.value" :style="{color: status.value}">error</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="status.text"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </span>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'statusLegend',
  props: ['drawer'],
  async mounted () {
    try {
      this.$store.dispatch('legend/legend')
    } catch (err) {
      console.log(err)
      localStorage.clear()
      this.$router.push({ name: 'auth' })
      this.$store.commit('navigation/exitButtonIsActive', false)
    }
  },
  computed: {
    ...mapGetters({legend: 'legend/legend'})
  }
}
</script>

<style scoped>

</style>
