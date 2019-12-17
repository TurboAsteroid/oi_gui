<template>
  <span>
  <v-layout align-start justify-start column fill-height>
    <v-list>
      <v-list-tile v-for="item in menu" :key="item.name" :to="item.route" color="info" ripple>
        <v-list-tile-action>
          <v-icon>{{item.icon}}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title v-text="item.name"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-layout>
  </span>
</template>

<script>
export default {
  name: 'navigation',
  data () {
    return {
      nothing: false,
      menu: [
        {
          name: 'Мониторинг инцидентов',
          icon: 'visibility',
          route: '/im'
        },
        {
          name: 'Регистрация инцидента',
          icon: 'add_alert',
          route: '/ir'
        },
        {
          name: 'Отчеты по инцидентам',
          icon: 'history',
          route: '/reports'
        },
        {
          name: 'Администрирование групп',
          icon: 'settings',
          route: '/ig'
        },
        {
          name: 'Управление пользователями',
          icon: 'account_circle',
          route: '/userAdd'
        },
        {
          name: 'График дежурств',
          icon: 'event_note',
          route: '/calendar'
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
