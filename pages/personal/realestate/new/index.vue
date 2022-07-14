<template>
  <section>
    <div class="row">
      <div class="col-lg-4 col-sm-6">
        <ComboRent21
          title="Операция"
          :value="item.opp"
          field="opp"
          spr="room_operation"
        />
      </div>
      <div class="col-lg-4 col-sm-6">
        <ComboRent21
          title="Тип помещения"
          :value="item.Category"
          field="Category"
          spr="category"
        />
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

<style scoped>

</style>
