<template>
  <v-data-table
    :headers="headers"
    :items="data"
    sort-by="nom"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Liste des entreprises</v-toolbar-title>
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
                      v-model="editedItem.nom"
                      label="Nom de l'entreprise"
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
</template>
<script>
  export default {
    data () {
      return {
        dialog: false,
        dialogDelete: false,
        headers: [
          { text: 'ID', value: 'id', sortable:false },
          { text: 'Nom', value: 'nom' },
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
        console.log("Entreprise")
        fetch("/entreprise/").then(resp => {
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
            body: JSON.stringify({id:this.editedItem.id, nom: this.editedItem.nom})
          };
          fetch(`/entreprise`, options).then(resp => {
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
          fetch(`/entreprise`, options).then(resp => {
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