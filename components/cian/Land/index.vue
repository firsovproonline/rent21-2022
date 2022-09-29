<template>
  <div class="main">
    <div v-if="title!=''" class="title" :style="labelWidth ? 'width:'+labelWidth : ''" >{{title}}</div>
  </div>
</template>

<script>
export default {
  name: "Land",
  props:{
    title:'',
    labelWidth: null
  },
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
