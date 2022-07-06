<template>
  <div class="col-xl-12" style="padding: 0 0 0 0">
    <div class="card">
      <div class="product-box">
        <div class="product-details">
          <div>{{item.title}}</div>
          <a href="product-page.html" data-bs-original-title="" title="">
            <h4>{{item.fio}}</h4>
          </a>
          <p>{{item.gorod}}</p>
          <GuideLabel class="guideLabel" :items="guideItems.Realestate_client_opp" :value="item.opp" />
          <div class="product-price">
            <GuideLabel class="guideLabel" :items="guideItems.Realestate_client_status" :value="item.status" />
            <del>$35.00</del>
          </div>
        </div>
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
  }
}
</script>

<style scoped>
.m-b-50{
  margin: 20px;
  border-bottom: 1px solid;
}
</style>
