import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { 
    
    user: {
      id:0,
      nom : "",
      role : "",
      token : "",
      login: "",
      entreprise:"",
      loggedin: false,
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
      state.user.entreprise = user.entreprise,
      state.user.loggedin = user.loggedin,
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
      state.user.entreprise = ""
      state.user.loggedin = false
      localStorage.clear()
    },
  },
  actions: {},
  modules: {}
});