<template>
  <span>
      <v-toolbar color="blue-grey lighten-5" class="noshadow">
        <i class="material-icons">schedule</i>
        <v-toolbar-title>Графики дежурств</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field v-on:keyup.native="filter" v-model="filterText" label="Поиск" prepend-icon="search"></v-text-field>
      </v-toolbar>
    <v-layout align-start justify-start row fill-height>
      <v-flex xs6>
        <v-list>
          <template v-for="(item, index) in showedItems1">
            <v-divider :inset="item.inset" :key="index + 'i1'"></v-divider>
            <v-list-tile :key="item.name" @click="gotocalendar(item.id)">
              <v-list-tile-content>
                <v-list-tile-title v-html="item.name"></v-list-tile-title>
              </v-list-tile-content>
              <v-spacer></v-spacer>
              <v-list-tile-action>
                <v-btn icon ripple @click.stop="dialog = true">
                  <v-icon>delete_forever</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-dialog
              v-model="dialog"
              max-width="290"
              :key="index + 'i1d'"
            >
              <v-card>
                <v-card-title class="headline">Внимание</v-card-title>

                <v-card-text>
                  График будет безвозвратно удален
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn
                    color="green darken-1"
                    flat="flat"
                    @click="dialog = false"
                  >
                    Отмена
                  </v-btn>

                  <v-btn
                    color="green darken-1"
                    flat="flat"
                    @click="remove(item.id)"
                  >
                    OK
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
        </v-list>
      </v-flex>
      <v-flex xs6>
        <v-list>
          <template v-for="(item, index) in showedItems2">
            <v-divider :inset="item.inset" :key="index + 'i2'"></v-divider>
            <v-list-tile :key="item.name" @click="gotocalendar(item.id)">
              <v-list-tile-content>
                <v-list-tile-title v-html="item.name"></v-list-tile-title>
              </v-list-tile-content>
              <v-spacer></v-spacer>
              <v-list-tile-action>
                <v-btn icon ripple @click.stop="dialog = true">
                  <v-icon>delete_forever</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-dialog
              v-model="dialog"
              max-width="290"
              :key="index + 'i2d'"
            >
              <v-card>
                <v-card-title class="headline">Внимание</v-card-title>

                <v-card-text>
                  График будет безвозвратно удален
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn
                    color="green darken-1"
                    flat="flat"
                    @click="dialog = false"
                  >
                    Отмена
                  </v-btn>

                  <v-btn
                    color="green darken-1"
                    flat="flat"
                    @click="del(item.id)"
                  >
                    OK
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
        </v-list>
      </v-flex>
    </v-layout>

  </span>
</template>

<script>
import axios from 'axios'
export default {
  name: 'calendarList',
  props: ['items1', 'items2'],
  data () {
    return {
      dialog: false,
      filterText: '',
      showedItems1: [],
      showedItems2: []
    }
  },
  methods: {
    async remove (id) {
      await axios.delete(`${this.$config.api}/calendar/${id}`)
      this.$emit('updatePlease')
      this.dialog = false
    },
    filter () {
      this.showedItems1 = this.items1.filter(item => {
        if (item.name.toLowerCase().indexOf(this.filterText.toLowerCase()) > -1) {
          return true
        } else {
          return false
        }
      })
      this.showedItems2 = this.items2.filter(item => {
        if (item.name.toLowerCase().indexOf(this.filterText.toLowerCase()) > -1) {
          return true
        } else {
          return false
        }
      })
    },
    gotocalendar (id) {
      this.$router.push({name: 'calendarid', params: {id: id}})
    }
  },
  watch: {
    items1 (nv, ov) {
      this.filter()
    },
    items2 (nv, ov) {
      this.filter()
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
