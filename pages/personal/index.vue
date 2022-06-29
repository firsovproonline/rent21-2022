<template>
  <section style="display: flex">
    <div class="leftMenu">
      <LeftMenu />
    </div>
    <div class="main-block" style="flex: 1 1 auto;">
      indexPersonal
    </div>
  </section>
</template>

<script>
import LeftMenu from "~/components/leftMenu";
export default {
  name: "indexPersonal",
  components: {LeftMenu},
  layout: 'default',
}
</script>

<style scoped>

</style>
