<template>
  <span>
    <v-toolbar color="blue-grey lighten-5" class="noshadow">
      <v-tooltip bottom>
        <v-btn icon large @click="back" slot="activator" >
          <v-icon large>keyboard_arrow_left</v-icon>
        </v-btn>
        <span>Назад</span>
      </v-tooltip>
      <v-toolbar-title>Регистрация инцидента</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="drawer = !drawer"><i class="material-icons">help_outline</i>&nbsp;Помощь</v-btn>
    </v-toolbar>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      right
      app
    >
      <v-container>
      <h3>Зоны ответственности</h3>
      <v-radio-group v-model="tag">
      <v-radio
        v-for="it in tags"
        :key="it.value"
        :label="`${it.text}`"
        :value="it.value"
      ></v-radio>
    </v-radio-group>
    </v-container>
    </v-navigation-drawer>
    <v-container>
      <v-layout wrap align-center justify-center row fill-height>
        <v-flex xs12>
          <v-select
            chips :items="groups"
            v-model="inc.groupsSeleceted"
            label="Группы рассылки"
            prepend-icon="group"
            multiple
          />
        </v-flex>
        <v-flex xs12>
          <v-text-field
            label="Заголовок"
            hint="Введите сюда заголовок инцидента"
            v-model="inc.title"
            :rules="titleRules"
            :counter="200"
            required
          />
        </v-flex>
        <v-flex xs12>
          <v-textarea
            label="Описание"
            hint="Введите сюда описание инцидента"
            v-model="inc.description"
            :rules="descriptionRules"
            :counter="500"
            required
            height="150px"
            no-resize
          />
        </v-flex>
        <v-layout>
          <v-flex xs6><addFileToIncident :insertedId="insertedId"/></v-flex>
          <v-flex xs6>
            <v-btn @click="send" block color="error" large :disabled="(inc.groupsSeleceted.length <= 0 || inc.description <= 0 || inc.title <= 0)">
              Отправить&nbsp;
              <i class="material-icons">send</i>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-container>
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
  </span>
</template>

<script>
import axios from 'axios'
import router from '@/router'
import S from '@/store'
import addFileToIncident from './addFileToIncident'
export default {
  name: 'indexGroups',
  components: {addFileToIncident},
  data () {
    return {
      insertedId: -1,
      tagObj: { value: 1, text: '' },
      tag: '',
      tags: [],
      groups: [],
      titleRules: [
        v => !!v || 'Заполните заголовок инцидента',
        v => v.length <= 200 || 'Поле должно содержать не более 200 символов'
      ],
      descriptionRules: [
        v => !!v || 'Заполните описание инцидента',
        v => v.length <= 500 || 'Поле должно содержать не более 500 символов'
      ],
      inc: {
        groupsSeleceted: [],
        title: '',
        description: ''
      },
      msg: {
        message: '',
        alertStatus: false,
        type: 'success'
      },
      drawer: false
    }
  },
  async mounted () {
    this.groups = (await axios.get(`${this.$config.api}/groups/get`)).data
    this.tags = (await axios.get(`${this.$config.api}/tags/get`)).data
  },
  methods: {
    async send () {
      var self = this
      var sendData = {}
      if (self.tag !== '' && self.inc.groupsSeleceted[0].id !== undefined) {
        var ids = []
        for (var i = 0; i < self.inc.groupsSeleceted.length; i++) {
          ids.push(self.inc.groupsSeleceted[i].id)
        }
        self.inc.groups = ids
      } else {
        self.inc.groups = self.inc.groupsSeleceted
      }
      sendData = self.inc
      delete sendData.groupsSeleceted
      const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: sendData,
        url: `${this.$config.api}/incident/new`
      }
      // const res = { status: 200 }
      try {
        const res = await axios(options)
        if (res.status === 200) {
          this.insertedId = res.data.insertedId
          this.inc = {
            groupsSeleceted: [],
            title: null,
            description: null
          }
          this.msg = {
            message: 'Инцидент отправлен',
            alertStatus: true,
            color: 'success',
            y: 'top',
            x: null,
            mode: '',
            timeout: 6000
          }
        } else {
          this.msg = {
            message: 'Ошибка отправки инцидента',
            alertStatus: true,
            color: 'error',
            y: 'top',
            x: null,
            mode: '',
            timeout: 6000
          }
        }
        this.tag = ''
      } catch (err) {
        console.log(err)
        localStorage.clear()
        router.push({ name: 'auth' })
        S.commit('navigation/exitButtonIsActive', false)
      }
    },
    back () {
      router.go(-1)
    }
  },
  watch: {
    tag (val, oldVal) {
      this.inc.groupsSeleceted = []
      this.groups.forEach(gr => {
        gr.tags.forEach(ta => {
          if (ta.value === val) {
            this.inc.groupsSeleceted.push(gr)
          }
        })
      })
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
