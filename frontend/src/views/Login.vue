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
                    required
                    v-model="username"
                    label="Login"
                    type="text"
                    :rule="usernameRule"
                  >
                  </v-text-field>
                  <v-text-field
                    required
                    v-model="password"
                    v-on:keyup.enter="login()"
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
import { required } from "vuelidate/lib/validators";
export default {
  name: "Login",
  validations: {
    username: { required },
    password: { required },
  },
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
    //this.$store.commit("logout");
  },
  computed: {
    /*usernameErrors () {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.required && errors.push('Login requis')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Mot de passe requis')
      return errors
    }*/
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
          localStorage.setItem("entreprise", user.entreprise);
          this.$store.state.user = user
          //this.$store.state.loggedin = true;
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
  },
};
</script>
