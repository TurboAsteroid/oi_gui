<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 md4>
        <dates @date1="date1Func" @date2="date2Func"/>
      </v-flex>
      <v-flex xs12 md2 offset-md1>
        <status @status="statusFunc"/>
      </v-flex>
      <v-flex xs12 md4 offset-md1>
        <search @search="searchFunc" @searchIt="searchItFunc"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import dates from './dates'
import search from './search'
import status from './status'
import axios from 'axios'
export default {
  name: 'index',
  components: { dates, status, search },
  data () {
    return {
      date1: null,
      date2: null,
      searchInc: null,
      statusObj: null
    }
  },
  methods: {
    date1Func (date1) {
      this.date1 = date1
    },
    date2Func (date2) {
      this.date2 = date2
    },
    statusFunc (status) {
      this.statusObj = status
    },
    searchFunc (search) {
      this.searchInc = search
    },
    async searchItFunc () {
      const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: {
          date1: this.date1,
          date2: this.date2,
          search: this.searchInc,
          status: this.statusObj
        },
        url: `${this.$config.api}/report`
      }
      let data = (await axios(options)).data
      this.$emit('results', data)
    }
  }
}
</script>

<style scoped>

</style>
