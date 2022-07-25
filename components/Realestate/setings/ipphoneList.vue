<template>
  <div class="row">
    <div class="card">
      <div class="card-header">IP телефония</div>
      <div class="card-body">
        <IpphoneItem />
      </div>
    </div>
  </div>
</template>

<script>
import IpphoneItem from "~/components/Realestate/setings/ipphoneItem";
export default {
  name: "ipphoneList",
  components: {IpphoneItem}
}
</script>

<style scoped>

</style>
