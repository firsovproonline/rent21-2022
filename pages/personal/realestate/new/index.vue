<template>
  <section>
    <div class="row">
      <div class="col-lg-4 col-sm-6">
        <div class="card">
          <div class="title">Тип помещения</div>
          <ComboRent21
            title="Операция"
            :value="item.opp"
            field="opp"
            spr="room_operation"
          />
          <ComboRent21
            title="Тип помещения"
            :value="item.Category"
            field="Category"
            spr="category"
          />
        </div>
        <div class="card">
          <div class="title">Адрес</div>
          <div class="body">
            <input type="text" ref="suggest" />
            <div ref="map" class="map" style="width: 100%; height: 180px"></div>
          </div>
        </div>
        <div class="card">
          <div class="title">Здание</div>
        </div>
      </div>
      <div class="col-lg-4 col-sm-6">
        <div class="card">
          <div class="title">Собственик</div>
        </div>
      </div>
      <div class="col-lg-4 col-sm-6">
        <div class="card">
          <div class="title">Помещение</div>
        </div>
      </div>

    </div>
  </section>
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
  mounted() {
    window.ymaps.ready(()=>{
      const myMap = new window.ymaps.Map(this.$refs.map, {
        center: [55.76, 37.64],
        zoom: 7
      });
      myMap.events.add('actionend',(e)=>{
        // отработка позиции карты
        // console.log(this, e.originalEvent.map.getCenter())
        const v = e.originalEvent.map.getCenter();
        const url = "//geocode-maps.yandex.ru/1.x/?apikey=fdb945b0-aaa5-4b5d-a837-383abb24dfc4&geocode=" + v[0] + "," + v[1] + "&kind=metro&format=json&spn=0.04,0.04";
        const url1 = "//geocode-maps.yandex.ru/1.x/?apikey=fdb945b0-aaa5-4b5d-a837-383abb24dfc4&geocode=" + v[1] + "," + v[0] + "&format=json"; //&rspn=1&spn=0.03,0.03";
        this.$axios.get(url1).then(items=>{
          items.data.response.GeoObjectCollection.featureMember.forEach(yitem =>{
            if(yitem.GeoObject.metaDataProperty.GeocoderMetaData.kind=='house'){
              const filterOb = {};
              yitem.GeoObject.metaDataProperty.GeocoderMetaData.Address.Components.forEach(item=>{
                filterOb[item.kind] = item.name
              })
              // запрос на получение данных из базы адресов
              this.$axios.post('/api/realestate/rent21address',{
                locality: filterOb.locality,
                street: filterOb.street,
                house: filterOb.house
              }).then(response=>{
                if(response.data.length >0){

                }else{
                  console.log('нет данного адреса в базе')
                }
              })
            }
          })
        })
      })
      const suggestView = new ymaps.SuggestView(this.$refs.suggest);
      suggestView.state.findMap = myMap;
      suggestView.state.events.add('change',(e)=>{
        const activeIndex = suggestView.state.get('activeIndex');
        if (typeof activeIndex == 'number') {
          const activeItem = suggestView.state.get('items')[activeIndex];
          const myGeocoder = ymaps.geocode(activeItem.value);
          myGeocoder.then(
            function(res) {
              const v = res.geoObjects.get(0).geometry.getCoordinates();
              e.originalEvent.target.findMap.setCenter(v, 16);
            },
            function(err) {
              console.log('Ошибка карты');
            }
          );
        }
      })
    });
    const ob = this.$store.getters['realestate/spr'].cianItems['rent']['officeRent']
    ob.opp = 1
    this.$store.commit('realestate/setItem', ob);
  },
  computed:{
    item(){
      return this.$store.getters['realestate/item']
    },
    globalevent(){
      return this.$store.getters['main/globalevent']
    }
  },
  watch:{
    globalevent(val){
      switch (val.operation){
        case 'setFieldItem':
          switch (val.field){
            case 'Category':
              const ob = this.$store.getters['realestate/spr'].cianItems['rent'][val.value]
              ob.opp = 1
              this.$store.commit('realestate/setItem', ob);
              break
            default:
              break
          }
          break
        default:
          break
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.card{
  padding: 8px;
  margin-bottom: 8px;
  .body{
    input[type="text"]{
      margin-bottom: 8px;
      width: 100%;
      border: none;
      border-bottom: 1px dotted;
    }
  }
}
.title{
  margin-bottom: 8px;
  width: 100%;
  padding: 6px;
  background-color: #f5f7fb;
  text-align: center;
}
</style>
