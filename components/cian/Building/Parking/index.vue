<template>
  <div class="main">
    <div v-if="title!=''" class="title" :style="labelWidth ? 'width:'+labelWidth : ''" >{{title}}</div>
    <div style="flex: auto;display: flex">
      <div class="checkdiv">
        <label class="container" style="margin-top: 14px;">
          <input type="checkbox" v-model="visible">
          <span class="checkmark" style="margin-top: -8px" ></span>
        </label>
      </div>
      <div v-if="visible">
        <ComboNoSpr
          :value="Type"
          labelWidth="0px"
          style="width: 155px"
          :change="ParkingTypeChange"
        >
          <option value="ground">Наземная</option>
          <option value="multilevel">Многоуровневая</option>
          <option value="open">Открытая</option>
          <option value="roof">На крыше</option>
          <option value="underground">Подземная</option>
        </ComboNoSpr>
        <div class="div-input" style="display: flex;align-items: center;justify-content: space-between;">
          <label for="PlacesCount" class="labelInput">Кол. мест</label>
          <input v-model="PlacesCount"
                 id="PlacesCount"
                 class="form-control"
                 type="text"
                 placeholder=""
                 style="width: 50px">
        </div>
        <div class="div-input" style="display: flex;align-items: center;justify-content: space-between;">
          <label for="PriceMonthly" class="labelInput">Стоимость в мес.</label>
          <input v-model="PriceMonthly"
                 id="PriceMonthly"
                 class="form-control"
                 type="text"
                 placeholder=""
                 style="width: 50px">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ComboNoSpr from "~/components/comboNotSpr";
export default {
  name: "Parking",
  components: {ComboNoSpr},
  props:{
    title: '',
    labelWidth: null
  },
  data: () => ({
    visible: true,
    Type: 'ground',
    PlacesCount: 0,
    PriceMonthly: 0
  }),
  methods:{
    ParkingTypeChange(val){
      this.Type = val;
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 14px;
  user-select: none;
}

.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #ffffff;
}

.container:hover input ~ .checkmark {
  background-color: #ffffff;
}

.container input:checked ~ .checkmark {
  background-color: #2196F3;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.container input:checked ~ .checkmark:after {
  display: block;
}

.container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 8px;
  height: 8px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

.main{
  display: flex;
  margin-bottom: 12px;
  .labelInput{
    font-weight: normal;
  }
  .title{
    margin-bottom: 0px;
    width: 140px;
    margin-left: 0px;
  }
}
</style>
