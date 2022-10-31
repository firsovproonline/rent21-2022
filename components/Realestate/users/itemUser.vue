<template>
  <section>
    <div class="row">
        <div class="col-sm-12 card" style="display: flex;flex-direction: row;padding: 12px">
          <div>
            <a class="setting-primary" href="javascript:void(0)" @click="clickFile" style="position: absolute;left: 100px">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-settings">
                <circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            </a>
            <img ref="img" class="img-90 rounded-circle" :src="'/api/user/photo?id='+item.id" style="height: 90px;" />
          </div>
          <div class="div-access" style="margin-left: 38px;min-width: 280px">
            <div class="title">Данные</div>
            <div>
              {{item.username}}
              {{item.roles}}
            </div>
          </div>
          <div class="div-access">
            <div class="title">Доступ</div>
            <div>
              <label  class="container">Пользователи
                <input type="checkbox" >
                <span class="checkmark" ></span>
              </label>
              <label  class="container">Собственники
                <input type="checkbox" >
                <span class="checkmark" ></span>
              </label>
              <label  class="container">Обьекты
                <input type="checkbox" >
                <span class="checkmark" ></span>
              </label>
              <label  class="container">Клиенты
                <input type="checkbox" >
                <span class="checkmark" ></span>
              </label>
              <label  class="container">Экспорт
                <input type="checkbox" >
                <span class="checkmark" ></span>
              </label>
              <label  class="container">Настройки
                <input type="checkbox" >
                <span class="checkmark" ></span>
              </label>


            </div>
          </div>
        </div>
      <input type="file" id="file" ref="file" v-on:change="handleFileUpload()" style="display: none"/>
    </div>
  </section>
</template>

<script>
export default {
  name: "itemUser",
  props:{
    item: {}
  },
  data(){
    return {
      file: ''
    }
  },
  methods:{
    clickFile(){
      this.$refs.file.click()
    },
    handleFileUpload(){
      this.file = this.$refs.file.files[0]
      let formData = new FormData()
      formData.append('file', this.file)
      this.$api.post('/api/user/photo',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'iduser': this.item.id
          }
        }).then(data=>{
          this.$refs.img.src = this.$refs.img.src+'&t=1'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .div-access{
    margin-left: 12px;
    .title{
      border-bottom: 1px solid;
      padding: 4px;
      width: 100%;
      margin-bottom: 12px !important;
    }
  }

  .container {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 14px;
    user-select: none;
  }

  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #6c757d;
  }

  .container:hover input ~ .checkmark {
    background-color: #6c757d;
  }

  .container input:checked ~ .checkmark {
    background-color: #2196F3;
  }

  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  .container input:checked ~ .checkmark:after {
    display: block;
  }

  .container .checkmark:after {
    left: 9px;
    top: 5px;
    width: 8px;
    height: 8px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  .landing-wrraper .title {
    margin-bottom: 0px;
    font-weight: normal;
  }

  label{
    font-weight: normal;
  }


</style>
