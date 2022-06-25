<template>
  <div class="main-block">
    проверка scc
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData ({ app, route, params, error, store }) {
    try {
      await store.dispatch('realestate/load')
    } catch (err) {
      console.log(err)
      return error({
        statusCode: 404,
        message: 'Категории не найдены или сервер не доступен'
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.main-block {
  height: 300px;
  background: white;
  @include md-desktop {
    background: green;
  }
}
</style>
