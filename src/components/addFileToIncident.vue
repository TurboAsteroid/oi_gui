<template>
  <div>
    <v-flex xs12 d-flex>
      <v-btn @click="addFiles" color="primary" large><i class="material-icons">attach_file</i>&nbsp;Прикрепить файлы</v-btn>
    </v-flex>
    <input type="file" id="files" ref="files" multiple v-on:change="handleFilesUpload()" v-show="false"/>
    <v-flex xs12 d-flex><h3 class="text-sm-left">
      Подготовленные к отправке файлы:</h3>
    </v-flex>
    <v-flex xs12 d-flex>
      <div class="cont">
        <h3 v-if="files.length === 0">отсутствуют</h3>
        <div v-for="(file, key) in files" class="file" :key="key">{{ file.name }} <v-btn v-on:click="removeFile(key)" color="info">Удалить</v-btn></div>
      </div>
    </v-flex>
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
export default {
  name: 'addFileToIncident',
  props: ['insertedId'],
  data () {
    return {
      files: [],
      msg: {
        message: 'Файлы отправлены',
        alertStatus: false,
        color: 'success',
        y: 'top',
        x: null,
        mode: '',
        timeout: 9000
      }
    }
  },
  methods: {
    // прикрепляем файлы
    addFiles () {
      this.$refs.files.click()
    },
    // отправляем файлы на сервер
    submitFiles () {
      let formData = new FormData()
      for (var i = 0; i < this.files.length; i++) {
        formData.append('files', this.files[i])
      }
      axios.post(`${this.$config.api}/incident/attachFiles?insertedId=${this.insertedId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(() => {
          this.msg = {
            message: 'Файлы отправлены',
            alertStatus: true,
            color: 'success',
            y: 'bottom',
            x: null,
            mode: '',
            timeout: 5000
          }
          console.log('SUCCESS!!')
          this.files = []
        })
        .catch((e) => {
          this.msg = {
            message: 'Ошибка отправки файлов',
            alertStatus: true,
            color: 'error',
            y: 'bottom',
            x: null,
            mode: '',
            timeout: 5000
          }
          console.log(e)
        })
    },
    handleFilesUpload () {
      let uploadedFiles = this.$refs.files.files
      for (var i = 0; i < uploadedFiles.length; i++) {
        this.files.push(uploadedFiles[i])
      }
    },
    removeFile (key) {
      this.files.splice(key, 1)
    }
  },
  watch: {
    insertedId (val, oldVal) {
      if (val !== oldVal && val !== -1) {
        this.submitFiles()
      }
    }
  }
}
</script>
<style scoped>
  .cont {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }
  .file{
    /*border: rgba(0,0,0,0.6) solid 1px;*/
    border-radius: 5px;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.15);
    background-color: rgba(255,255,255,0.75);
    margin-right: 8px;
    margin-bottom: 8px;
    padding-left: 8px;
  }
</style>
