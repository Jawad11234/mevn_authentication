import router from "../router/index";

import axios from "axios";

let state = {
  status: "",
  token: localStorage.getItem("token") || "",
  user: {},
  error: null,
};
const getters = {
  //   isLoggedIn: function (state) {
  //     if (state.token != "") {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   },
  // Short form of upper function
  isLoggedIn: (state) => !!state.token,
  authState: (state) => state.status,
  user: (state) => state.user,
  error: (state) => state.error,
};

const actions = {
  async login({ commit }, user) {
    commit("auth_request");
    try {
      let res = await axios.post("/api/users/login", user);
      if (res.data.success) {
        const token = res.data.token;
        const user = res.data.user;
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = token;
        commit("auth_success", token, user);
      }
      return res;
    } catch (error) {
      commit("auth_error", error);
    }
  },

  //////// Register a user Auth
  async register({ commit }, user) {
    try {
      commit("register_request");
      let res = await axios.post("/api/users/register", user);
      console.log("Auth Model Response");
      console.log(res);

      if (res.data.success !== "undefined") {
        commit("register_success");
      }
      return res;
    } catch (error) {
      commit("register_error", error);
    }
  },

  // Getting Profile
  async getProfile({ commit }) {
    commit("profile_request");
    let res = await axios.get("/api/users/profile");
    commit("user_profile", res.data.user);
    return res;
  },

  /// Logout A User
  async logout({ commit }) {
    await localStorage.removeItem("token");
    commit("logout");
    router.push("/login");
    delete axios.defaults.headers.common["Authorization"];
    return;
  },
};

const mutations = {
  auth_request(state) {
    state.error = null;
    state.status = "loading";
  },
  auth_success(state, token, user) {
    state.error = null;
    state.token = token;
    state.user = user;
    state.status = "success";
  },
  auth_error(state, error) {
    state.error = error.response.data.msg;
  },
  register_request(state) {
    state.error = null;
    state.status = "loading";
  },
  register_success(state) {
    state.error = null;
    state.status = "success";
  },
  register_error(state, error) {
    state.error = error.response.data.msg;
  },
  logout(state) {
    state.error = null;
    state.status = "";
    state.token = "";
    state.user = "";
  },
  profile_request(state) {
    state.error = null;
    state.status = "loading";
  },
  user_profile(state, user) {
    state.error = null;
    state.user = user;
  },
};
// const modules = {};

export default {
  state,
  actions,
  getters,
  mutations,
};
