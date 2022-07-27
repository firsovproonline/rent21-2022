<template>
  <section>
    <div class="row">
      <div class="col-sm-12 card">
        {{item.username}}
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "itemUser",
  props:{
    item: {}
  },
}
</script>

<style scoped>

</style>
