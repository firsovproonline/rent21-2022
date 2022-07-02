<template>
  <section>
    <Modal
      v-show="isShowModal"
      :show="isShowModal"
      :scrollable="true"
      header-id="modalHeader"
      body-id="modalBody"
      @close="toggleModal()"
    >
      <template #header>
        Авторизация
      </template>
      <template #body>
        <Login />
      </template>
    </Modal>
    <header class="landing-header">
      <div class="custom-container">
        <div class="row">
          <div class="col-12">
            <nav id="navbar-example2" class="navbar navbar-light p-0">
              <a href="/" class="navbar-brand">Rent 2022</a>
              <ul class="landing-menu nav nav-pills">
                <li class="nav-item menu-back">
                  back<i class="fa fa-angle-right"></i></li>
                <li class="nav-item"><a href="/" class="nav-link">Главная</a></li>
                <li v-if="user" class="nav-item">
                  <a href="/personal" class="nav-link">Кабинет</a>
                </li>
                <li class="nav-item">
                  <a href="/realestate" class="nav-link">Недвижимость</a>
                </li>
              </ul>
              <div class="buy-block">
                <div v-if="!user" class="btn-landing" style="cursor: pointer" @click="toggleModal">Вход</div>
                <div v-else class="btn-landing" style="cursor: pointer" @click="exitUser">Выход</div>
                <div class="toggle-menu"><i class="fa fa-bars"></i></div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  </section>
</template>

<script>
import Modal from "~/components/modal";
import Login from "~/components/login";
export default {
  name: "headerPage",
  components: {Login, Modal},
  data: () => ({
    isShowModal: false,
  }),
  computed: {
    user() { return this.$store.getters['user/user']}
  },
  methods: {
    toggleModal() {
      this.isShowModal = !this.isShowModal;
    },
    exitUser(){
      localStorage.setItem('user', null);
      window.location.reload();
    }
  },
  mounted() {
    this.$store.dispatch('user/setUser')
  }
}
</script>

<style scoped>

</style>
