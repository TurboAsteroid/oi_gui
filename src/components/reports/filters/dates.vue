<template>
  <v-layout row wrap>
    <v-flex xs12 md6>
      <v-menu
        ref="menu1"
        :close-on-content-click="false"
        v-model="menu1"
        :nudge-right="40"
        :return-value.sync="date1"
        lazy
        transition="scale-transition"
        offset-y
        full-width
      >
        <v-text-field
          slot="activator"
          v-model="date1"
          label="Начало периода"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker v-model="date1" @input="$refs.menu1.save(date1)"></v-date-picker>

      </v-menu>
    </v-flex>
    <v-flex xs12 md6>
      <v-menu
        ref="menu2"
        :close-on-content-click="false"
        v-model="menu2"
        :nudge-right="40"
        :return-value.sync="date2"
        lazy
        transition="scale-transition"
        offset-y
        full-width
      >
        <v-text-field
          slot="activator"
          v-model="date2"
          label="Конец периода"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker v-model="date2" @input="$refs.menu2.save(date2)"></v-date-picker>

      </v-menu>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'dates',
  data: () => ({
    menu1: null,
    menu2: null,
    date1: null,
    date2: null
  }),
  watch: {
    date1: function (val, oldVal) {
      this.$emit('date1', val)
    },
    date2: function (val, oldVal) {
      this.$emit('date2', val)
    }
  }
}
</script>

<style scoped>

</style>
