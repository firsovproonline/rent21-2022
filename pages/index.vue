<template>
  <div class="main-block">

  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'default',
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
  mounted () {
    document.body.classList.add('landing-wrraper')
  }
};
</script>

<style lang="scss" scoped>

</style>
