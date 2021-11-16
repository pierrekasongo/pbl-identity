<template>
  <v-card>
    <v-row>
      <v-col
        style="max-width: 300px"
        v-if="role == 'Admin' || role == 'Gestionnaire'"
      >
        <v-row class="pa-2" justify="space-between">
          <v-col>
            <v-sheet class="pa-4 primary lighten">
              <v-text-field
                v-model="searchStructure"
                label="Chercher entreprise"
                dark
                flat
                solo-inverted
                hide-details
                clearable
                clear-icon="mdi-close-circle-outline"
              ></v-text-field>
            </v-sheet>
            <v-treeview
              v-model="selectedStructure"
              :active.sync="active"
              :items="items"
              :search="searchStructure"
              :filter="filter"
              :load-children="fetchStructure"
              :open.sync="open"
              activatable
              color="warning"
              open-on-click
              transition
              @update:active="onSelect"
            >
              <template v-slot:prepend="{ item }">
                <v-icon v-if="!item.children"> mdi-domain </v-icon>
              </template>
            </v-treeview>
          </v-col>
        </v-row>
      </v-col>

      <v-col>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Rechercher"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>

        <v-data-table
          v-model="filtered"
          :headers="headers"
          :items="filtered"
          :search="search"
          :loading="!data.length"
          loading-text="En cours de chargement..."
          class="elevation-1"
          show-group-by
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Liste des abonnés</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-btn color="secondary" dark class="mb-2">
                <v-icon dark>mdi-download</v-icon>
                <download-excel :data="data"> Télécharger </download-excel>
              </v-btn>
              <v-divider class="mx-4" inset vertical></v-divider>

              <v-dialog v-model="dialog" max-width="500px">
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
                          <v-col cols="12" sm="6" md="4">
                            <img
                              :src="`/uploads/${editedItem.photo}`"
                              alt=""
                              width="50"
                              height="50"
                            />
                          </v-col>
                        </template>
                      </v-row>

                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.num_dossier"
                            label="Numéro dossier"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.prenom"
                            label="Prénom"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.nom"
                            label="Nom"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.postnom"
                            label="Postnom"
                          ></v-text-field>
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="formattedDate"
                                label="Date de naissance"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="formattedDate"
                              active-picker="YEAR"
                              :max="
                                new Date(
                                  Date.now() -
                                    new Date().getTimezoneOffset() * 60000
                                )
                                  .toISOString()
                                  .substr(0, 10)
                              "
                              min="1750-01-01"
                              @change="saveDate"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                          <v-combobox
                            v-model="editedItem.sexe"
                            :items="sexe"
                            label="Sexe"
                          ></v-combobox>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.localisation"
                            label="Localisation"
                          ></v-text-field>
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-select
                            label="Entreprise"
                            v-model="editedItem.entreprise_id"
                            :items="entreprise"
                            item-text="nom"
                            item-value="id"
                            return-object
                          ></v-select>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
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
                    <v-btn color="blue darken-1" text @click="close">
                      Annuler
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save">
                      Valider
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5"
                    >Voulez-vous vraiment supprimer cet
                    enregistrement?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete"
                      >Annuler</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                      >OK</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>

            <v-icon small class="mr-2" @click="handleRowClick(item)">
              mdi-eye
            </v-icon>

            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize"> Reset </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import Vue from "vue";
import JsonExcel from "vue-json-excel";
Vue.component("downloadExcel", JsonExcel);

export default {
  data() {
    return {
      menu: false,
      role: "",
      search: "",
      searchStructure: null,
      dialog: false,
      dialogDelete: false,
      sexe: ["M", "F"],
      entreprise: [],
      structures: [],
      selectedStructure: [],
      headers: [
        {
          text: "Numéro dossier",
          value: "num_dossier",
          align: "right",
          groupable: false,
        },
        { text: "Prénom", value: "prenom", align: "right", groupable: false },
        { text: "Nom", value: "nom", align: "right", groupable: false },
        { text: "PostNom", value: "postnom", align: "right", groupable: false },
        { text: "Sexe", value: "sexe", align: "right" },
        {
          text: "Date naissance",
          value: "date_naissance",
          align: "right",
          groupable: false,
        },
        {
          text: "Localisation",
          value: "localisation",
          align: "right",
          groupable: false,
        },
        {
          text: "Entreprise",
          value: "entreprise",
          align: "right",
          groupable: false,
        },
        {
          text: "Matricule",
          value: "num_id",
          align: "right",
          groupable: false,
        },
        { text: "Actions", value: "actions", sortable: false },
      ],
      data: [],
      filtered: [],

      editedIndex: -1,
      editedItem: {
        id: 0,
        nom: "",
      },
      defaultItem: {
        nom: "",
      },

      active: [],
      open: [],
      formattedDate:''

      /*date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      dateFormatted: this.formatDate(
        new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10)
      ),
      menu1: false,
      menu2: false,*/
    };
  },
  component: {
    JsonExcel,
  },
  computed: {
    filterData() {},
    filter() {
      return (item, searchStructure, textKey) =>
        item[textKey].indexOf(searchStructure) > -1;
    },
    /*computedDateFormatted() {
      return this.formatDate(this.date);
    },*/
    formTitle() {
      return this.editedIndex === -1 ? "Ajouter" : "Editer";
    },

    items() {
      return [
        {
          name: "Entreprises",
          children: this.structures,
        },
      ];
    },
  },

  watch: {
    active: {
      handler(value) {
        if (!this.active.length) this.filtered = [...this.data];
        else {
          let d = [...this.data];
          this.filtered = d.filter((d) => d.entreprise_id == value);
        }
      },
    },
    /*date(val) {
      this.dateFormatted = this.formatDate(this.date);
    },*/
    dialog(val) {
      this.loadEntreprise();
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created: function () {
    this.initialize();
  },
  methods: {
    saveDate(date) {
      this.$refs.menu.save(date);
    },
    /*formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [day, month, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },*/
    onSelect(selected) {
      //this.data.find(d => d.entreprise_id == selected)
    },
    async fetchStructure(item) {
      let st = await this.loadEntreprise();
      st.forEach((e) => {
        item.children.push({
          id: e.id,
          name: e.nom,
        });
      });
    },
    randomAvatar() {
      this.avatar = avatars[Math.floor(Math.random() * avatars.length)];
    },
    initialize() {
      let endpoint =
        localStorage.getItem("role") == "Encodeur"
          ? `/client/by_entreprise/${localStorage.getItem("entreprise")}`
          : `/client/`;
      const options = {
        headers: {
          "x-access-token": "Bearer " + localStorage.getItem("token"),
        },
      };
      fetch(endpoint, options)
        .then((resp) => {
          console.log("RESPONSE ", resp);
          if (resp.status == 401) {
            this.$router.push("/login");
          } else return resp.json();
        })
        .then((data) => {
          console.log("CLIENT ", data);
          this.data = data;
          this.filtered = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async loadEntreprise() {
      const options = {
        headers: {
          "x-access-token": "Bearer " + localStorage.getItem("token"),
        },
      };
      return fetch("/entreprise/", options)
        .then((resp) => {
          console.log("ENTREPRISES");
          if (resp.status == 401) {
            this.$router.push("/login");
          } else return resp.json();
        })
        .then((data) => {
          console.log("Entreprises ", data);
          this.entreprise =
            this.$store.state.user.role.toLowerCase() == "encodeur"
              ? data.filter((e) => e.id == this.$store.state.user.entreprise)
              : data;
          return data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleRowClick: function (row) {
      console.log(row.id, row.nom);
      this.$router.push({ name: "client-detail", params: { id: row.id } });
    },
    editItem(item) {
      this.loadEntreprise();
      this.editedIndex = this.data.indexOf(item);
      let d = item.date_naissance.split('-')
      this.formattedDate = d[2]+'-'+d[1]+'-'+d[0]
      this.editedItem = Object.assign({}, item);
      console.log(item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.data.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.data.splice(this.editedIndex, 1);
      console.log("INDEX ", this.editedItem.id);
      const options = {
        method: "DELETE",
        headers: {
          "x-access-token": "Bearer " + localStorage.getItem("token"),
        },
      };
      fetch(`/client/${this.editedItem.id}`, options)
        .then((resp) => {
          if (resp.status == 401) {
            this.$router.push("/login");
          } else return resp.json();
        })
        .then((data) => {
          console.log("ID ", data.count);
          if (data.count > 0) {
            this.initialize();
          }
        })
        .catch((err) => {
          console.log(err);
          this.$route.push("/login");
        });
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.formattedDate = '';
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        console.log("EDITING", this.editedItem.entreprise_id);

        const options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": "Bearer " + localStorage.getItem("token"),
          },

          body: JSON.stringify({
            id: this.editedItem.id,
            prenom: this.editedItem.prenom,
            nom: this.editedItem.nom,
            postnom: this.editedItem.postnom,
            sexe: this.editedItem.sexe,
            date_naissance: this.formattedDate,
            localisation: this.editedItem.localisation,
            entreprise: this.editedItem.entreprise_id,
            matricule: this.editedItem.num_id,
            num_dossier: this.editItem.num_dossier,
          }),
        };
        fetch(`/client/`, options)
          .then((resp) => {
            if (resp.status == 401) {
              this.$router.push("/login");
            } else return resp.json();
          })
          .then((data) => {
            console.log("ID ", data.count);
            if (data.count > 0) {
              this.initialize();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log("POSTING");
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            prenom: this.editedItem.prenom,
            nom: this.editedItem.nom,
            postnom: this.editedItem.postnom,
            sexe: this.editedItem.sexe,
            date_naissance: this.editedItem.date_naissance,
            localisation: this.editedItem.localisation,
            entreprise: this.editedItem.entreprise_id,
            matricule: this.editedItem.matricule,
            num_dossier: this.editItem.num_dossier,
          }),
        };
        fetch(`/client/`, options)
          .then((resp) => {
            if (resp.status == 401) {
              this.$router.push("/login");
            } else return resp.json();
          })
          .then((data) => {
            console.log("ID ", data.id);
            if (data.id > 0) {
              this.initialize();
              //this.data.push(this.editedItem)
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
      this.close();
    },
  },
  /*mounted:function(){
    this.$router.go()
  },*/
  created: function () {
    this.role = localStorage.getItem("role");
    this.initialize();
  },
};
</script>