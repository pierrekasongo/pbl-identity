<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>


    <v-data-table
      :headers="headers"
      :items="data"
      :search="search"
      :loading="!data.length"
      loading-text="En cours de chargement..."
    >
      <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Liste des utilisateurs</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Ajouter
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.login"
                      :rules="[rules.required]"
                      label="Login"
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.nom"
                      :rules="[rules.required]"
                      label="Nom"
                    ></v-text-field>
                  </v-col>
                  
                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-combobox
                      v-model="editedItem.role"
                      :rules="[rules.required]"
                      :items="roles"
                      label="Rôle"
                    ></v-combobox>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="password"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.min]"
                      :type="show1 ? 'text' : 'password'"
                      name="password"
                      label="Mot de passe"
                      counter
                      @click:append="show1 = !show1"
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="password"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.min]"
                      :type="show1 ? 'text' : 'password'"
                      name="password2"
                      label="Confirmer mot de passe"
                      counter
                      @click:append="show1 = !show1"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Annuler
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Valider
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog
          v-model="passwordDialog"
          max-width="500px"
        >
        
          <v-card>
            <v-card-title>
              <span class="text-h5">Modifier le mot de passe</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="password"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.min]"
                      :type="show1 ? 'text' : 'password'"
                      name="password"
                      label="Mot de passe"
                      counter
                      @click:append="show1 = !show1"
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="password"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.min]"
                      :type="show1 ? 'text' : 'password'"
                      name="password2"
                      label="Confirmer mot de passe"
                      counter
                      @click:append="show1 = !show1"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="closePassword"
              >
                Annuler
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="savePassword"
              >
                Valider
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Voulez-vous vraiment supprimer cet enregistrement?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Annuler</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-toolbar>
    </template>
    
    <template v-slot:[`item.actions`]="{item}">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>

      <v-icon
        small
        class="mr-2"
        @click="editPassword(item)"
      >
        mdi-eye
      </v-icon>

      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
    </v-data-table>

  </v-card>
</template>
<script>
  export default {
    data () {
      return {
        show1: false,
        search: '',
        dialog: false,
        passwordDialog: false,
        dialogDelete: false,
        headers: [
          { text: 'ID', value: 'id', align: 'right' },
          { text: 'Login', value: 'login', align: 'right' },
          { text: 'Nom', value: 'nom', align: 'right' },
          { text: 'Role', value: 'role', align: 'right' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        roles:["admin", "infirmier"],//Extract this from the DB
        data:[],
        rules: {
          required: value => !!value || 'Champ requis.',
          min: v => v.length >= 8 || 'Min 8 caractères',
        },
        editedIndex: -1,
        editedItem: {
          id:0,
          nom: '',
        },
        defaultItem: {
          nom: '',
        },
      }
        
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Ajouter' : 'Editer'
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
    created:function(){
      this.initialize()
    },
    methods: {
      initialize(){
        fetch("/user/").then(resp => {
        return resp.json()
      }).then(data =>{
        console.log(data)
        this.data = data
      }).catch(err => console.log(err))
      },
      editItem (item) {
        this.editedIndex = this.data.indexOf(item)
        this.editedItem = Object.assign({}, item)
        console.log(item)
        this.dialog = true
      },

      editPassword (item) {
        this.editedIndex = this.data.indexOf(item)
        this.editedItem = Object.assign({}, item)
        console.log(item)
        this.passwordDialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.data.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.data.splice(this.editedIndex, 1)
        console.log("INDEX ",this.editedItem.id)
        const options = {
            method: "DELETE",
          };
          fetch(`/entreprise/${this.editedItem.id}`, options).then(resp => {
              return resp.json()
            }).then(data =>{
            console.log("ID ",data.count)
            if(data.count > 0){
              this.initialize()
            }
          }).catch(err => console.log(err))
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closePassword () {
        this.passwordDialog = false
        /*this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })*/
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          const options = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                      id:this.editedItem.id, 
                      nom: this.editedItem.nom,
                      login:this.editedItem.login,
                      password: this.editedItem.password,

                    })
          };
          fetch(`/user`, options).then(resp => {
              return resp.json()
            }).then(data =>{
            console.log("ID ",data.count)
            if(data.count > 0){
              this.initialize()
              //Object.assign(this.data[this.editedIndex], this.editedItem)
            }
          }).catch(err => console.log(err))
        } else {
          console.log("POST",this.editedItem.nom)
          const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({nom: this.editedItem.nom})
          };
          fetch(`/user`, options).then(resp => {
              return resp.json()
            }).then(data =>{
            console.log("ID ",data.id)
            if(data.id > 0){
              this.initialize()
              //this.data.push(this.editedItem)
            }
              
          }).catch(err => console.log(err))
          
        }
        this.close()
    }
  },
  }
</script>