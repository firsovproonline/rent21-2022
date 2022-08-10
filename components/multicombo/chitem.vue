<template>
  <div>
    <div class="checkbox checkbox-dark m-squar">
      <input :id="'inline-sqr-'+index" type="checkbox" checked="">
      <label :for="'inline-sqr-'+index">{{item.name}}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "chitem",
  props:{
    item : null,
    index : null
  }
}
</script>

<style scoped>

</style>
