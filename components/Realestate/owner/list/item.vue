<template>
  <div class="main">
    <div class="title" @click="tagleShowCombo">
      <div>{{value.NAME}}</div>
      <div :class="showCombo ? 'triangle-up':'triangle-down'" style="margin-left: 6px"  ></div>
    </div>
    <div v-if="showCombo" class="divCombo">
      <div style="display: flex;align-items: center;">
        <div class="label">коммисия аренды</div>
        <div style="margin-left: 6px">{{value.KOMIS}}</div>
        <div class="label" style="margin-left: 6px">%</div>
        <div style="margin-left: 6px">{{value.KOMISREM}}</div>
      </div>
      <ContactList v-for="(contact,index) in value.contacts" :key="index" :value="contact" />
    </div>
    <div></div>
  </div>
</template>

<script>
import ContactList from "~/components/Realestate/contact/list";
export default {
  name: "Item",
  components: {ContactList},
  props: {
    value: {}
  },
  data () {
    return {
      showCombo: false
    }
  },
  methods: {
    tagleShowCombo() {
      this.showCombo = !this.showCombo
    },
  },
}
</script>

<style lang="scss" scoped>
  .main{
    border-bottom: 1px dotted;
    width: 100%;
    .divCombo{
      padding-left: 8px;
    }
    .label{
      color: #0c5460;
    }
    .title{
      display: flex;
      justify-content: space-between;
      margin-bottom: 0px;
      width: 100%;
      align-items: center;
      cursor: pointer;
    }
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
