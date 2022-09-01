<template>
  <div>
    <DivCombo title="Здание">
      <template #body >
        <div style="background-color: white;padding: 4px;box-shadow: 0px 5px 10px 2px rgb(34 60 80 / 20%);">
          <Labelfromfield label="Тип здания" :value="item.build.TIPZD" />
          <Labelfromfield label="Этажность" :value="item.build.ETAGALL" />
          <Labelfromfield label="Класс" :value="item.build.KLASS" />
          <div style="display: flex;flex-wrap: wrap;">
            <div v-for="(item,index) in photo" :key="index" style="margin: 4px">
              <img :src="'/api/foto/get?id='+item.ID" />
            </div>

          </div>
        </div>
      </template>
    </DivCombo>
  </div>
</template>

<script>
import DivCombo from "~/components/divCombo";
import Labelfromfield from "~/components/labelfromfield";
export default {
  name: "Building",
  components: {Labelfromfield, DivCombo},
  props:{
    item: {}
  },
  data () {
    return {
      photo: []
    }
  },
  mounted() {
    this.$api.get('/api/foto/list?id='+this.item.build.UID).then(item=>{
      this.photo = item.data.row
    })
  }
}
</script>

<style scoped>

</style>
