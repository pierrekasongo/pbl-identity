import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      loggedin: false,
      id:0,
      nom : "",
      role : "",
      token : "",
      login: ""
    },
  },
  mutations: {
    login( state, user ) {
      console.log("LOGIN ", user)
      state.user.loggedin = true
      state.user.nom = user.nom
      state.user.role = user.role
      state.user.token = user.token
      state.user.login = user.login
      console.log("STATE ", state.user)
    },
    logout( state ) {
      console.log("Logout", state.user)
      state.user.loggedin = false
      state.user.id = ""
      state.user.nom = ""
      state.user.role = ""
      state.user.token = ""
      state.user.login = ""
      localStorage.clear()
    },
  },
  actions: {},
  modules: {}
});