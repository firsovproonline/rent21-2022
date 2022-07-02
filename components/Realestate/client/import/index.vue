<template>
  <section class="container-fluid">
    <div class="row">
      <div class="card" style="padding: 12px">
        <div style="display: flex;align-items: center;">
          <div class="progress" style="flex: auto;">
            <div ref="progressLoad" class="progress-bar-animated bg-primary progress-bar-striped" role="progressbar" style="width: 0" >
            </div>
            <!--
            <div style="display: table;margin: 0 auto;margin-top: 6px">значение</div>
            -->
          </div>
          <div v-if="step === 0" class="btn-landing" @click="inportAddress">Начать</div>
        </div>
      </div>
    </div>
    <div class="row">
      <div v-if="step > 1" class="card" style="padding: 12px">
        <div style="display: flex">
          <div style="display: flex;align-items: center;">
            <div class="label">Адресов</div>
            <div>{{items.adres21.length}}</div>
          </div>
          <div class="progress" style="flex:1 0 auto;">
            <div ref="progress1" class="progress-bar-animated bg-primary progress-bar-striped" role="progressbar" style="width: 0" >
            </div>
          </div>
        </div>
        <div style="display: flex;margin-top: 12px">
          <div style="display: flex;align-items: center;">
            <div class="label">зданий</div>
            <div>{{items.build21.length}}</div>
          </div>
          <div class="progress" style="flex:1 0 auto;">
            <div ref="progress2" class="progress-bar-animated bg-primary progress-bar-striped" role="progressbar" style="width: 0" >
            </div>
          </div>
        </div>
        <div style="display: flex;margin-top: 12px">
          <div style="display: flex;align-items: center;">
            <div class="label">Помещений</div>
            <div>{{items.ob21.length}}</div>
          </div>
          <div class="progress" style="flex:1 0 auto;">
            <div ref="progress3" class="progress-bar-animated bg-primary progress-bar-striped" role="progressbar" style="width: 0" >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "indexImport",
  data: () => ({
    step: 0,
  }),
  watch:{
    'items.adres21'(val){
      let current = 0
      const total = parseFloat(val.length)
      this.$nextTick(()=>{
        val.forEach(item => {
          current++
          let percentCompleted = Math.floor(current / total * 100)
          if(this.$refs.progress1)
            this.$refs.progress1.style.width = percentCompleted +'%'
        })
      })
    }
  },
  computed:{
    items(){
      return this.$store.getters['realestate/importItems']
    }
  },
  methods:{
    processAdress(){

    },
    inportAddress(){
      this.step ++
      this.$refs.progressLoad.style.width = '0%'
      this.$api.get("/api/realestate/oldaddress",{
        onDownloadProgress: progressEvent => {
          const total = parseFloat(progressEvent.total)
          const current = progressEvent.loaded
          let percentCompleted = Math.floor(current / total * 100)
          this.$refs.progressLoad.style.width = percentCompleted +'%'
        }
      }).then(response => {
        /*
                const outOb = {
                  adres21: {},
                  build21: {},
                  ob21: {},
                  linc21: response.data.linc21
                }
                response.data.adres21.forEach(item => {
                  outOb.adres21[item.UID] = item;
                })
                response.data.build21.forEach(item => {
                  outOb.build21[item.UID] = item;
                })
                response.data.ob21.forEach(item => {
                  outOb.ob21[item.UID] = item;
                })
        */
        this.$store.dispatch('realestate/setimportItems', response.data)
        this.step ++
      })
    }
  }

}
</script>

<style scoped>
  .progress{
    height: 2rem;
    margin-left: 12px;
    margin-right: 12px;
  }

  .label{
    width: 90px;
    color: #0c0c3c;
  }
</style>
