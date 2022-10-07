<template>
  <div class="main">
    <div>{{value.FIRSTNAME}} {{value.LASTNAME}}</div>
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
  }
}
</script>

<style lang="scss" scoped>

</style>
