<template>
  <div>
    <div class="main">
      <div v-if="title!=''" class="title">{{title}}</div>
      <div v-if="this.spr" class="value">
        {{
          Object(this.guide[this.spr].find(aitem => aitem.id == value)).name
        }}
      </div>
      <div class="triangle-up" style="margin-left: 6px" @click="tagleShowCombo()"></div>
    </div>
    <div v-if="showCombo && this.spr" class="selectDiv">
      <div
        v-for="item in this.guide[this.spr]"
        :key="item.id"
        class="item"
        :value="item.id"
        @click="clickItem"
      >
        {{item.name}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "comboRent21",
  data () {
    return {
      showCombo: false
    }
  },
  props:{
    spr: null,
    value: null,
    type: null,
    title: '',
    field: null,
    itemkey: null
  },
  computed: {
    guide() {
      return this.$store.getters['realestate/spr']
    }
  },
  methods: {
    tagleShowCombo(){
      this.showCombo = ! this.showCombo
    },
    clickItem(el){
      this.$store.dispatch('main/setglobalevent', {
        operation: 'setFieldItem',
        field:  this.field,
        value: el.target.getAttribute('value'),
        itemkey: this.itemkey
      })
      this.$nextTick(()=>{
        this.showCombo = false;
      })
    }
  }
}
</script>

<style lang="scss" scoped>

  .selectDiv{
    border: 1px solid;
    position: absolute;
    z-index: 300;
    width: 95%;
    max-height: 240px;
    overflow: auto;
    background-color: #ffffff;
    padding-left: 4px;
    .item{
      padding: 4px;
      cursor: pointer;
    }
    .item:hover{
      background-color: #f5f7fb;
    }
  }

  .main{
    height: 32px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    .title{
      margin-bottom: 0px;
      width: 140px;
      margin-left: 0px;
    }
    .value{
      flex: auto;
      border-bottom: 1px dotted;
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
  }
</style>
