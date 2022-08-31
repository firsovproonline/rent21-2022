<template>
  <div class="card bg-client">
    <div class="media">
      id page
    </div>
    <div v-if="showFlag" class="row" style="padding: 12px;justify-content: space-evenly;margin-left: 1px;margin-right: 1px">
      <div class="product-details col-main">
        <div style="display: flex">
          <div class="col-md-30" style="max-width: 280px">
            <div v-if="item.address" style="width: 100%">
              <Labelfromfield label="Город" :value="item.address.GOROD" />
              <Labelfromfield label="Метро" :value="item.address.METRO" />
              <Labelfromfield label="Улица" :value="item.address.ULITCA" />
              <Labelfromfield label="Округ" :value="item.address.OKRUG" />
              <Labelfromfield label="Район" :value="item.address.RAJON" />
              <hr/>
              <Building />
              <Labelfromfield label="Тип здания" :value="item.build.TIPZD" />
              <Labelfromfield label="Этажность" :value="item.build.ETAGALL" />
              <Labelfromfield label="Класс" :value="item.build.KLASS" />
            </div>
          </div>
          <div v-if="showFlag" class="col-md-70" style="flex: auto">
            <Tabs activeTab="tab1" >
              <template  #tab1 >
                <div title="основные поля" style="padding-top: 12px">
                  <ComboRent21 v-if="item.ob"
                               title="Вид недвижимости"
                               :value="item.ob.propertytype"
                               field="propertytype"
                               spr="propertytype"
                               style="width: 300px"
                  />
                  <ComboRent21 v-if="item.ob"
                               title="Операция"
                               :value="item.ob.OPP"
                               field="OPP"
                               spr="opp"
                               style="width: 300px"
                  />
                  <ComboRent21 v-if="item.ob && item.ob.OPP === 'Аренда' && item.ob.propertytype === 'Коммерческая'"
                               title="Тип"
                               :value="item.ob.cian && item.ob.cian.Category? item.ob.cian.Category : ''"
                               field="Category"
                               spr="rentCommercial"

                  />
                  <div v-if="item.ob && item.ob.cian &&  typeof (item.ob.cian.FloorNumber) !== 'undefined' " class="field-div" >
                    <label for="FloorNumber">Этаж</label>
                    <input v-model="item.ob.cian.FloorNumber"
                           id="FloorNumber"
                           class="form-control"
                           type="text"
                           placeholder=""
                           style="margin-left: 12px;width: 50px">
                  </div>
                  <div v-if="item.ob && item.ob.cian && item.ob.cian.Category && item.ob.cian.Category != 'officeRent11'">
                    <TotalArea
                      v-if="item.ob && item.ob.cian &&  typeof (item.ob.cian.TotalArea) !== 'undefined'"
                      :item="item"
                    >
                    </TotalArea>
                  </div>
                  <div v-if="item.ob && item.ob.cian && typeof(item.ob.cian.TaxNumber) !== 'undefined'" class="div-input">
                    <label for="FloorNumber" class="labelInput">Номер налоговой</label>
                    <input v-model="item.ob.cian.TaxNumber"
                           id="TaxNumber"
                           class="form-control"
                           type="text"
                           placeholder=""
                           style="width: 90px">
                  </div>
                  <div v-if="item.ob && item.ob.cian && typeof(item.ob.cian.IsLegalAddressProvided) !== 'undefined'" class="div-input">
                    <label class="labelInput">Юридический адрес</label>
                    <div class="checkdiv">
                      <label class="container">
                        <input type="checkbox" v-model="item.ob.cian.IsLegalAddressProvided">
                        <span class="checkmark" style="margin-top: -8px" ></span>
                      </label>
                    </div>
                  </div>

                  <div v-if="item.ob && item.ob.cian && item.ob.cian.Building && typeof(item.ob.cian.Building.CeilingHeight) !== 'undefined'" class="div-input">
                    <label for="CeilingHeight" class="labelInput">Высота потолков, м</label>
                    <input v-model="item.ob.cian.Building.CeilingHeight"
                           id="CeilingHeight"
                           class="form-control"
                           type="text"
                           placeholder=""
                           style="width: 50px">
                  </div>

                  <div v-if="item.ob && item.ob.cian && typeof(item.ob.cian.IsOccupied) !== 'undefined'" class="div-input">
                    <label class="labelInput">Помещение занято</label>
                    <div class="checkdiv">
                      <label class="container">
                        <input type="checkbox" v-model="item.ob.cian.IsOccupied">
                        <span class="checkmark" style="margin-top: -8px" ></span>
                      </label>
                    </div>
                  </div>

                  <ComboNoSpr v-if="item.ob && item.ob.cian && typeof(item.ob.cian.Layout) !== 'undefined'"
                              title="Планировка"
                              :value="item.ob.cian.Layout"
                              :change="LayoutChange"
                              style="width: 290px"
                              labelWidth="155px"
                  >
                    <option value="cabinet">Кабинетная</option>
                    <option value="corridorplan">Коридорная</option>
                    <option value="mixed">Смешанная</option>
                    <option value="openSpace">Открытая</option>
                  </ComboNoSpr>

                  <ComboNoSpr v-if="item.ob && item.ob.cian && typeof(item.ob.cian.WaterPipesCount) !== 'undefined'"
                              title="Кол-во мокрых точек"
                              :value="item.ob.cian.WaterPipesCount"
                              :change="WaterPipesCountChange"
                              style="width: 290px"
                              labelWidth="155px"
                  >
                    <option value="0">Нет</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </ComboNoSpr>

                  <ComboNoSpr v-if="item.ob && item.ob.cian && typeof(item.ob.cian.ConditionType) !== 'undefined'"
                              title="Состояние"
                              :value="item.ob.cian.ConditionType"
                              :change="ConditionTypeChange"
                              style="width: 410px"
                              labelWidth="155px"
                  >
                    <option value="cosmeticRepairsRequired">Требуется косметический ремонт</option>
                    <option value="finishing">Под чистовую отделку</option>
                    <option value="majorRepairsRequired">Требуется капитальный ремонт</option>
                    <option value="office">Офисная отделка</option>
                  </ComboNoSpr>

                  <ComboNoSpr v-if="item.ob && item.ob.cian && typeof(item.ob.cian.FurniturePresence) !== 'undefined'"
                              title="Мебель"
                              :value="item.ob.cian.FurniturePresence"
                              :change="FurniturePresenceChange"
                              style="width: 210px"
                              labelWidth="155px"
                  >
                    <option value="no">Нет</option>
                    <option value="yes">Есть</option>
                  </ComboNoSpr>


                </div>
              </template>
              <template #tab2 >
                <div title="Фото">
                  <div style="display: flex;flex-wrap: wrap;">
                    <div v-for="(item,index) in obfoto" :key="index" style="margin: 4px">
                      <img :src="'/api/foto/get?id='+item.ID" />
                    </div>

                  </div>
                </div>
              </template>
              <template #tab3 >
                <div title="Экспорт">Экспорт</div>
              </template>
              <template #tab4 >
                <div title="Витрина">Витрина</div>
              </template>
              <template #tab5 >
                <div title="Показы">Показы</div>
              </template>
            </Tabs>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ComboRent21 from "~/components/combo";
import Labelfromfield from "~/components/labelfromfield";
import Tabs from "~/components/tabs";
import AreaParts from "~/components/cian/officeRent/AreaParts";
import Building from "~/components/cian/Building";
import TotalArea from "~/components/cian/officeRent/TotalArea";
import ComboNoSpr from "~/components/comboNotSpr";

export default {
  name: "index",
  components: {ComboNoSpr, TotalArea, Building, AreaParts, Tabs, ComboRent21, Labelfromfield},
  layout: 'default',
  data: () => ({
    propertytype: '',
    showFlag: true
  }),
  computed: {
    item() {
      return this.$store.getters['realestate/item']
    },
    obfoto() {
      return this.$store.getters['realestate/obfoto']
    },
    globalevent(){
      return this.$store.getters['main/globalevent']
    }
  },
  watch:{
    item(val){
      console.log('item', val)
      this.showFlag = false
      this.$nextTick(()=>{
        this.showFlag = true
      })

    },

    globalevent(val){
      let ob = {};
      switch (val.operation){
        case 'setFieldItem':
          switch (val.field){
            case 'propertytype':
            case 'OPP':
              this.item.ob[val.field] = val.value
              this.$store.commit('realestate/setItem', this.item);
              break
            case 'Category':
              // поменялся ключевой параметр - скачиваем структуру обьекта
              this.item.ob.cian = this.$store.getters['realestate/spr']['cianItems']['rent'][val.value]
              this.item.ob.cian[val.field] = val.value
              this.$store.commit('realestate/setItem', this.item);

              this.showFlag = false
              this.$nextTick(()=>{
                this.showFlag = true
              })
              break
            default:
              console.log('not field', val.field)
              break
          }
          break
        default:
          console.log('not operation', val.operation)
          break
      }
    }
  },
  methods:{
    FurniturePresenceChange(val){
      this.item.ob.cian.FurniturePresence = val
    },
    ConditionTypeChange(val){
      this.item.ob.cian.ConditionType = val
    },
    WaterPipesCountChange(val){
      this.item.ob.cian.WaterPipesCount = val
    },
    LayoutChange(val){
      this.item.ob.cian.Layout = val
    }
  },
  mounted() {
    this.$store.dispatch('realestate/loadSpr')
    this.$api.get('/api/realestate/room?id='+this.$route.params.id).then(item=>{
      this.$store.dispatch('realestate/setItem',item.data.row)
    })

    this.$api.get('/api/foto/list?id='+this.$route.params.id).then(item=>{
      this.$store.dispatch('realestate/setobfoto',item.data.row)
    })

    let user = JSON.parse(window.localStorage.getItem('user'))
    let atoken = ''
    if (user && user.accessToken) {
      // for Node.js Express back-end
      atoken =  user.accessToken
    } else {
      atoken =  ''
    }
/*
    this.socket = this.$nuxtSocket({
      channel: '/',
      extraHeaders: {token:atoken}
    })
 */
  }
}
</script>

<style scoped>
  .div-input{
    display: flex;
    align-items: center;
    margin-top: 4px;
  }
  .labelInput{
    font-weight: normal;
    width: 154px !important;
  }

  .div-input label{
    font-weight: normal;
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
    background-color: #ffffff;
  }

  .container:hover input ~ .checkmark {
    background-color: #ffffff;
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

  .bg-client{
    background-image: url("/bg/bgrealestate2.jpg");
    background-size: cover;
    background-position: center center;
    -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
    box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
    min-height: 600px;
  }
  .media {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 8px;
    background-color: rgb(22 142 234 / 19%) ;

  }
  .col-main{
    background-color: #f3f4fbd6;
    -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
    box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  }

  .col-md-30{
    border-right: 1px solid #0c0c3c;
    width: 30%;
    min-width: 290px;
    padding: 8px;
  }

  .col-md-70{
    width: 70%;
    min-width: 290px;
    padding: 8px;
    padding-right: 0px;
  }

  .field-div{
    display: flex;
    align-items: center;
  }
  .field-div label{
    width: 140px;
    font-weight: normal;
  }
</style>
