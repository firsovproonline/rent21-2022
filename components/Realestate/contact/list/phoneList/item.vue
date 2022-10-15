<template>
  <div class="main">
    <div v-if="flagEdit" style="display: flex;flex: 1 auto">
      <div><input class="inputEdit" style="width: 110px" type="text" v-model="value.NAME"/></div>
      <div style="flex: 1 auto"><input class="inputEdit" style="width: 100%" type="text" v-model="value.REM"/></div>
    </div>
    <div v-else style="display: flex;flex: 1 auto">
      <div>{{value.NAME}}</div>
      <div style="flex: 1 auto">{{value.REM}}</div>
    </div>

    <div style="display: flex;margin-left: 4px">
      <div v-if="!flagEdit" class="button-icon" @click="flagEdit = true">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
      </div>
      <div v-else class="button-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-save"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
      </div>
      <div v-if="flagDelete && !flagEdit" class="button-icon" style="color: red" @click="clickDelete">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
      </div>
      <div v-if="flagEdit" class="button-icon" style="color: red">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-repeat"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "item",
  props:{
    value: {},
    index: null,
    flagDelete: false
  },
  data: () => ({
    flagEdit: false
  }),
  methods:{
    clickDelete(){
      this.$parent.$emit('deleteitem', this.index)
    }
  },
  mounted() {
    if(this.value.flagEdit){
      this.flagEdit = true
    }
  }
}
</script>

<style lang="scss" scoped>
  .main{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .button-icon{
      cursor: pointer;
    }
  }
</style>
