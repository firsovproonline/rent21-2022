<template>
  <div class="col-xl-12" style="padding: 0 0 0 0">
    <div class="card bg-client">
      <div class="media">
        <div class="btn btn-pill btn-outline-primary-2x btn-air-primary" style="height: 38px; margin-right: 8px;padding-right: 6px;padding-left: 6px">
          <a :href="'/personal/client/edit/'+item.uid" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-list"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3" y2="6"></line><line x1="3" y1="12" x2="3" y2="12"></line><line x1="3" y1="18" x2="3" y2="18"></line></svg>
          </a>
        </div>
      </div>
      <div class="row" style="padding: 12px;justify-content: space-evenly;">
        <div class="product-details col-md-4">
          <div>{{item.fields.OPP}} {{item.fields.TIP}} {{item.fields.PL1}} {{item.fields.PLIN}} {{item.fields.PLOUT}}</div>
          <div>{{item.fields.TITLE}}</div>
          <a :href="'/personal/client/edit/'+item.uid" >
            <h4>{{item.fields.FIO}}</h4>
          </a>
          <p>{{item.fields.GOROD}}</p>
<!--
          <GuideLabel class="guideLabel" :items="guideItems.Realestate_client_opp" :value="item.opp" />
-->
          <div class="product-price">
<!--
            <GuideLabel class="guideLabel" :items="guideItems.Realestate_client_status" :value="item.status" />
-->
            <del>{{item.fields.STATUS}}</del>
          </div>
        </div>
        <div class="col-md-4 col-sm-12">Предложения</div>
        <div class="col-md-4 col-sm-12">Показы</div>
      </div>
    </div>
  </div>
</template>

<script>
import GuideLabel from "~/components/Realestate/guideLabel";
export default {
  name: "item",
  components: {GuideLabel},
  props:{
    item: {}
  },
  computed:{
    guideItems () {
      return this.$store.getters['realestate/spr']
    }
  },
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
  justify-content: flex-end;
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
}

@media (min-width: 768px){
  .col-md-4 {
    -ms-flex: 0 0 31%;
    flex: 0 0 31%;
    max-width: 31%;
  }

}
</style>
