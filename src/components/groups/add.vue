<template>
  <span>

  <v-container>
    <v-layout align-center justify-center row fill-height wrap>
      <v-flex xs12 md6>
        <v-text-field label="Имя группы" v-model="creatingGroupName" :rules="creatingGroupNameRules" :counter="200" />
      </v-flex>
      <v-flex xs12 offset-md1 md2>
        <v-btn @click="addGroup" block v-bind:disabled="creatingGroupName === ''" color="primary">
          <i class="material-icons">group_add</i>&nbsp;
          Добавить группу
        </v-btn>
      </v-flex>
      <v-flex xs12 offset-md1 md2>
        <v-btn @click="save" block color="primary">
          <i class="material-icons">done</i>
          Сохранить
        </v-btn>
      </v-flex>
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
export default {
  name: 'add',
  props: [ 'groups', 'allusers', 'tags' ],
  data () {
    return {
      creatingGroupNameRules: [
        v => !!v || 'Заполните имя группы',
        v => v.length <= 200 || 'Поле должно содержать не более 200 символов'
      ],
      creatingGroupName: '',
      msg: {
        message: '',
        alertStatus: false,
        color: 'success',
        y: 'top',
        x: null,
        mode: '',
        timeout: 3000
      }
    }
  },
  methods: {
    addGroup () {
      var groupIdMax = 0
      for (var i = 0; i < this.groups.length; i++) {
        if (this.groups[i].id > groupIdMax) {
          groupIdMax = this.groups[i].id
        }
      }
      groupIdMax++
      this.groups.push({
        id: groupIdMax,
        name: this.creatingGroupName,
        data: [{
          row_number: 1,
          delay: 5,
          users: []
        }]
      })

      this.msg = {
        message: 'Группа добавлена успешно, не забудте ее сохранить',
        alertStatus: true,
        type: 'success',
        color: 'success',
        y: 'top',
        x: null,
        mode: '',
        timeout: 3000
      }
      const self = this
      setTimeout(function func () {
        self.msg.alertStatus = false
      }, 5000)
      this.creatingGroupName = ''
    },
    // сравнивает переданное значение со значением объекта в массиве объектов и возвращает объект
    async recreator (val, arrOfObj) {
      for (var i = 0; i < arrOfObj.length; i++) {
        if (arrOfObj[i].value === val) {
          return arrOfObj[i]
        }
      }
      return {
        value: -1,
        text: 'error'
      }
    },
    async save () {
      // пересборка массива групп на отправку
      if (this.groups !== undefined) {
        for (let i = 0; i < this.groups.length; i++) {
          // пересборка тегов (зон ответственности)
          if (this.groups[i].tags !== undefined) {
            for (let s = 0; s < this.groups[i].tags.length; s++) {
              if (typeof this.groups[i].tags[s] === 'number') {
                this.groups[i].tags[s] = await this.recreator(this.groups[i].tags[s], this.tags)
              }
            }
          }
          // пересборка пользователь
          if (this.groups[i].data !== undefined) {
            for (let j = 0; j < this.groups[i].data.length; j++) {
              if (this.groups[i].data[j].users !== undefined) {
                for (let m = 0; m < this.groups[i].data[j].users.length; m++) {
                  if (typeof this.groups[i].data[j].users[m] !== 'object') {
                    this.groups[i].data[j].users[m] = await this.recreator(this.groups[i].data[j].users[m], this.allusers)
                  }
                }
              }
            }
          }
        }
      }
      const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: this.groups,
        url: `${this.$config.api}/groups/saveall`
      }
      // const res = { status: 403 }
      try {
        const res = await axios(options)
        if (res.status === 200) {
          // всплывающая подсказка
          this.msg = {
            message: 'Группа сохранена успешно',
            alertStatus: true, // состояние подсказки !!! необходимо вынести в стор !!!
            color: 'success',
            y: 'top',
            x: null,
            mode: '',
            timeout: 3000
          }
        } else {
          // всплывающая подсказка
          this.msg = {
            message: 'Ошибка сохранения группы',
            alertStatus: true, // состояние подсказки !!! необходимо вынести в стор !!!
            color: 'error',
            y: 'top',
            x: null,
            mode: '',
            timeout: 3000
          }
        }
      } catch (err) {
        console.log(err)
        localStorage.clear()
        this.$router.push({ name: 'auth' })
        this.$store.commit('navigation/exitButtonIsActive', false)
      }
    }
  }
}
</script>

<style scoped>

</style>
