<template>
  <section>
    <ul>
      <li v-if="isAdmin">
        <a class="itemTitle" href="/personal/users">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          <label>Пользователи</label>
        </a>
      </li>
      <li v-if="isAdmin || isModerator" class="dropdown">
        <a class="itemTitle" href="/personal/realestate">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          <label>Обьекты</label>
          <div class="triangle-down"></div>
        </a>
        <ul>
          <li><a>Комерческая</a></li>
          <li><a>Жилая</a></li>
          <li><a>Загородная</a></li>
          <li v-if="isAdmin"><a>Импорт</a></li>
        </ul>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "leftMenu",
  data: () => ({
    isAdmin: false,
    isModerator: false,
  }),
  mounted() {
    const val = this.$store.getters['user/user']
    if(val.roles.indexOf('admin') === -1){
      this.isAdmin = false
    }else {
      this.isAdmin = true
    }
    if(val.roles.indexOf('moderator') === -1){
      this.isModerator = false
    }else {
      this.isModerator = true
    }
  }

}
</script>

<style scoped lang="scss">
.leftMenu {
  background: transparent !important;
}
li {
  display: block;
  float: none;
  width: 100%;
  padding: 0 20px;
}

.itemTitle{
  border-bottom: 1px dotted;
  display: flex;
  align-content: center;
  align-items: center;
  padding-bottom: 12px;
  label {
    flex: auto;
    margin-top: 8px;
    padding-left: 6px;
    cursor: pointer;
  }
}

li {
 padding-top: 12px;
}
.triangle-up {
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid #6E18C0;
}

.triangle-down {
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid #6E18C0;
}
</style>
