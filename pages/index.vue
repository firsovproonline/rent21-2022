<template>
  <div class="main-block">
    <Modal
      v-show="isShowModal"
      :show="isShowModal"
      :scrollable="true"
      header-id="modalHeader"
      body-id="modalBody"
      @close="toggleModal"
    >
      <template #header>
        Авторизация
      </template>
      <template #body>
        <Login />
      </template>
    </Modal>
    <button class="btn-landing" @click="toggleModal">
      Авторизация
    </button>
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
  data: () => ({
    isShowModal: false,
  }),
  methods: {
    toggleModal() {
      this.isShowModal = !this.isShowModal;
    },
  },
  mounted () {
    document.body.classList.add('landing-wrraper')
  }
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
