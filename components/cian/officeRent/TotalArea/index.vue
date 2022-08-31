<template>
  <div class="main">
    <div style="display: flex;flex-wrap: nowrap;align-items: baseline;">
      <div>Общая площадь м²</div>
      <div>
        <div style="display: flex;flex-wrap: nowrap;align-items: center;">
          <input v-model="item.ob.cian.TotalArea"
                 id="TotalArea"
                 class="form-control"
                 type="text"
                 placeholder=""
                 style="margin-left: 12px;width: 60px">
          <input v-model="value.cena"
                 id="cena"
                 class="form-control"
                 type="text"
                 placeholder=""
                 style="margin-left: 12px;width: 90px">
          <ComboNoSpr title="" style="margin-left: 12px;width: 120px" :value="value.combovalue" :change="comboChange">
            <option value="1">В месяц за м²</option>
            <option value="2">В год за м²</option>
            <option value="3">В месяц</option>
          </ComboNoSpr>
          <div class="btn btn-pill btn-outline-primary btn-air-primary btn-xs" type="button"
               style="font-size: 29px;line-height: 16px;padding: 4px 4px;margin-left: 12px">+</div>
        </div>
        <div v-for="(item1, index) in value.items" :key="index" style="display: flex;flex-wrap: nowrap;align-items: center;">
          <input v-model="item.ob.cian.TotalArea"
                 class="form-control"
                 type="text"
                 placeholder=""
                 style="margin-left: 12px;width: 60px">
          <input v-model="value.cena"
                 class="form-control"
                 type="text"
                 placeholder=""
                 style="margin-left: 12px;width: 90px">

          <div class="btn btn-pill btn-outline-primary btn-air-primary btn-xs" type="button"
               style="font-size: 31px;line-height: 12px;padding: 8px 8px;margin-left: 12px">-</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ComboNoSpr from "~/components/comboNotSpr";
export default {
  name: "TotalArea",
  components: {ComboNoSpr},
  props:{
    item: {}
  },
  data () {
    return {
      value: {
        combovalue: 2,
        cena: '',
        items: [1,2,3]
      }
    }
  },
  methods:{
    comboChange(val){
      console.log('comboChange', val)
      this.value.combovalue = val
    }
  }
}
</script>

<style lang="scss" scoped>
  .main{
    label{
      font-weight: normal;
    }
  }
</style>
