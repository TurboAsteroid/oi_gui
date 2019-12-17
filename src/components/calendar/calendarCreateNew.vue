<template>
  <span>
  <v-toolbar color="blue-grey lighten-5" class="noshadow">
    <i class="material-icons">schedule</i>
    <v-toolbar-title>Создать новый график дежурств</v-toolbar-title>
  </v-toolbar>
    <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs10>
        <v-text-field
          label="Имя графика"
          prepend-icon=""
          v-model="name"
        ></v-text-field>
      </v-flex>
      <v-flex>
        <v-btn color="primary" @click="add" :loading="loading">Добавить</v-btn>
      </v-flex>
      </v-layout>
    </v-container>
    </span>
</template>

<script>
export default {
  name: 'calendarCreateNew',
  props: [ 'loading' ],
  data () {
    return {
      name: ''
    }
  },
  methods: {
    add () {
      this.$emit('add', this.name)
      this.name = ''
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
