<template>
  <section>
    <ul>
      <li v-if="isAdmin">
        <a class="itemTitle" href="/personal/users">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          <label>Пользователи</label>
        </a>
      </li>
      <li v-if="isAdmin || isModerator">
        <a class="itemTitle" href="/personal/owners">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-list"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3" y2="6"></line><line x1="3" y1="12" x2="3" y2="12"></line><line x1="3" y1="18" x2="3" y2="18"></line></svg>
          <label>Собственики</label>
        </a>
      </li>
      <li v-if="isAdmin || isModerator" class="dropdown">
        <a class="itemTitle" href="/personal/realestate">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          <label>Обьекты</label>
          <div class="triangle-down"></div>
        </a>
<!--
        <ul>
          <li><a>Комерческая</a></li>
          <li><a>Жилая</a></li>
          <li><a>Загородная</a></li>
        </ul>
-->
      </li>
      <li v-if="isAdmin || isModerator" class="dropdown">
        <a class="itemTitle" href="/personal/client">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          <label>Клиенты</label>
          <div class="triangle-down"></div>
        </a>
        <ul>
<!--
          <li><a>Комерческая</a></li>
          <li><a>Жилая</a></li>
          <li><a>Загородная</a></li>
-->
        </ul>
      </li>
      <li v-if="isAdmin || isModerator">
        <a class="itemTitle" href="/personal/setings">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sliders"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
          <label>Настройки</label>
        </a>
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
  },
  methods:{
    inportAddress(){
      this.$api.get("/api/realestate/oldaddress").then(response => {
/*
        const outOb = {
          adres21: {},
          build21: {},
          ob21: {},
          linc21: response.data.linc21
        }
        response.data.adres21.forEach(item => {
          outOb.adres21[item.UID] = item;
        })
        response.data.build21.forEach(item => {
          outOb.build21[item.UID] = item;
        })
        response.data.ob21.forEach(item => {
          outOb.ob21[item.UID] = item;
        })
*/
        // console.log(response.data)
        this.$store.dispatch('realestate/setimportItems', response.data)
        // console.log(outOb)
      }).data(data => {
        console.log(data)
      })
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
