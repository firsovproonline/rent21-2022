<template>
  <div class="card">
    <nav class="m-b-30" aria-label="Page navigation example">
      <ul class="pagination pagination-lg pagination-primary">
        <li class="page-item"><a class="page-link" href="javascript:void(0)">Previous</a></li>
        <li class="page-item"><a class="page-link" href="javascript:void(0)">1</a></li>
        <li class="page-item"><a class="page-link" href="javascript:void(0)">2</a></li>
        <li class="page-item"><a class="page-link" href="javascript:void(0)">3</a></li>
        <li class="page-item"><a class="page-link" href="javascript:void(0)">Next</a></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "paginator"
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
