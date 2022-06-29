<template>
  <div class="itemLabel">
    <div style="flex: auto;">{{this.label}}</div>
    <div class="triangle-up" style="margin-left: 6px"></div>
  </div>
</template>

<script>
export default {
  name: "guideLabel",
  props:{
    items: [],
    field: {},
    value: 0
  },
  data () {
    return {
      label: 'wwww'
    }
  },
  created() {
    this.label = this.items.find(item => item.id === this.value ).name
  }
}
</script>

<style scoped>
.itemLabel{
  display: flex;
  align-content: center;
  justify-content: flex-start;
  flex-wrap: nowrap;
  align-items: baseline;
  min-width: 90px;
}
.triangle-up {
  width: 0;
  height: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-bottom: 7px solid #000000;
  cursor: pointer;
}

.triangle-down {
  width: 0;
  height: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-top: 7px solid #000000;
  cursor: pointer;
}

</style>
