<template>
  <div class="main">
    <div style="display: flex">
      <div style="flex: 1 auto">{{value.FIRSTNAME}} {{value.LASTNAME}}</div>
      <div style="display: flex">
        <div class="button-icon" >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-save"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
        </div>
        <div class="button-icon" style="color: red">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-repeat"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>
        </div>
      </div>

    </div>

    <PhoneList :value="value.PHONES"/>
  </div>
</template>

<script>
import PhoneList from "~/components/Realestate/contact/list/phoneList";
export default {
  name: "contactList",
  components: {PhoneList},
  props:{
    value: {}
  },
  mounted() {
    console.log(this.value)
  }
}
</script>

<style lang="scss" scoped>

</style>
