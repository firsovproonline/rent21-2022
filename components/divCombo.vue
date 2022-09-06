<template>
  <div class="main">
    <div class="title" @click="tagleShowCombo">
      <div>{{title}}</div>
      <div :class="showCombo ? 'triangle-up':'triangle-down'" style="margin-left: 6px"  ></div>

    </div>
    <slot v-if="showCombo" name="body">
      Modal body
    </slot>
  </div>
</template>

<script>
export default {
  name: "divCombo",
  props:{
    title: '',
    open: null
  },
  data () {
    return {
      showCombo: false
    }
  },
  methods: {
    tagleShowCombo() {
      this.showCombo = !this.showCombo
      if(this.showCombo && this.open){
        this.open()
      }
    },
  }
}
</script>

<style lang="scss" scoped>
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

  .landing-wrraper .title{
    margin-bottom: 0px;
    margin-left: 0px;
  }
  .main{
    width: 100%;
    .title{
      display: flex;
      border-bottom: 1px dotted;
      justify-content: space-between;
      width: 100%;
      align-items: center;
      cursor: pointer;
    }
  }
</style>
