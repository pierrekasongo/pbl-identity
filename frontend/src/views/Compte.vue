<style scoped>
.card-detail {
  margin: 20px;
  padding: 20px;
}
</style>
<template>
  <v-container>
    <v-toolbar flat>
      <v-toolbar-title>Changer mot de passe</v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="30" sm="12" md="8">
              <v-text-field
                v-model="old_password"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[required, min6]"
                :type="show ? 'text' : 'password'"
                name="old_password"
                label="Ancien mot de passe"
                counter
                @click:append="show = !show"
              >
                <template v-slot:append>
                  <v-icon v-if="successPassOld" color="green">{{
                    oldPassRule
                  }}</v-icon>
                  <v-icon v-if="!successPassOld" color="red">{{
                    oldPassRule
                  }}</v-icon>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="30" sm="12" md="8">
              <v-text-field
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[required, min6, matchingPasswords]"
                :type="show1 ? 'text' : 'password'"
                name="password"
                label="Mot de passe"
                counter
                @click:append="show1 = !show1"
              >
                <template v-slot:append>
                  <v-icon v-if="successPass" color="green">{{
                    passRule
                  }}</v-icon>
                  <v-icon v-if="!successPass" color="red">{{
                    passRule
                  }}</v-icon>
                </template>
              </v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="30" sm="12" md="8">
              <v-text-field
                v-model="password2"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[required, min6, matchingPasswords]"
                :type="show2 ? 'text' : 'password'"
                name="password2"
                label="Confirmer mot de passe"
                counter
                @click:append="show2 = !show2"
              >
                <template v-slot:append>
                  <v-icon v-if="successPass1" color="green">{{
                    passRule1
                  }}</v-icon>
                  <v-icon v-if="!successPass1" color="red">{{
                    passRule1
                  }}</v-icon>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-btn color="blue darken-1" text @click="changePassword">
          Valider
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  name: "PhotoUploader",
  data() {
    return {
      show: false,
      show1: false,
      show2: false,
      client: {},
      old_password: "",
      password: "",
      password2: "",
      successPass: false,
      successPass1: false,
      successPassOld: false,
    };
  },
  methods: {
    changePassword: function () {
        let _login = localStorage.getItem("login")
        let _password = this.old_password
        let data = {
          login:_login,
          password: _password,
          checkPass: true
        }
      axios.post("/user/auth/", data)
        .then((resp) => {
          console.log("Checking current password");
          if(resp.data)
            return resp.data
          else
            alert("L'ancien mot de passe est incorrect")
        })
        .then(user => {
          console.log("User ", user);
          const options = {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                'x-access-token': 'Bearer ' +localStorage.getItem("token")
              },
              
              body: JSON.stringify({
                id: user.id,
                login: user.login,
                password: this.password
              })
          };
          fetch(`/user`, options).then(resp => {
              return resp.json()
            }).then(data =>{
            console.log("ID ",data.count)
            if(data.count > 0){
              //then loggout
              this.$router.push('/login')
            }
          }).catch(err => {
            console.log(err)
          })
        })
        .catch((err) => {
          console.log("ERROR ", err.message);
        });
    },
    required: function (value) {
      if (value) {
        return true;
      } else {
        return "Champ requis.";
      }
    },
    min6: function (value) {
      if (value.length >= 6) {
        return true;
      } else {
        return "Au moins 6 caractères requis.";
      }
    },
    matchingPasswords: function () {
      if (this.password === this.password2) {
        return true;
      } else {
        return "Mots de passe différents.";
      }
    },
  },
  computed: {
    oldPassRule: function () {
      if (this.old_password === "") {
        // field is empty
        this.successPassOld = false;
        return "";
      } else if (this.min6(this.old_password) === true) {
        // password ok
        this.successPassOld = true;
        return "mdi-check";
      } else {
        // password wrong
        this.successPassOld = false;
        return "mdi-close";
      }
    },
    passRule: function () {
      if (this.password === "") {
        // field is empty
        this.successPass = false;
        return "";
      } else if (this.min6(this.password) === true) {
        // password ok
        this.successPass = true;
        return "mdi-check";
      } else {
        // password wrong
        this.successPass = false;
        return "mdi-close";
      }
    },
    passRule1: function () {
      if (this.password2 === "") {
        // field is empty
        this.successPass1 = false;
        return "";
      } else if (
        this.min6(this.password2) === true &&
        this.matchingPasswords() === true
      ) {
        // password ok
        this.successPass1 = true;
        return "mdi-check";
      } else {
        // password wrong
        this.successPass1 = false;
        return "mdi-close";
      }
    },
  },
  created: function () {},
};
</script>