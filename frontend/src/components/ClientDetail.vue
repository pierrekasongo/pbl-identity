
<template>
  <v-card
    :loading="loading"
    class="mx-auto my-12"
    max-width="374"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>

    <v-card-title>{{client.nom}} {{client.postnom}} {{client.prenom}}</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >

        <div class="grey--text ms-4">
          Sexe: {{client.sexe}} | Date de naissance: {{ client.date_naissance}}
        </div>
        
        <div>Localisation: {{client.localisation}}</div>

        <div class="my-4 text-subtitle-1">
          Entreprise: {{client.entreprise}} | Matricule: {{client.num_id}}
        </div>
      </v-row>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions>
      <v-btn
        color="deep-purple lighten-2"
        text
        @click="showEdit"
      >
        Editer
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    name: 'ClientDetail',
    props:['clientId'],
    data: () => ({
      client:{},
      loading: false
    }),
    methods:{
      showEdit:function(){

      }
    },
    created:function(){
      let id = this.clientId
      this.loading = true
       fetch(`/client/${id}`).then(resp => {
        return resp.json()
      }).then(data =>{
        console.log("CLIENT ",data)
        this.client = data
        this.loading = false
      }).catch(err => console.log(err))
    },

  }
</script>
