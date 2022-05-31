<template>
  <div>
    <h1>Register</h1>
    <div class="row">
      <div class="card mx-auto">
        <div class="card-header text-white bg-primary">
          <h4>Register</h4>
        </div>
        <div class="card-body">
          <form class="my-3" @submit.prevent="registerUser">
            <div class="form-group my-2">
              <label for="username">Username</label>
              <input
                class="form-control"
                type="text"
                placeholder="Username"
                name="username"
                v-model="username"
                id="username"
                required
              />
            </div>
            <div class="form-group my-2">
              <label for="name">Name</label>
              <input
                class="form-control"
                type="text"
                placeholder="Name"
                name="name"
                v-model="name"
                id="name"
                required
              />
            </div>
            <div class="form-group my-2">
              <label for="email">Email</label>
              <input
                class="form-control"
                type="text"
                placeholder="Email"
                name="email"
                v-model="email"
                id="email"
                required
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
                required
              />
            </div>
            <div class="form-group my-2">
              <label for="confirm_password">Confirm Password</label>
              <input
                type="password"
                name="confirm_password"
                id="confirm_password"
                placeholder="Confirm Password"
                class="form-control"
                v-model="confirm_password"
                required
              />
            </div>
            <input class="btn btn-primary" type="submit" value="Register" />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <router-link to="/login" class="card-link"
              >Allready have an account?</router-link
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
      confirm_password: "",
      name: "",
      email: "",
    };
  },
  methods: {
    ...mapActions(["register"]),
    async registerUser() {
      let user = {
        username: this.username,
        password: this.password,
        confirm_password: this.confirm_password,
        email: this.email,
        name: this.name,
      };
      let res = await this.register(user);
      if (res.data.success) {
        this.$router.push("login");
      }
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
