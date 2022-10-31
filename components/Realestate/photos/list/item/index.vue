<template>
  <div class="fotoBox" :style="'background-image: url('+src+')'" :title="value.TITLE">
    <div style="display: flex;justify-content: flex-end;margin-top: 6px">
      <div class="button-icon" >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-maximize"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
      </div>
      <div class="button-icon" >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "item",
  props:{
    src: null,
    value: {}
  }
}
</script>

<style scoped>
.button-icon{
  margin-right: 6px;
}
.fotoBox {
  margin: 8px;
  -webkit-box-shadow: 7px 7px 5px 0px rgb(50 50 50 / 75%);
  -moz-box-shadow: 7px 7px 5px 0px rgba(50, 50, 50, 0.75);
  box-shadow: 7px 7px 5px 0px rgb(50 50 50 / 75%);
  width: 140px;
  height: 80px;
  background-repeat:no-repeat;
  background-position: center center;
  cursor: pointer;
}
</style>
