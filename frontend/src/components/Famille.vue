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
      class="elevation-1"
    >
    
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Composition familiale</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-btn color="secondary" dark class="mb-2">
            <v-icon dark>mdi-download</v-icon>
            <download-excel :data="data">
              Télécharger
            </download-excel>
          </v-btn>
          <v-divider class="mx-4" inset vertical></v-divider>
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
                    <v-select
                      label="Relation"
                      v-model="editedItem.relation"
                      :items="relations"
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
                      v-model="editedItem.localisation"
                      label="Localisation"
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
    <template v-slot:[`item.photo`]="{item}">
      <div class="p-2">
        <v-img :src="`/uploads/${item.photo}`"  height="100px" width="100px"></v-img>
      </div>
    </template>
    <template v-slot:[`item.actions`]="{item}">
      <v-icon small
        class="mr-2"
        @click="gotoUpload(item)">
        mdi-camera
      </v-icon>
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
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
import Vue from "vue";
import JsonExcel from "vue-json-excel";
Vue.component("downloadExcel", JsonExcel);
  export default {
    name:'Famille',
    props:['parentId'],
    data () {
      return {
        search: '',
        dialog: false,
        relations:[],
        dialogDelete: false,
        sexe:["M","F"],
        headers: [
          { text: 'ID', value: 'id', align: 'right'},
          { text: 'Prénom', value: 'prenom', align: 'right'},
          { text: 'Nom', value: 'nom', align: 'right'},
          { text: 'PostNom', value: 'postnom', align: 'right'},
          { text: 'Sexe', value: 'sexe', align: 'right'},
          { text: 'Date naissance', value: 'date_naissance', align: 'right'},
          { text: 'Relation', value: 'relation', align: 'right'},
          { text: 'Localisation', value: 'localisation', align: 'right'},
          { text: "Photo", value: "photo", sortable: false },
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
    component:{
      JsonExcel
    },
    methods:{
      gotoUpload:function(item){
        console.log("CLIENT ID", item.id)
        this.$router.push({
          name: 'upload',
          params: {client: item.id}
        })
      },
      loadRelation(){
        const options = {
          headers:{
            'x-access-token': 'Bearer ' +localStorage.getItem("token")
          }
        }
        fetch(`/relation/`, options).then(resp => {
          console.log("Feching relations")
          if(resp.status == 401){
            this.$router.push('/login')
          }else
            return resp.json()
        }).then(d =>{
          console.log("Relations ", d)
          this.relations = d.data
        }).
        catch(err => {
            console.log("ERROR ",err.message)
        })
      },
      initialize(){
        let id = this.parentId
        let include = 0
        const options ={
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
          console.log("DATA ",data)
          this.data = data
        }).catch(err => {
            console.log(err)
        })
      },
      editItem (item) {
        this.editedIndex = item.id
        this.editedItem = Object.assign({}, item)
        console.log(item)
        this.dialog = true
      },
      deleteItem (item) {
        this.editedIndex = item.id
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
          console.log("EDITING ", this.editedItem.id)
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
              relation: this.editedItem.relation,
              localisation: this.editedItem.localisation,
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
              relation: this.editedItem.relation,
              localisation: this.editedItem.localisation,
              parent: this.parentId
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
        }
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
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
    created: function(){
      this.initialize()
      this.loadRelation()
    }
  }
  
</script>