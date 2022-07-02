<template>
  <div>
    <section v-if="total">
      <div class="card">
        <section v-for="item in listItem" :key="item.uid">
          <item :item="item" />
        </section>
      </div>
      <paginator />
    </section>
  </div>
</template>

<script>
import Item from "~/components/Realestate/client/list/item";
import Paginator from "~/components/Realestate/paginator";
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
    this.$api.post("/api/realestate/lids",{page:this.$route.params.id}).then(response => {
      this.$store.commit('realestate/setItems', response.data.rows)
      this.$store.commit('realestate/setTotal', response.data.total)
    })
  }
}
</script>

<style scoped>

</style>
