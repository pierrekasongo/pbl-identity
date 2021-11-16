<style scoped>
.center-div {
  margin: 100px auto;
}
.form-control {
  border: 1px solid #ccc;
}

.form-group button {
  border-radius: 5px;
  padding: 5px 8px;
  color: #fff;
}
.is-invalid {
  border: 1px solid rgb(250, 7, 7);
}
.invalid-feedback {
  color: rgb(250, 7, 7);
}
.v-main {
  padding: 0px 0px 0px 0px !important;
}
.cb {
  color: rgb(46, 137, 255);
}
</style>
<template>
  <div id="login" class="center-div">
    <v-flex xs4 offset-xs4>
      <v-card
        primary
        darken-1
        white--text
        font-weight-bold
        elevation-24
        style="padding: 20px; border: 1px"
      >
        <v-card-text>
          <h4 class="font-weight-bold cb">PBL-IDENTITY</h4>
          <v-divider></v-divider>
          <br />
          <form @submit.prevent="login">
            <div class="form-group">
              <v-row>
                <v-col>
                  <div v-if="wrongCred" class="invalid-feedback">
                    <span>Login ou mot de passe incorrect</span>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col><label for="username">Login</label></v-col>
                <v-col>
                  <input
                    type="username"
                    v-model="username"
                    id="username"
                    name="username"
                    class="form-control"
                    :class="{
                      'is-invalid': submitted && $v.username.$error,
                    }"
                    @blur="$v.username.$touch()"
                    @change="$v.username.$touch()"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col></v-col>
                <v-col>
                  <div
                    v-if="submitted && $v.username.$error"
                    class="invalid-feedback"
                  >
                    <span v-if="!$v.username.required">Login requis</span>
                  </div>
                </v-col>
              </v-row>
            </div>

            <div class="form-group">
              <v-row>
                <v-col><label for="password">Mot de passe</label></v-col>
                <v-col>
                  <input
                    type="password"
                    v-model="password"
                    id="password"
                    name="password"
                    class="form-control"
                    :class="{
                      'is-invalid': submitted && $v.password.$error,
                    }"
                    @blur="$v.username.$touch()"
                    @change="$v.username.$touch()"
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col></v-col>
                <v-col>
                  <div
                    v-if="submitted && $v.password.$error"
                    class="invalid-feedback"
                  >
                    <span v-if="!$v.password.required"
                      >Mot de passe requis</span
                    >
                  </div>
                </v-col>
              </v-row>
            </div>
            <br />
            <v-divider></v-divider>
            <br />
            <div class="form-group">
              <button class="btn primary lighten1" color="">Valider</button>
            </div>
          </form>
        </v-card-text>
      </v-card>
    </v-flex>
  </div>
</template>
<script>
import axios from "axios";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
export default {
  name: "Login",

  data() {
    return {
      username: "",
      password: "",
      rules: {
        required: (value) => !!value || "Champ requis.",
      },
      valid: true,
      submitted: false,
      wrongCred: false,
    };
  },
  validations: {
    username: { required },
    password: { required },
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
    login(e) {
      console.log("LOGIN");
      this.submitted = true;

      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      let _login = this.username;
      let _password = this.password;
      let data = {
        login: _login,
        password: _password,
      };
      axios
        .post("/user/auth/", data)
        .then((response) => {
          console.log("Response data", response.data);
          if (response.status == 201) {
            console.log("Wrong creds");
            this.wrongCred = true

            this.$v.$touch();
            if (this.$v.$invalid) {
              return;
            }
          }
          return response.data;
        })
        .then((user) => {
            localStorage.setItem("user_id", user.id);
            localStorage.setItem("login", user.login);
            localStorage.setItem("nom", user.nom);
            localStorage.setItem("role", user.role);
            localStorage.setItem("token", user.token);
            localStorage.setItem("entreprise", user.entreprise);
            localStorage.setItem("loggedin", true);
            this.$store.state.user = user;
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
