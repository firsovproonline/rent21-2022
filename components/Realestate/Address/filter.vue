<template>
  <div style="padding: 8px">
    <div style="margin-bottom: 8px">Поиск</div>
    <ComboNoSpr title="Тип" :value="tip"
                style="width:220px"
                labelWidth="90px"
                :change="setTip">
      <option value="Коммерческая">Коммерческая</option>
      <option value="Жилая">Жилая</option>
      <option value="Загородная">Загородная</option>
    </ComboNoSpr>
    <ComboNoSpr title="Операция" :value="opp"
                style="width:220px"
                labelWidth="90px"
                :change="setOpp">
      <option value="Продажа">Продажа</option>
      <option value="Аренда">Аренда</option>
    </ComboNoSpr>
  </div>
</template>

<script>
import ComboNoSpr from "~/components/comboNotSpr";
export default {
  name: "FiterOb",
  components: {ComboNoSpr},
  data: () => ({
    tip: 'Коммерческая',
    opp: 'Продажа'
  }),
  methods:{
    setTip(val){
      this.tip = val
    },
    setOpp(val){
      this.opp = val
    }
  }
}
</script>

<style scoped>

</style>
