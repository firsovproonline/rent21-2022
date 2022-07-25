<template>
  <div>
    <!-- Прелоадер -->
    <div class="preloader">
      <div>
        <svg class="preloader__image" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="currentColor"
                d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z">
          </path>
        </svg>
      </div>
    </div>
    <div class="page-wrapper compact-wrapper">
      <div v-if="showRightPanel" class="rpanel">rpanel</div>
      <div v-if="showLeftPanel" class="lpanel" >
        <LeftMenu />
      </div>
      <headerPage />
      <div class="page-body-wrapper null">
        <div class="page-body">
          <div class="custom-container">
            <Nuxt />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderPage from "~/components/headerPage";
import LeftMenu from "~/components/leftMenu";

export default {
  name: "defaultlayouts",
  components: {HeaderPage, LeftMenu},
  data: () => ({
    showLeftPanel: false,
    showRightPanel: false,
  }),
  computed: {
    globalEvent(){
      return this.$store.getters['main.js/globalevent']
    },
    vComponent() {
      return this.$store.getters['main.js/leftMenu']
    },
  },
  watch:{
    globalEvent(val){
      if(val === 'leftMenu'){
        this.showLeftPanel = !this.showLeftPanel
      }
    }
  },
  methods:{
  },
  mounted () {
    document.body.classList.add('landing-wrraper')
    window.onload = function () {
      document.body.classList.add('loaded_hiding');
      window.setTimeout(function () {
        document.body.classList.add('loaded');
        document.body.classList.remove('loaded_hiding');
      }, 100);
    }
  }
}
</script>

<style lang="css">

@media screen and (max-width: 991px) {
  .leftMenu {
    display: none;
  }

  .header-bmenu{
    display: flex !important;
  }
  .blogin{
    display: none !important;
  }
  .row-list-title {
    display: none;
  }
  .card-pagination {
    display: none;
  }
}
.page-wrapper.compact-wrapper .page-body-wrapper .page-body {
  margin-left: 0px ;
}
.preloader {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  /* фоновый цвет */
  background: -webkit-linear-gradient(0deg, rgb(251, 255, 254), rgb(245, 247, 251));
  background: -moz-linear-gradient(0deg, rgb(251, 255, 254), rgb(245, 247, 251));
  background: linear-gradient(0deg, rgb(251, 255, 254), rgb(245, 247, 251));
  z-index: 1001;
}

.preloader__image {
  position: relative;
  top: 50%;
  left: 50%;
  width: 70px;
  height: 70px;
  margin-top: -35px;
  margin-left: -35px;
  text-align: center;
  animation: preloader-rotate 2s infinite linear;
}

@keyframes preloader-rotate {
  100% {
    transform: rotate(360deg);
  }
}

.loaded_hiding .preloader {
  transition: 0.3s opacity;
  opacity: 0;
}

.loaded .preloader {
  display: none;
}

.rpanel {
  top: 0px;
  position: fixed;
  background-color: white;
  width: 390px;
  z-index: 5000;
  left: calc(100% - 600px);
  height: 100vh;
  border-left: 1px solid;
  display: block;
}

.lpanel {
  top: 50px;
  position: fixed;
  background-color: white;
  width: 390px;
  z-index: 5000;
  left: 0px;
  height: 100vh;
  border-right: 1px solid;
  display: block;
}

</style>
