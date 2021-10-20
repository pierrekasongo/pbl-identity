<template>
  <div id="login">
    <v-app>
      <v-container grid-list-xl text-xs-center>
        <v-layout row wrap>
          <v-flex xs4 offset-xs4>
            <v-card
              primary
              darken-1
              white--text
              font-weight-bold
              elevation-24
              style="padding: 20px; border: 1px; border-radius: 50px"
            >
              <v-card-text>
                <h4 class="font-weight-bold">PBL-IDENTITY</h4>
                <br />
                <v-form>
                  <v-text-field
                    v-model="username"
                    label="Login"
                    type="text"
                    :rule="usernameRule"
                  >
                  </v-text-field>
                  <v-text-field
                    v-model="password"
                    label="Mot de passe"
                    type="password"
                    :rule="passwordRules"
                    @submit="login"
                  >
                  </v-text-field>
                </v-form>
                <br />
                <v-btn @click="login" color="primary darken-2" large
                  >Valider</v-btn
                >
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      valid: true,
      username: "",
      password: "",
      usernameRule: [(v) => !!v || "Login requis"],
      passwordRules: [
        (v) => !!v || "Mot de passe requis",
        (v) => v.length >= 8 || "Password is to short",
      ],
    };
  },
  created: function () {
    this.$store.commit("logout");
  },
  methods: {
    validate() {
      this.$refs.form.validate();
      if (this.valid == false) return;
      else alert("Now you can sign in!");
    },

    login(e) {
      e.preventDefault();
      let _login = this.username;
      let _password = this.password;
      let data = {
        login: _login,
        password: _password,
      };
      axios
        .post("/user/auth/", data)
        .then((response) => {
          console.log("Response ", response);
          return response.data;
        })
        .then((user) => {
          localStorage.setItem("user_id", user.id);
          localStorage.setItem("login", user.login);
          localStorage.setItem("nom", user.nom);
          localStorage.setItem("role", user.role);
          localStorage.setItem("token", user.token);
          user.loggedin = true
          this.$router.push("/client");
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
  },
};
</script>
