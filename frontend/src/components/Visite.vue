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
      group-by="date_visite"
      class="elevation-1"
      show-group-by
    >
      <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Visites</v-toolbar-title>
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
                      v-model="editedItem.date_visite"
                      label="Date visite"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-select
                      label="Patient"
                      v-model="editedItem.client"
                      :items="patients"
                      item-text="name"
                      item-value="id"
                      return-object
                    ></v-select>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.motif"
                      label="Motif"
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
import axios from 'axios'
  export default {
    name: 'Visite',
    props:['clientId'],
    data () {
      return {
        dialog: false,
        dialogDelete: false,
        search: '',
        headers: [
          { text: 'ID', value: 'id', align: 'right',groupable: false},
          { text: 'Date visite', value: 'date_visite', align: 'right'},
          { text: 'Patient', value: 'client', align: 'right' ,groupable: false},
          { text: 'Motif', value: 'motif', align: 'right',groupable: false },
          { text: 'Utilisateur', value: 'utilisateur', align: 'right'},
          { text: 'Actions', value: 'actions', sortable: false }
        ],
        data:[],
        patients:[],
        editedIndex: -1,
        editedItem: {
          client: 0,
          motif:'',
          date_visite:''
        },
        defaultItem: {
          nom: '',
        },
      }  
    },
    methods:{
      loadFamille(){
        let id = this.clientId
        const include = 1
        console.log("CLIENT ID",id)
        const options = {
          headers:{
            'x-access-token': 'Bearer ' +localStorage.getItem("token")
          }
        }
        fetch(`/famille/${id}/${include}`, options).then(resp => {
          console.log("RESPONSE ",resp)
          if(resp.status == 401){
            this.$router.push('/login')
          }else
            return resp.json()
        }).then(data =>{
          console.log("FAMILLE INCLUDE",data)
          data.forEach(f => {
            const noms = f.prenom+" "+f.nom+" "+f.postnom
            this.patients.push({id:f.id, name:noms})
          })
        }).catch(err => {
            console.log("ERROR ",err.message)
            //this.$route.push('/login')
        })
      },
      initialize(){
        let id = this.clientId
        const options = {
          headers:{
            'x-access-token': 'Bearer ' +localStorage.getItem("token")
          }
        }
        fetch(`/visite/${id}`, options).then(resp => {
            if(resp.status == 401){
              this.$router.push('/login')
            }else
              return resp.json()
          }).then(data =>{
            console.log(data)
            this.data = data
          }).catch(err => {
            console.log(err)
            this.$router.push('/login')
        })
      },
      deleteItem (item) {
        this.editedIndex = item.id
        console.log("Deleted index ",item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },
      deleteItemConfirm () {
        this.data.splice(this.editedIndex, 1)
        console.log("INDEX ",this.editedItem.id)
          const options = {
            method: "DELETE",
            headers:{
              'x-access-token': 'Bearer ' +localStorage.getItem("token")
            }
          };
          fetch(`/visite/${this.editedItem.id}`, options).then(resp => {
              if(resp.status == 401){
                this.$router.push('/login')
              }
              if(resp.status == 200){
                this.initialize()
              }
            }).catch(err => {
              console.log(err)
              this.$route.push('/login')
            })
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      save () {
        console.log("POSTING")
        const options = {
            motif: this.editedItem.motif,
            date_visite: this.editedItem.date_visite,
            utilisateur: localStorage.getItem("user_id"),
            patient: this.clientId,
        }
        const headers = {
          "Content-Type": "application/json",
          'x-access-token': 'Bearer ' +localStorage.getItem("token")
        }
        axios.post(`/visite/`, options,{headers}).then(resp => {
          console.log("Result ",resp)
              if(resp.status == 401){
                this.$router.push('/login')
              }
              if(resp.status == 200){
                this.initialize()
              }
        }).catch(err => {
          console.log("ERROR ",err)
        })
        this.close()
      }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Ajouter' : 'Editer'
      },
    },
    watch: {
      dialog (val) {
        //this.loadFamille()
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
    created:function(){
      this.initialize()
      this.loadFamille()
    }
  }
</script>