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
                <div v-if="!user" class="btn-landing blogin" style="cursor: pointer" @click="toggleModal">Вход</div>
                <div v-else class="btn-landing blogin" style="cursor: pointer" @click="exitUser">Выход</div>
                <div class="toggle-menu"><i class="fa fa-bars"></i></div>
                <div class="toggle-sidebar header-bmenu">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-align-center status_toggle middle" id="sidebar-toggle"><line x1="18" y1="10" x2="6" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="18" y1="18" x2="6" y2="18"></line></svg>
                </div>
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
.header-bmenu{
  display: none;
}

.header-bmenu svg{
  margin-left: 16px;
}
</style>
