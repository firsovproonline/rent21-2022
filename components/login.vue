<template>
  <section>
      <div class="theme-form login-form">
        <div class="form-group">
          <label>Email</label>
          <div class="input-group"><span class="input-group-text"><i class="icon-email"></i></span>
            <input class="form-control" ref="email" type="email" required="" style="width: auto;" placeholder="Test@gmail.com">
          </div>
        </div>
        <div class="form-group">
          <label>Пароль</label>
          <div class="input-group"><span class="input-group-text"><i class="icon-lock"></i></span>
            <input class="form-control" type="password" ref="password" name="password" required="" style="width: auto;" placeholder="*********">
          </div>
        </div>
        <!--
        <a class="link" href="forget-password.html">Забыли пароль?</a>
        -->
        <div class="form-group" style="margin-top: 18px ">
          <button class="btn btn-landing" @click="submit">Войти</button>
        </div>
        <!--
        <p>Нет аккаунта?<a class="ms-2" href="log-in.html"> Создать аккаунт</a></p>
        -->
      </div>
  </section>
</template>

<script>
export default {
  name: "login",
  methods: {
    submit() {
      this.$api.post("/api/auth/signin", {
        password: this.$refs.password.value,
        email: this.$refs.email.value,
        username: this.$refs.email.value
      }).then(response => {
        localStorage.setItem('user', JSON.stringify(response.data));
        window.location.reload()
      })

    }
  }
}
</script>

<style scoped>

</style>
