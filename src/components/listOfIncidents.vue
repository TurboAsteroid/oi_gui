<template>
  <v-expansion-panel>
    <v-expansion-panel-content v-for="inc in incidents" :key="inc.id">
      <div slot="header">
        <h3><i class="material-icons" style="vertical-align: bottom" :style="{color: inc.color}">error</i> {{inc.name}}</h3><span style="font-size: 12px;">{{M(inc.datetime).format('MMMM Do YYYY, HH:mm:ss')}}</span>
      </div>
      <v-card>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs6>
              <v-textarea
                outline
                label="Описание инцидента"
                :value="inc.description"
                readonly
              ></v-textarea>
            </v-flex>
            <v-flex xs6>
              <v-expansion-panel>
                <v-expansion-panel-content v-for="gr in inc.groups" :key="gr.id">
                  <div slot="header">
                    <v-layout align-center justify-center row fill-height>
                      <v-flex xs2><v-badge :color="gr.complete"><span slot="badge">!</span><v-icon large :color="gr.complete">supervisor_account</v-icon></v-badge></v-flex>
                      <v-flex xs10>{{gr.name}}</v-flex>
                    </v-layout>
                  </div>
                  <v-card>
                    <v-card-text>
                      <v-layout align-center justify-center row fill-height v-for="row in gr.rows" v-bind:key="row.row_number">
                        <v-flex xs1><v-icon>people</v-icon></v-flex>
                        <v-flex xs11>
                          <v-chip v-for="user in row.users" :key="user.value" :color="user.status">{{user.text}}</v-chip>
                        </v-flex>
                      </v-layout>
                    </v-card-text>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-flex>
            <v-flex xs12 v-if="inc.files.length > 0">
              Файлы:
              <v-list>
                <template v-for="file in inc.files">
                  <v-list-tile :key="file.a">
                    <a :href="file.a">{{file.name}}</a>
                  </v-list-tile>
                </template>
              </v-list>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import moment from 'moment'
export default {
  name: 'listOfIncidents',
  data () {
    return {
      M: moment
    }
  },
  props: ['incidents']
}
</script>

<style scoped>

</style>
