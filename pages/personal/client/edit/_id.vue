<template>
  <div class="row">
    <div class="card">
      <div class="card-header">Редактирование клиента</div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-4 col-sm-12">
            <div class="card-social">
              <div class="social-header">Данные клиента</div>
              <div class="card-social">
                <div class="col">
                  <div class="mb-3" v-if="item.fields">
                    <ComboRent21 v-if="item.fields"
                                 title="Статус"
                                 :value="item.fields.STATUS"
                                 field="status"
                                 spr="clientStatus"
                    />
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3" v-if="item.fields">
                    <label class="form-label" for="TITLE">Наименование</label>
                    <input v-model="item.fields.TITLE" @change="imputChange()" class="form-control" id="TITLE" type="text" placeholder="наименование">
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3" v-if="item.fields">
                    <label class="form-label" for="FIO">Контактное лицо</label>
                    <input v-model="item.fields.FIO" @change="imputChange()" class="form-control" id="FIO" type="text" placeholder="наименование">
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3" v-if="item.fields">
                    <ul class="nav nav-tabs border-tab" id="top-tab" >
                      <li class="nav-item" @click="tab1active='phone'">
                        <a :class="tab1active==='phone' ?  'nav-link active':'nav-link'">
                          <i class="icofont icofont-ui-home"></i>
                          Телефон
                        </a>
                      </li>
                      <li class="nav-item" @click="tab1active='email'">
                        <a :class="tab1active==='email' ?  'nav-link active':'nav-link'" >
                          <i class="icofont icofont-man-in-glasses"></i>
                          Емаил
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" >
                          <i class="icofont icofont-contacts"></i>
                          Сайт
                        </a>
                      </li>
                    </ul>
                    <div v-if="item.fields">
                      <EditPhones :items="item.fields.TEL" v-if="tab1active==='phone'" />
                      <EditEmails :items="item.fields.KLEMAIL" v-if="tab1active==='email'"/>
                    </div>
                  </div>
                </div>


              </div>
            </div>

          </div>
          <div class="col-md-4 col-sm-12">
            <div class="card-social">
              <div class="social-header">Данные поиска</div>
              <div class="card-social">
                <ComboRent21 v-if="item.fields"
                  title="Операция"
                  :value="item.fields.OPP"
                  field="opp"
                  spr="clientOpp"
                />
                <ComboRent21 v-if="item.fields"
                  title="Помещение"
                  :value="item.fields.TIP"
                  field="tip"
                  spr="clientTip"
                />
                <div v-if="item.fields && flagYmap" class="input-h">
                  <div class="label">Город</div>
                  <input id="suggest" v-model="item.fields.GOROD" @change="imputChange()" class="form-control" type="text" placeholder="наименование">

                </div>
                <ul class="nav nav-tabs border-tab" >
                  <li class="nav-item" @click="tab2active='region'">
                    <a :class="tab2active==='region' ?  'nav-link active':'nav-link'">
                      <i class="icofont icofont-ui-home"></i>
                      Регион
                    </a>
                  </li>
                  <li class="nav-item" @click="tab2active='setings'">
                    <a :class="tab2active==='setings' ?  'nav-link active':'nav-link'" >
                      <i class="icofont icofont-man-in-glasses"></i>
                      Особенности
                    </a>
                  </li>
                </ul>
                <div v-if="tab2active==='region'">
                  <Multicombo v-if="item.fields"
                    title="Округ"
                    spr="clientRajon"
                    :value="item.fields.RAJON"
                    field = "RAJON"

                  />
                  <hr>
                  <Multicombo v-if="item.fields"
                              title="Район"
                              spr="clientOkrug"
                              :value="item.fields.OKRUG"
                              field = "OKRUG"
                  />
                  <hr>
                  <Multicombo v-if="item.fields"
                              title="Метро"
                              spr="clientRajon"
                              :value="item.fields.METRO"
                              field = "METRO"
                  />
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ComboRent21 from "~/components/combo";
import EditPhones from "~/components/Realestate/client/editphones";
import EditEmails from "~/components/Realestate/client/editemails";
import Multicombo from "~/components/multicombo";
export default {
  name: "index",
  components: {Multicombo, EditEmails, EditPhones, ComboRent21},
  layout: 'default',
  data: () => ({
    tab1active : 'phone',
    tab2active : 'region',
    flagYmap : false,
    suggestView: null,
    flagRefresh : false
  }),

  async asyncData ({ app, route, params, error, store }) {
    try {
      await store.dispatch('realestate/loadSpr')
    } catch (err) {
      console.log(err)
      return error({
        statusCode: 404,
        message: 'Категории не найдены или сервер не доступен'
      })
    }
  },
  computed:{
    item(){
      return this.$store.getters['realestate/item']
    },
    globalevent(){
      return this.$store.getters['main/globalevent']
    }
  },
  methods:{
    imputChange(){
      this.$nextTick(()=>{
        const ob = this.item
        this.$store.commit('realestate/setItem', ob);
      })
    },
    setRegion(){
      console.log('setRegion', this.item.fields.GOROD)
      const url = "//geocode-maps.yandex.ru/1.x/?apikey=fdb945b0-aaa5-4b5d-a837-383abb24dfc4&format=json&geocode=" + this.item.fields.GOROD;
      this.$axios.get(url).then(items=>{
        // console.log(items)
      })

    }
  },
  mounted() {
    this.$api.get('/api/lid?id='+this.$route.params.id).then(item=>{
      this.$store.dispatch('realestate/setItem',item.data)
    })
    window.ymaps.ready(()=>{
      this.flagYmap = true
    })

  },
  watch: {
    'item.fields.GOROD'(val){
      if(this.flagYmap){
        console.log(this.flagYmap, val);
      }
    },
    item(val){
      console.log('item', val)

      if(this.flagYmap){
        this.$nextTick(()=>{
          if(document.getElementById('suggest'))
          this.suggestView = new window.ymaps.SuggestView(document.getElementById('suggest'));
        })

      }
    },
    flagYmap(){
      if(this.item.fields){
        this.$nextTick(()=>{
            this.suggestView = new window.ymaps.SuggestView(document.getElementById('suggest'));
            this.setRegion()
        })
      }
    },
    globalevent(val) {
      const ob = this.item
      switch (val.operation){
        case 'deleteClientEmail':
          ob.fields.KLEMAIL.splice(val.value,1);
          break;
        case 'deleteClientPhone':
          ob.fields.TEL.splice(val.value,1);
          break;
        case 'insertClientEmail':
          ob.fields.KLEMAIL.push({typ:'Рабочий',val:''})
          break;
        case 'insertClientPhone':
          ob.fields.TEL.push({typ:'Рабочий',val:''})
          break;
        case 'setFieldItem':
          switch (val.field){
            case 'status':
              ob.fields.STATUS = val.value
              break
            case 'opp':
              ob.fields.OPP = val.value
              break
            case 'tip':
              ob.fields.TIP = val.value
              break
            case 'OKRUG':
            case 'RAJON':
              ob.fields[val.field] = val.value
              this.$store.dispatch('main/setVcomponent', {comp: null})
              break
            default:
              console.log('Нет поля' ,val)
              break
          }
          break
        default:
          break
      }
      this.$store.commit('realestate/setItem', ob);
      this.$nextTick(()=>{
        const temp = this.tab2active;
        this.tab2active = null
        this.$nextTick(()=>{
          this.tab2active = temp
        })
      })
    }
  }


}
</script>

<style scoped>
.border-tab.nav-tabs {
  margin-bottom: 10px;
}
.input-h{
  display: flex;
  align-items: center;
}

.input-h .label {
  border-radius: 2px;
  color: #0c5460;
  min-width: 140px;
  width: 140px;
}

.nav-tabs .nav-item {
  cursor: pointer;
}

.card .card-header {
  padding: 16px;
  background-color: #fff;
}

.card .card-body {
  padding: 16px;
  background-color: transparent;
}

.col{
  padding-left: 0px;
}
</style>
