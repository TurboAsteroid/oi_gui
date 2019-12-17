<template>
  <v-dialog
    v-model="dialog"
    max-width="290"
  >
    <v-card>
      <v-card-title class="headline">Внимание</v-card-title>
      <v-card-text>
        Группа будет безвозвратно удалена
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="green darken-1"
          flat="flat"
          @click="$emit('deleteEmit', false, group.id)"
        >
          Отмена
        </v-btn>
        <v-btn
          color="green darken-1"
          flat="flat"
          @click="$emit('deleteEmit', true, group.id)"
        >
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'delete',
  props: ['group', 'dialog']
}
</script>

<style scoped>

</style>
