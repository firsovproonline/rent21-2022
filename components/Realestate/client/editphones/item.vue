<template>
  <div class="item">
    <input v-model="item.val" v-mask="'(###) ###-##-##'" class="form-control phone" type="text" placeholder="Телефон">
    <ComboRent21 v-if="item.typ"
                 title=""
                 :value="item.typ"
                 field="tempstatus"
                 spr="clientTipPhone"
                 style="flex: 1 1 auto; margin-left: 6px;margin-right: 6px"
    />
    <div class="upr">
      <div class="btn btn-pill btn-outline-primary-2x btn-air-primary" style="height: 24px;padding-top: 0px;padding-right: 4px;padding-left: 4px">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-list"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3" y2="6"></line><line x1="3" y1="12" x2="3" y2="12"></line><line x1="3" y1="18" x2="3" y2="18"></line></svg>
      </div>
    </div>
  </div>
</template>

<script>
import ComboRent21 from "~/components/combo";

export default {
  name: "item",
  components: {ComboRent21},
  props:{
    item: null
  },
  computed:{
    globalevent(){
      return this.$store.getters['main/globalevent']
    }
  },
  watch: {
    globalevent(val){
      switch (val.operation){
        case 'setFieldItem':
          this.item.typ = val.value
          break
        default:
          break
      }

    }
  }
}
</script>

<style scoped>
  .phone{
    width: 140px;
  }
  .upr{
    display: flex;
    justify-content: space-between;
    align-items: stretch;
  }
  .item{
    display: flex;
    justify-content: space-between;
    align-items: stretch;
  }
</style>
