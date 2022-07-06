<template>
  <div class="card card-pagination">
    <nav class="m-b-30" aria-label="Page navigation example">
      <ul class="pagination pagination-lg pagination-primary">
        <li class="page-item">
          <a class="page-link" href="javascript:void(0)">
            <<
          </a>
        </li>
        <li v-for="item in items" :key="item" class="page-item">
          <a class="page-link" :href="'/personal/client/'+item">{{item}}</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="javascript:void(0)">
           >>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "paginator",
  data: () => ({
    items: [1,2,3,4,5],
  }),
  computed: {
    total (){
      return this.$store.getters['realestate/total']
    },
    page (){
      return this.$route.params.id
    }
  },
  watch:{
    total(){
      this.generatePaginator()
    },
    page(){
      this.generatePaginator()
    }
  },
  mounted() {
    this.generatePaginator()
  },
  methods:{
    generatePaginator(){
      let page = 1
      let pageFirst = 1;
      if(this.page) page = this.page
      if((this.page - 2) > 1 ){
        pageFirst = this.page - 3
      }
      this.items = []
      for(let i = pageFirst;i <= pageFirst+4;i++){
        this.items.push(i)
      }

    },
    click(){
      console.log(this)
    }
  }
}
</script>

<style scoped>
  .m-b-30 {
    margin-bottom: 0px !important;
  }

  .pagination{
    justify-content: center;
  }
</style>
