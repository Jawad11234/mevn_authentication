<template>
  <div>
    <h1>Login</h1>
    <div class="row">
      <div class="card mx-auto">
        <div class="card-header text-white bg-primary">
          <h4>Login</h4>
        </div>
        <div class="card-body">
          <form @submit.prevent="loginUser">
            <div class="form-group my-2">
              <label for="username">Username</label>
              <input
                class="form-control"
                type="text"
                placeholder="Username"
                name="username"
                v-model="username"
                id="username"
              />
            </div>
            <div class="form-group my-2">
              <label for="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                class="form-control"
                v-model="password"
              />
            </div>
            <input type="submit" class="btn btn-primary" value="Login" />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <router-link to="/register" class="card-link"
              >Need an account?</router-link
            >
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["login"]),
    loginUser() {
      // eslint-disable-next-line no-unused-vars
      let user = {
        username: this.username,
        password: this.password,
      };
      this.login(user)
        .then((res) => {
          if (res.data.success) {
            this.$router.push("/profile");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
.card {
  width: 60%;
  border-radius: 0;
}

.form-control {
  border-radius: 10px;
}
.card-link {
  text-decoration: none;
}
.btn {
  border-radius: 10px;
}
</style>
