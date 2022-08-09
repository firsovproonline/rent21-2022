<template>
  <div v-if="items">
    <div class="addB" @click="insertItem" >
      Добавить
    </div>
    <Item v-for="(item, key) in items" :key="key" :item="item" :itemkey="key"  />
  </div>
</template>

<script>
import Item from "~/components/Realestate/client/editphones/item";
export default {
  name: "editPhones",
  components: {Item},
  props:{
    items: []
  },
  methods:{
    insertItem(){
      this.$store.dispatch('main/setglobalevent', {
        operation: 'insertClientPhone',
        field:  '',
        value: ''
      })
    }
  }
}
</script>

<style scoped>
.addB{
  margin-bottom: 8px;
  cursor: pointer;
  color: #1b4c43;
  font-weight: bolder;
  text-decoration: underline;
}
</style>
