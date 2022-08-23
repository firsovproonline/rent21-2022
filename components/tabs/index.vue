<template>
  <div>
    <div style="display: flex" class="tab-div">
      <div v-for="(item, index1) in items" :key="index1"
           :class="index === item.name ? 'tab-button active' : 'tab-button'"
           @click="click(item.name)"
           :id="item.name">{{item.title}}</div>
    </div>
    <div>
      <slot v-if="index" :name="index">

      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tabs",
  props:{
    activeTab: ''
  },
  data: () => ({
    items: [],
    index: ''
  }),
  mounted() {
    Object.keys(this.$slots).forEach(item=>{
      this.items.push({name:item,title:this.$slots[item][0].data.attrs.title})
    })
    this.index = this.activeTab
  },
  methods:{
    click(e){
      this.index = e;
    }
  }
}
</script>

<style scoped>
  .tab-button{
    cursor: pointer;
    margin-bottom: 0px;
    border-right: 1px solid #1c222b;
    padding-left: 4px;
    padding-right: 8px;
  }
  .tab-div{
    border-bottom: 1px solid #1c222b;
  }
  .active{
    background-color: white;
  }
</style>
