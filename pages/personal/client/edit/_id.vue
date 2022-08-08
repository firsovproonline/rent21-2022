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
                      <li class="nav-item"><a class="nav-link active"><i class="icofont icofont-ui-home"></i>Телефон</a></li>
                      <li class="nav-item"><a class="nav-link" ><i class="icofont icofont-man-in-glasses"></i>Емаил</a></li>
                      <li class="nav-item"><a class="nav-link" ><i class="icofont icofont-contacts"></i>Сайт</a></li>
                    </ul>
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
export default {
  name: "index",
  components: {ComboRent21},
  layout: 'default',
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
    }
  },
  mounted() {
    this.$api.get('/api/lid?id='+this.$route.params.id).then(item=>{
      this.$store.dispatch('realestate/setItem',item.data)
    })
  },
  watch: {
    globalevent(val) {
      const ob = this.item
      switch (val.operation){
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
            default:
              break
          }
          break
        default:
          break
      }
      this.$store.commit('realestate/setItem', ob);
    }
  }


}
</script>

<style scoped>
.card .card-header {
  padding: 16px;
  background-color: #fff;
}

.card .card-body {
  padding: 16px;
  background-color: transparent;
}
</style>
