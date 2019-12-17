<template>
  <v-card>
    <v-toolbar color="blue-grey lighten-5">
      <v-tooltip bottom>
        <v-btn icon large @click="back" slot="activator" >
          <v-icon large>keyboard_arrow_left</v-icon>
        </v-btn>
        <span>Назад</span>
      </v-tooltip>
      <v-toolbar-title>Управление пользователями</v-toolbar-title>
    </v-toolbar>
    <v-layout>
      <userFindForm @userList_refresh="userListRefresh"/>
      <userList :refresh="refresh"/>
    </v-layout>
  </v-card>
</template>

<script>
import userList from './userList'
import userFindForm from './userFindForm'
export default {
  name: 'userAdd',
  components: { userList, userFindForm },
  data () {
    return {
      msg: {
        message: null,
        alertStatus: false,
        type: 'success'
      },
      refresh: false
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    userListRefresh () {
      this.refresh = !this.refresh
    }
  }
}
</script>

<style scoped>

</style>
