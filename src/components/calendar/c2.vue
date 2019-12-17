<template>
<div>
  <v-toolbar color="blue-grey lighten-5" class="noshadow">
    <v-tooltip bottom>
      <v-btn icon large @click="$router.go(-1)" slot="activator" >
        <v-icon large>keyboard_arrow_left</v-icon>
      </v-btn>
      <span>Назад</span>
    </v-tooltip>
    <v-toolbar-title>График дежурств</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-autocomplete
      v-model="slave"
      :items="slaves"
      :label="'Сотрудники'"
      persistent-hint
    >
      <v-slide-x-reverse-transition
        slot="append-outer"
        mode="out-in"
      >
      </v-slide-x-reverse-transition>
    </v-autocomplete>

    <v-btn color="primary" @click="adduser">Добавить сотрудника</v-btn>
    <v-btn color="primary" @click="calendarPost" :loading="loading">Сохранить</v-btn>
    <!--<v-btn @click="drawer = !drawer"><i class="material-icons">help_outline</i>&nbsp;Помощь</v-btn>-->
  </v-toolbar>
  <v-text-field
    style="margin: 14px !important;"
    label="Имя графика"
    prepend-icon=""
    v-model="name"
  ></v-text-field>
  <DayPilotScheduler id="dp" :config="initConfig" ref="scheduler" v-show="slaves.length > 0"/>

  <v-snackbar
    v-model="msg.alertStatus"
    :bottom="msg.y === 'bottom'"
    :left="msg.x === 'left'"
    :multi-line="msg.mode === 'multi-line'"
    :right="msg.x === 'right'"
    :timeout="msg.timeout"
    :top="msg.y === 'top'"
    :vertical="msg.mode === 'vertical'"
    :color="msg.color"
  >
    {{msg.message}}
    <v-btn
      flat
      @click="msg.alertStatus = false"
    >
      Закрыть
    </v-btn>
  </v-snackbar>
</div>
</template>

<script>
import axios from 'axios'
import { DayPilot, DayPilotScheduler } from 'daypilot-pro-vue'
function removeDEMO () {
  if (document.getElementsByClassName('scheduler_default_corner').length > 0) {
    document.getElementsByClassName('scheduler_default_corner')[0].innerText = ''
  }
  if (document.getElementsByClassName('.month_default_main').length > 0) {
    document.getElementsByClassName('.month_default_main')[0].innerText = ''
  }
  console.log('removeDEMO')
}
export default {
  name: 'c2',
  components: { DayPilotScheduler },
  data: function () {
    return {
      msg: {
        message: '',
        alertStatus: false,
        type: 'success'
      },
      name: '',
      slave: null,
      slaves: [],
      slavesData: [],
      loading: false,
      calendarData: [],
      initConfig: {
        locale: 'ru-ru',
        cellWidthSpec: 'Auto',
        crosshairType: 'Header',
        timeHeaders: [{'groupBy': 'Month'}, {'groupBy': 'Day', 'format': 'd'}],
        scale: 'Day',
        days: 60,
        startDate: DayPilot.Date.today().firstDayOfMonth(),
        showNonBusiness: true,
        businessWeekends: false,
        floatingEvents: true,
        eventHeight: 30,
        eventMovingStartEndEnabled: false,
        eventResizingStartEndEnabled: false,
        timeRangeSelectingStartEndEnabled: false,
        groupConcurrentEvents: false,
        eventStackingLineHeight: 100,
        allowEventOverlap: true,
        timeRangeSelectedHandling: 'Enabled',
        onTimeRangeSelected: function (args) {
          this.dialog = true
          var dp = this
          DayPilot.Modal.prompt('Сздание нового события:', 'Дежурство').then(function (modal) {
            dp.clearSelection()
            if (!modal.result) { return }
            dp.events.add(new DayPilot.Event({
              start: args.start,
              end: args.end,
              id: DayPilot.guid(),
              resource: args.resource,
              text: modal.result
            }))
          })
        },
        eventMoveHandling: 'Update',
        onEventMoved: function (args) {
          this.message('Дежурство перемещено')
        },
        eventResizeHandling: 'Update',
        onEventResized: function (args) {
          this.message('Изменена продолжительность дежурства')
        },
        eventDeleteHandling: 'Update',
        onEventDeleted: function (args) {
          this.message('Удалено')
        },
        eventClickHandling: 'Disabled',
        eventHoverHandling: 'Bubble'
        // ,
        // bubble: new DayPilot.Bubble({
        //   onLoad: function (args) {
        //   // if event object doesn't specify "bubbleHtml" property
        //   // this onLoad handler will be called to provide the bubble HTML
        //     args.html = 'Event details'
        //   }
        // })
      }
    }
  },
  computed: {
    scheduler: function () {
      return this.$refs.scheduler.control
    }
  },
  methods: {
    removeResourceHandler () {
      this.scheduler.onRowClick = function (args) {
        const id = args.row.id
        let events = []
        for (let i = 0; i < this.events.list.length; i++) {
          if (this.events.list[i].user_id !== id && this.events.list[i].resource !== id) {
            console.log(JSON.stringify(this.events.list[i]))
            events.push(this.events.list[i])
          }
        }
        this.update({events: events})
        args.row.remove()
        removeDEMO()
        this.myvue.$data.slaves = this.createSlavesList2(this.myvue.$data.slavesData, this.myvue.$data.calendarData)
      }
    },
    async calendarPost () {
      this.loading = true
      let data = {
        name: this.name,
        resources: this.scheduler.resources,
        events: this.scheduler.events.list
      }
      const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: data,
        url: `${this.$config.api}/calendar/${this.$route.params.id}`
      }
      try {
        const res = await axios(options)
        if (res.status === 200 && res.data.status === 'ok') {
          this.loading = false
          this.msg = {
            message: 'График дежурств сохранен',
            alertStatus: true,
            color: 'success',
            y: 'top',
            x: null,
            mode: '',
            timeout: 3000
          }
        }
      } catch (e) {
        this.loading = false
        this.msg = {
          message: 'Ошибка сохранения графика дежурств',
          alertStatus: true,
          color: 'error',
          y: 'top',
          x: null,
          mode: '',
          timeout: 6000
        }
        console.log(e)
        localStorage.clear()
        this.$router.push({ name: 'auth' })
        this.$store.commit('navigation/exitButtonIsActive', false)
      }
    },
    adduser () {
      let id = -1
      let login = -1
      for (let i = 0; i < this.slavesData.length; i++) {
        if (this.slavesData[i].name === this.slave) {
          id = this.slavesData[i].id
          login = this.slavesData[i].login
        }
      }
      if (id !== -1 && login !== -1) {
        let data = this.scheduler.resources
        data.push({id: id, name: this.slave, login: login})
        this.scheduler.update({resources: data})
      }
      this.createSlavesList()
      this.slave = null
      if (document.getElementsByClassName('scheduler_default_corner').length > 0) {
        document.getElementsByClassName('scheduler_default_corner')[0].innerText = ''
      }
      if (document.getElementsByClassName('.month_default_main').length > 0) {
        document.getElementsByClassName('.month_default_main')[0].innerText = ''
      }
    },
    async load () {
      this.calendarData = (await axios.get(`${this.$config.api}/calendar/${this.$route.params.id}`)).data
      this.name = this.calendarData.name
      this.scheduler.update({resources: this.calendarData.resources})
      this.scheduler.update({events: this.calendarData.events})
      this.scheduler.myvue = this
      this.scheduler.createSlavesList2 = this.createSlavesList2
      this.slavesData = (await axios.get(`${this.$config.api}/users/getallusers`)).data
      this.createSlavesList()
      removeDEMO()
    },
    createSlavesList2 (slavesData, calendarData) {
      let slaves = []
      let flg = false
      for (let i = 0; i < slavesData.length; i++) {
        for (let j = 0; j < calendarData.resources.length; j++) {
          if (slavesData[i].id === calendarData.resources[j].id) {
            flg = true
          }
        }
        if (!flg) {
          slaves.push(this.slavesData[i].name)
        }
        flg = false
      }
      return slaves
    },
    createSlavesList () {
      this.slaves = []
      let flg = false
      for (let i = 0; i < this.slavesData.length; i++) {
        for (let j = 0; j < this.calendarData.resources.length; j++) {
          if (this.slavesData[i].id === this.calendarData.resources[j].id) {
            flg = true
          }
        }
        if (!flg) {
          this.slaves.push(this.slavesData[i].name)
        }
        flg = false
      }
    }
  },
  mounted: function () {
    removeDEMO()
    this.load()
    this.removeResourceHandler()
    setInterval(() => { removeDEMO() }, 60000)
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
