<template>
  <v-select :items="statuses" label="Статус инцидента" v-model="statusObj"></v-select>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'status',
  data () {
    return {
      statusObj: null
    }
  },
  computed: {
    ...mapGetters({legend: 'legend/legend'}),
    statuses () {
      let ret = []
      for (let i = 0; i < Object.keys(this.legend.incidents.statuses).length; i++) {
        ret.push(this.legend.incidents.statuses[Object.keys(this.legend.incidents.statuses)[i]])
      }
      return ret
    }
  },
  watch: {
    statusObj: function (val, oldVal) {
      this.$emit('status', this.statuses.filter(it => it.value === val))
    }
  }
}
</script>

<style scoped>

</style>
