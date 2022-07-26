<template>
  <div class="row">
    <div class="card">
      <div class="card-header">
        <div class="media">
          <div class="form-group d-flex mb-0" style="flex: 1">
            "Экспорт Avito"
          </div>
          <div v-if="isInsert" class="btn btn-primary" style="display: flex;margin-left: 12px" @click="insertItem">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
          </div>
        </div>
      </div>

    </div>
    <div class="card-body row">
      <AvitoItem :item="item" v-for="(item, key) in items" :key="key" />
    </div>
  </div>
</template>

<script>
import AvitoItem from "~/components/Realestate/setings/avitoItem";

export default {
  name: "avitoList",
  components: {AvitoItem},
  data: () => ({
    isInsert: true,
  }),
  computed:{
    items(){
      return this.$store.getters['seting/IPphoneItems']
    },
    globalEvent(){
      return this.$store.getters['main/globalevent']
    },
  },
  watch:{
    globalEvent(val){
      if(val === 'insertIPphone'){
        this.isInsert = false;
      }
      if(val === 'saveIPphone'){
        this.isInsert = true;
      }
    }
  },
  methods:{
    insertItem(){
      this.$store.dispatch('seting/insertIPphoneItem')
    }
  }

}
</script>

<style scoped>
.main-section{
  margin-bottom: 0px;
}

.media-body {
  flex: 0 0 auto;
}
.card-header{
  padding: 8px;
}
.fa-search{
  width: 24px;
  height: 24px;
  font-size: 24px;
}

.d-flex {
  display: flex !important;
  justify-content: center;
  align-content: center;
  align-items: center;
}
.profile-header{
  padding-bottom: 6px;
}

.card-header {
  background-color: white;
}

.card{
  margin-bottom: 0px;
}
</style>
