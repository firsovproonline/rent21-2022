<template>
  <div style="display: flex">
    <GuideLabel class="collapsed guideLabel" :items="guideItems.room_tip" :value="item.tip"/>
    <GuideLabel class="guideLabel" :items="guideItems.room_operation" :value="item.operation"/>
  </div>
</template>

<script>
import GuideLabel from "~/components/Realestate/guideLabel";
export default {
  name: "itemRoom",
  components: {GuideLabel},
  props:{
    item: {}
  },
  computed: {
    guideItems () {
      return this.$store.getters['realestate/spr']
    }
  }
}
</script>

<style scoped>
  .guideLabel {
    margin-left: 12px;
    border-bottom: 1px dotted;
  }
</style>
