<template>
  <section>
      <div class="theme-form login-form">
        <div class="form-group">
          <label>Email Address</label>
          <div class="input-group"><span class="input-group-text"><i class="icon-email"></i></span>
            <input class="form-control" ref="email" type="email" required="" placeholder="Test@gmail.com">
          </div>
        </div>
        <div class="form-group">
          <label>Password</label>
          <div class="input-group"><span class="input-group-text"><i class="icon-lock"></i></span>
            <input class="form-control" type="password" ref="password" name="password" required="" placeholder="*********">
            <div class="show-hide"><span class="show">                         </span></div>
          </div>
        </div>
        <div class="form-group">
          <div class="checkbox">
            <input id="checkbox1" type="checkbox">
            <label for="checkbox1">Remember password</label>
          </div><a class="link" href="forget-password.html">Forgot password?</a>
        </div>
        <div class="form-group">
          <button class="btn btn-landing" @click="submit">Войти</button>
        </div>
        <p>Нет аккаунта?<a class="ms-2" href="log-in.html">Создать аккаунт</a></p>
      </div>
  </section>
</template>

<script>
export default {
  name: "login",
  methods: {
    submit() {
      console.log(this)
      this.$api.get("/api/test/all").then(response => {
        console.log(response)
        // localStorage.setItem('user', JSON.stringify(response.data));
      });

      this.$api.post("/api/auth/signin", {
        password: this.$refs.password.value,
        email: this.$refs.email.value,
        username: this.$refs.email.value
      }).then(response => {
        console.log(response)
        localStorage.setItem('user', JSON.stringify(response.data));
      })

    }
  }
}
</script>

<style scoped>

</style>
