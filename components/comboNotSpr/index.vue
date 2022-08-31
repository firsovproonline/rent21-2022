<template>
  <div>
    <div class="main">
      <div v-if="title!=''" class="title" :style="labelWidth ? 'width:'+labelWidth : ''" >{{title}}</div>
      <div v-if="items.length > 0 && this.items.find(aitem => aitem.id == this.value)" class="value">
        {{this.items.find(aitem => aitem.id == this.value).name}}
      </div>
      <div class="triangle-up" style="margin-left: 6px" @click="tagleShowCombo()"></div>
    </div>
    <div v-if="showCombo && items.length > 0" class="selectDiv" :style="comboWidth">
      <div
        v-for="item in items"
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
  name: "comboNoSpr",
  props:{
    title: '',
    change: null,
    value: '',
    labelWidth: null
  },
  data () {
    return {
      showCombo: false,
      items: [],
    }
  },
  computed:{
    comboWidth(){
      return 'width:'+ this.$el.offsetWidth + 'px !important'
    }
  },
  methods:{
    tagleShowCombo(){
      this.showCombo = ! this.showCombo
    },
    clickItem(el){
      this.change(el.target.getAttribute('value'))
      this.$nextTick(()=>{
        this.tagleShowCombo()
      })
    }
  },
  mounted() {
    if(this.$scopedSlots){
      this.$scopedSlots.default().forEach(item =>{
        if(item.tag === 'option'){
          this.items.push({id:item.data.attrs.value, name:item.children[0].text})
        }
      })
    }
  },
}
</script>

<style lang="scss" scoped>

.selectDiv{
  border: 1px solid;
  position: absolute;
  z-index: 300;
  width: 95%;
  max-height: 240px;
  width: 120px;
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

