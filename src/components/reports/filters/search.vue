<template>
  <v-layout row wrap>
    <v-flex xs12 md9>
      <v-text-field label="Поиск инцидента" v-model="searchInc" v-on:keydown.enter="$emit('searchIt')"></v-text-field>
    </v-flex>
    <v-flex xs12 md3>
      <v-btn @click="$emit('searchIt')" color="primary"><i class="material-icons">search</i>&nbsp;Найти</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'search',
  data () {
    return {
      searchInc: ''
    }
  },
  watch: {
    searchInc: function (val, oldVal) {
      this.$emit('search', val)
    }
  }
}
</script>

<style scoped>

</style>
