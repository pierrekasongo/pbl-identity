<style scoped>
.card-detail {
  margin: 20px;
  padding: 20px;
}
</style>
<template>
  <v-container>
    <v-toolbar flat>
      <v-toolbar-title>Création du dispatch</v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <v-btn @click="generate" color="primary darken-2" large>
                <v-icon dark>mdi-cloud-upload</v-icon>
                Générer le dispatch</v-btn
              >
            </v-col>
            <v-col>
              <v-progress-circular
                v-if="generating"
                indeterminate
                color="red"
              ></v-progress-circular>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>

    <v-toolbar flat>
      <v-toolbar-title>Dispatches disponibles</v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-spacer></v-spacer>

      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title class="text-h5"
            >Voulez-vous vraiment charger ce dispatch?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">Annuler</v-btn>
            <v-btn color="blue darken-1" text @click="loadConfirm">OK</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-card>
      <v-card-text>
        <v-container>
          <v-progress-circular
            v-if="restoring"
            indeterminate
            color="red"
          ></v-progress-circular>
          <v-data-table :headers="headers" :items="files" class="elevation-1">
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="selectItem(item)">
                mdi-upload
              </v-icon>
            </template>
          </v-data-table>
        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  name: "Sauvegarde",
  data() {
    return {
      dialog: false,
      generating: false,
      restoring: false,
      file: null,
      files: [],
      headers: [
        { text: "Nom", value: "nom" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      selectedFile: {
        nom: "",
      },
    };
  },
  methods: {
    generate: function () {
      this.generating = true;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": "Bearer " + localStorage.getItem("token"),
        },
      };
      fetch("/database/", options)
        .then((resp) => {
          console.log("Generate dispatch");
          return resp.json();
        })
        .then((data) => {
          console.log("Data ", data);
          if (data.success) {
            alert(`Dispatch généré avec succès`);
          } else alert("Le processus a echoué");
          this.generating = false;
        })
        .catch((err) => {
          console.log("ERROR ", err.message);
        });
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.selectedItem = Object.assign({}, this.defaultItem);
      });
    },
    selectItem(item) {
      this.selectedFile = item;
      console.log(this.selectedFile);
      this.dialog = true;
    },
    initialize() {
      const options = {
        headers: {
          "x-access-token": "Bearer " + localStorage.getItem("token"),
        },
      };
      axios
        .get("/database/", options)
        .then((resp) => {
          console.log("Get files");
          console.log("Response ", resp.data);
          if (resp.data.length > 0) {
            console.log("Inside");
            this.files = resp.data;
          }
        })
        .catch((err) => {
          console.log("ERROR ", err.message);
        });
    },
    loadConfirm() {
      console.log("Selected ", this.selectedFile.nom);
      this.restoring = true;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": "Bearer " + localStorage.getItem("token"),
        },

        body: JSON.stringify({ filename: this.selectedFile.nom }),
      };
      fetch("/database/", options)
        .then((resp) => {
          console.log("Restoring dispatch");
          return resp.json();
        })
        .then((data) => {
          console.log("Data ", data);
          if (data.success) {
            alert(`Dispatch restauré avec succès`);
            this.initialize();
          } else alert("Le processus a echoué");
          this.restoring = false;
        })
        .catch((err) => {
          console.log("ERROR ", err.message);
        });
      this.close();
    },
    watch: {
      /*dialog(val) {
        val || this.close();
      },*/
    },
  },
  created: function () {
    this.initialize();
  },
};
</script>