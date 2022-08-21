<template>
  <div class="card bg-client">
    <div class="media">
      id page
    </div>
    <div class="row" style="padding: 12px;justify-content: space-evenly;margin-left: 1px;margin-right: 1px">
      <div class="product-details col-main">
        <div style="display: flex">
          <div class="col-md-30">
            <div v-if="item.address" style="width: 100%">
              <Labelfromfield label="Город" :value="item.address.GOROD" />
              <Labelfromfield label="Метро" :value="item.address.METRO" />
              <Labelfromfield label="Улица" :value="item.address.ULITCA" />
              <Labelfromfield label="Округ" :value="item.address.OKRUG" />
              <Labelfromfield label="Район" :value="item.address.RAJON" />

              <Labelfromfield label="Тип здания" :value="item.build.TIPZD" />
              <Labelfromfield label="Этажность" :value="item.build.ETAGALL" />
              <Labelfromfield label="Класс" :value="item.build.KLASS" />
            </div>
          </div>
          <div class="col-md-70" style="flex: auto">
            <Tabs />
            <ComboRent21 v-if="item.ob"
                         title="Операция"
                         :value="item.ob.OPP"
                         field="opp"
                         spr="opp"
            />
            <ComboRent21 v-if="item.ob"
                         title="Вид недвижимости"
                         :value="propertytype"
                         field="propertytype"
                         spr="propertytype"
            />
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

export default {
  name: "index",
  components: {Tabs, ComboRent21, Labelfromfield},
  layout: 'default',
  data: () => ({
    propertytype: '',
  }),
  computed: {
    item() {
      return this.$store.getters['realestate/item']
    },
  },
  mounted() {
    this.$store.dispatch('realestate/loadSpr')
    this.$api.get('/api/realestate/room?id='+this.$route.params.id).then(item=>{
      this.$store.dispatch('realestate/setItem',item.data.row)
    })

  }
}
</script>

<style scoped>
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
</style>
