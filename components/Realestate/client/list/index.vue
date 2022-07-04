<template>
  <div>
    <section v-if="total">
      <div class="row">
        <div class="col-md-12">
          <div class="media">

            <div class="form-group d-flex mb-0" style="flex: 1">
              <i class="fa fa-search"></i>
              <input class="form-control-plaintext" type="text" placeholder="телефон, имя, заголовок..." style="margin-left: 12px">
            </div>
            <div class="btn btn-pill btn-outline-primary-2x btn-air-primary" style="height: 38px; margin-right: 8px;padding-right: 6px;padding-left: 6px">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-list"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3" y2="6"></line><line x1="3" y1="12" x2="3" y2="12"></line><line x1="3" y1="18" x2="3" y2="18"></line></svg>
            </div>
            <div class="btn btn-pill btn-outline-primary-2x btn-air-primary" style="height: 38px; padding-right: 6px;padding-left: 6px">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-grid"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            </div>
            <div class="btn btn-pill btn-outline-primary-2x btn-air-primary" style="display: flex;margin-left: 12px">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
              <div>Добавить</div>
            </div>
          </div>
        </div>
      </div>
      <paginator />
        <div class="product-wrapper-grid list-view" style="opacity: 1;">
          <div class="row">
            <section v-for="item in listItem" :key="item.uid">
              <item :item="item" />
            </section>
          </div>
        </div>
      <paginator />
    </section>
  </div>
</template>

<script>
import Item from "~/components/Realestate/client/list/item";
import Paginator from "~/components/Realestate/paginator";
import axios from "axios";
export default {
  name: "listClient",
  components: {Paginator, Item},
  computed: {
    listItem () {
      return this.$store.getters['realestate/items']
    },
    total () {
      return this.$store.getters['realestate/total']
    }

  },
  mounted() {
    this.$api.get("/api/realestate/spr").then(response => {
      this.$store.commit('realestate/setSpr', response.data)
      this.$api.post("/api/realestate/lids",{page:this.$route.params.id}).then(response => {
        this.$store.commit('realestate/setItems', response.data.rows)
        this.$store.commit('realestate/setTotal', response.data.total)
      })
    })
  }
}
</script>

<style scoped>
.media {
  background: white;
  margin-bottom: 20px;
  padding: 12px;
  align-items: center;
}
</style>
