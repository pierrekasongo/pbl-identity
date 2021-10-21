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
      group-by="entreprise"
      class="elevation-1"
      show-group-by
    >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Liste des abonnés</v-toolbar-title>
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
                  <template v-if="editedIndex > -1">
                    <v-col 
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <img :src="`/uploads/${editedItem.photo}`" alt="" width="50" height="50">
                  </v-col>
                  </template>                
                </v-row>

                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.prenom"
                      label="Prénom"
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.nom"
                      label="Nom"
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.postnom"
                      label="Postnom"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.date_naissance"
                      label="Date de naissance"
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-combobox
                      v-model="editedItem.sexe"
                      :items="sexe"
                      label="Sexe"
                    ></v-combobox>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.localisation"
                      label="Localisation"
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
                      label="Entreprise"
                      v-model="editedItem.entreprise_id"
                      :items="entreprise"
                      item-text="nom"
                      item-value="id"
                      return-object
                    ></v-select>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.num_id"
                      label="Matricule"
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
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>

       <v-icon
        small
        class="mr-2"
        @click="handleRowClick(item)"
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
        search: '',
        dialog: false,
        dialogDelete: false,
        sexe:["M","F"],
        entreprise:[],
        headers: [
          { text: 'Prénom', value: 'prenom', align: 'right',groupable: false},
          { text: 'Nom', value: 'nom', align: 'right' ,groupable: false},
          { text: 'PostNom', value: 'postnom', align: 'right',groupable: false },
          { text: 'Sexe', value: 'sexe', align: 'right'},
          { text: 'Date naissance', value: 'date_naissance', align: 'right',groupable: false },
          { text: 'Localisation', value: 'localisation', align: 'right',groupable: false },
          {text:  'Entreprise', value: 'entreprise', align: 'right'},
          { text: 'Matricule', value: 'num_id', align: 'right' ,groupable: false},
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        data:[],
       
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
        this.loadEntreprise()
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
    created:function(){
       this.initialize()
    },
    methods:{
      initialize(){
        const options={
          headers:{
            'x-access-token': 'Bearer ' +localStorage.getItem("token")
          }
        }
        fetch("/client/",options
          ).then(resp => {
          console.log("RESPONSE ",resp)
          if(resp.status == 401){
            this.$router.push('/login')
          }else
            return resp.json()
        }).then(data =>{
          console.log("CLIENT ", data)
          this.data = data
        }).catch(err => {
          console.log(err)
        })
      },
      loadEntreprise(){
        const options={
           headers:{
            'x-access-token': 'Bearer ' +localStorage.getItem("token")
          }
        }
        fetch("/entreprise/",options
         ).then(resp => {
          console.log("ENTREPRISES")
          if(resp.status == 401){
            this.$router.push('/login')
          }else
            return resp.json()
        }).then(data =>{
          console.log("Entreprises ",data)
          this.entreprise = data
        }).catch(err => {
          console.log(err)
        })
      },
      handleRowClick:function(row){
        console.log(row.id, row.nom)
        this.$router.push({ name:"client-detail", params: {id: row.id} })
      },
      editItem (item) {
        this.loadEntreprise()
        this.editedIndex = this.data.indexOf(item)
        this.editedItem = Object.assign({}, item)
        console.log(item)
        this.dialog = true
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
            headers:{
              'x-access-token': 'Bearer ' +localStorage.getItem("token")
            }
          };
          fetch(`/client/${this.editedItem.id}`, options).then(resp => {
            if(resp.status == 401){
            this.$router.push('/login')
          }else
              return resp.json()
          }).then(data =>{
            console.log("ID ",data.count)
            if(data.count > 0){
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
        if (this.editedIndex > -1) {

          console.log("EDITING", this.editedItem.entreprise_id)
          
          const options = {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
               'x-access-token': 'Bearer ' +localStorage.getItem("token")
            },
             
            body: JSON.stringify({
              id:this.editedItem.id,
              prenom: this.editedItem.prenom,
              nom: this.editedItem.nom,
              postnom: this.editedItem.postnom,
              sexe: this.editedItem.sexe,
              date_naissance:this.editedItem.date_naissance,
              localisation: this.editedItem.localisation,
              entreprise: this.editedItem.entreprise_id,
              matricule: this.editedItem.num_id,
            })
          };
          fetch(`/client/`, options).then(resp => {
            if(resp.status == 401){
              this.$router.push('/login')
            }else
              return resp.json()
            }).then(data =>{
            console.log("ID ",data.count)
            if(data.count > 0){
              this.initialize()
            }
          }).catch(err => {
          console.log(err)
        })
        } else {
          console.log("POSTING")
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'x-access-token': 'Bearer ' +localStorage.getItem("token")
            },
            body: JSON.stringify({
              prenom: this.editedItem.prenom,
              nom: this.editedItem.nom,
              postnom: this.editedItem.postnom,
              sexe: this.editedItem.sexe,
              date_naissance:this.editedItem.date_naissance,
              localisation: this.editedItem.localisation,
              entreprise: this.editedItem.entreprise,
              matricule: this.editedItem.matricule,
            })
          };
          fetch(`/client/`, options).then(resp => {
            if(resp.status == 401){
              this.$router.push('/login')
            }else
              return resp.json()
            }).then(data =>{
            console.log("ID ",data.id)
            if(data.id > 0){
              this.initialize()
              //this.data.push(this.editedItem)
            }
              
          }).catch(err => {
          console.log(err)
        })
          
        }
        this.close()
      }
    },
    created:function(){
      this.initialize()
    },
    
  }
  
</script>