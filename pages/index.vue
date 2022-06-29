<template>
  <div class="main-block">
    <div class="row">
      <section id="home" class="section-py-space" style="margin-top: 20px;display: block;">
        <div class="row">
          <div class="col-12 custom-container">
            <ListAddress />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import ListAddress from "~/components/Realestate/Address/listAddress";

export default {
  name: 'IndexPage',
  layout: 'default',
  components: {ListAddress},
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
  }
};
</script>
