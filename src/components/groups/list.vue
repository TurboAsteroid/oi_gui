<template>
  <v-layout align-center justify-center row fill-height wrap>
    <v-flex xs12>
      <v-expansion-panel>
        <v-expansion-panel-content v-for="group in groups" v-bind:key="group.id" hide-actions>
          <div slot="header">
            <v-layout align-center justify-center row fill-height>
              <i class="material-icons">group</i>&nbsp;
              <h3>{{group.name}}</h3>
              <v-spacer></v-spacer>
              <v-btn icon ripple @click.stop="dialogRenameCaller(group)">
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn icon ripple @click.stop="dialogDeleteCaller(group)">
                <v-icon>delete_forever</v-icon>
              </v-btn>
            </v-layout>
          </div>
          <v-card>
            <v-card-text primary-title>
              <v-layout align-center justify-center row fill-height>
                <v-flex xs2><h4>Зоны ответственности группы</h4></v-flex>
                <v-flex xs10>
                  <v-combobox
                    v-model="group.tags"
                    :items="tags"
                    :search-input.sync="search"
                    hide-selected
                    label="Зоны ответственности"
                    multiple
                    persistent-hint
                    deletable-chips
                    chips
                    prepend-icon="my_location"
                  >
                    <template slot="no-data">
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title>
                            К сожалению, зоны "<strong>{{ search }}</strong>" не существует. Нажмите <kbd>enter</kbd> и при сохранении группы она будет создана
                          </v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </template>
                  </v-combobox>
                </v-flex>
              </v-layout>
              <v-layout align-center justify-center row fill-height v-for="row in group.data" v-bind:key="row.row_number">
                <v-flex xs9>
                  <v-select prepend-icon="people" chips :items="allusers" v-model="row.users" label="Пользователи группы" multiple deletable-chips/>
                </v-flex>
                <v-flex xs3>
                  <v-text-field prepend-icon="timer" v-model="row.delay" label="Задержка, минуты" bottom/>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-btn flat @click="addString(group)">
                <i class="material-icons">add_circle</i>&nbsp;
                Добавить строку
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <rename :dialog="dialogRename" v-on:rename="rename" :group="groupForRename" v-if="groupForRename !== null"/>
      <deleteComponent :dialog="dialogDelete" v-on:deleteEmit="deleteEmit" :group="groupForDelete" v-if="groupForDelete !== null"/>
    </v-flex>

  </v-layout>
</template>

<script>
import axios from 'axios'
import rename from './rename'
import deleteComponent from './delete'
export default {
  name: 'list',
  props: [ 'groups', 'allusers', 'tags' ],
  components: {rename, deleteComponent},
  data () {
    return {
      search: null,
      dialogDelete: false,
      dialogRename: false,
      groupForRename: null,
      groupForDelete: null
    }
  },
  methods: {
    dialogRenameCaller (group) {
      this.dialogRename = true
      this.groupForRename = group
    },
    async rename (ans, name, id) {
      this.dialogRename = false
      if (ans) {
        await axios.patch(`${this.$config.api}/groups/${id}`, {id: id, name: name})
        this.$emit('updatePlease')
      }
      this.groupForRename = null
    },
    dialogDeleteCaller (id) {
      this.dialogDelete = true
      this.groupForDelete = id
    },
    async deleteEmit (ans, id) {
      this.dialogDelete = false
      if (ans) {
        await axios.delete(`${this.$config.api}/groups/${id}`)
        this.$emit('updatePlease')
      }
      this.groupForDelete = null
    },
    // добавление строки
    addString (gr) {
      var index = 0
      for (var i = 0; i < this.groups.length; i++) {
        if (this.groups[i].id === gr.id) {
          index = i
          break
        }
      }
      var rowNumber = 0
      for (i = 0; i < this.groups[index].data.length; i++) {
        if (this.groups[index].data[i].row_number > rowNumber) {
          rowNumber = this.groups[index].data[i].row_number
        }
      }
      rowNumber++
      this.groups[index].data.push({
        row_number: rowNumber,
        delay: 5,
        users: []
      })
    },
    back () {
      this.router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>
