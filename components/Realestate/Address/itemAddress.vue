<template>
  <section>
    <div class="col-xl-12" style="padding: 0 0 0 0">
      <div class="card bg-client">
        <div class="media">
          <h4 v-if="item[0]">{{item[0].build.NAME}}</h4>
          <div class="btn btn-pill btn-outline-primary-2x btn-air-primary" style="height: 38px; margin-right: 8px;padding-right: 6px;padding-left: 6px">
            <a :href="'/personal/client/edit/'+item.uid" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-list"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3" y2="6"></line><line x1="3" y1="12" x2="3" y2="12"></line><line x1="3" y1="18" x2="3" y2="18"></line></svg>
            </a>
          </div>
        </div>
        <div class="row" style="padding: 12px;justify-content: space-evenly;">
          <div class="product-details col-md-4">
            <div v-if="item[0]">
              <Labelfromfield label="Город" :value="item[0].address.GOROD" />
              <Labelfromfield label="Метро" :value="item[0].address.METRO" />
              <Labelfromfield label="Улица" :value="item[0].address.ULITCA" />
              <Labelfromfield label="Округ" :value="item[0].address.OKRUG" />
              <Labelfromfield label="Район" :value="item[0].address.RAJON" />

              <Labelfromfield label="Тип здания" :value="item[0].build.TIPZD" />
              <Labelfromfield label="Этажность" :value="item[0].build.ETAGALL" />
              <Labelfromfield label="Класс" :value="item[0].build.KLASS" />
            </div>
          </div>
          <div class="col-md-6 col-sm-6" style="flex: auto">
            <ListRoom :items="item"/>
          </div>
        </div>
      </div>
    </div>



  </section>
</template>

<script>
import ItemHouse from "~/components/Realestate/Address/itemHouse";
import Labelfromfield from "~/components/labelfromfield";
import ListRoom from "~/components/Realestate/room/list";
export default {
  name: "itemAddress",
  components: {ListRoom, Labelfromfield, ItemHouse},
  props:{
    item: {}
  },
  data () {
    return {
      showInfo: false
    }
  },
  methods:{
    showInfoclick() {
      this.showInfo = true;
    }
  }
}
</script>

<style scoped>
.m-b-50{
  margin: 20px;
  border-bottom: 1px solid;
}

.media {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 8px;
  background-color: rgb(22 142 234 / 19%) ;
}

.product-wrapper-grid.list-view .product-box {
  align-items: flex-start;
}

.bg-client{
  background-image: url("/bg/bgrealestate2.jpg");
  background-size: cover;
  background-position: center center;
  -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);

}
.col-md-4{
  background-color: #f3f4fbd6;
  -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  margin: 6px;
  min-height: 220px;
  padding-top: 12px;
}

.col-md-6{
  padding-top: 12px;
  background-color: #f3f4fbd6;
  -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  margin: 6px;
  min-height: 220px;
}

@media (min-width: 768px){
  .col-md-4 {
    -ms-flex: 0 0 31%;
    flex: 0 0 31%;
    max-width: 31%;
  }
  .col-md-6 {
    -ms-flex: 0 0 61%;
    flex: 0 0 61%;
    max-width: 61%;
  }

}
</style>
