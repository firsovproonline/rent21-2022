<template>
  <div class="main">
    <Item v-for="(ob,index) in list" :key="index" :value="ob"/>
  </div>
</template>

<script>
import Item from "~/components/Realestate/owner/list/item";
export default {
  name: "ownerList",
  components: {Item},
  props: {
    list: []
  }
}
</script>

<style lang="scss" scoped>

</style>
