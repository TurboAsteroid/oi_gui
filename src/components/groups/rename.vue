<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialogLocal" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-text-field label="Имя группы*" required v-model="name"></v-text-field>
          <small>*поля обязательные для заполнения</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="$emit('rename', false, name, group.id)">Отмена</v-btn>
          <v-btn color="blue darken-1" flat @click="$emit('rename', true, name, group.id)" :disabled="name === ''">Сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: 'rename',
  props: ['dialog', 'group'],
  data () {
    return {
      name: this.group.name
    }
  },
  computed: {
    dialogLocal () {
      return this.dialog
    }
  }
}
</script>

<style scoped>

</style>
