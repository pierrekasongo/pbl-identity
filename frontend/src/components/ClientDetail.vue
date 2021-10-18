<style scoped>
.card-detail{
  margin:20px;
  padding:20px;
}
</style>
<template>
<v-card class="card-detail">
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
      >
        <v-img
              height="100"
              width="80"
              :src="`/uploads/${client.photo}`"
            ></v-img>

      <v-col
        cols="12"
        sm="6"
        md="4"
      >
        <v-btn
          color="success"
          dark
          small
          @click="gotoUpload"
        >
          <v-icon dark>mdi-camera</v-icon>
        </v-btn>
      </v-col>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
      >
          Prénom/Nom/Postnom: 
      </v-col>
      <v-col 
        cols="12"
        sm="6"
        md="4"
      >
        {{client.nom}} {{client.postnom}} {{client.prenom}}
      </v-col>
    </v-row>

    <v-row>
      <v-col 
        cols="12"
        sm="6"
        md="4"
      >
          Sexe: 
      </v-col>
      <v-col 
        cols="12"
        sm="6"
        md="4"
      >
        {{client.sexe}}
      </v-col>
    </v-row>

    <v-row>
      <v-col 
        cols="12"
        sm="6"
        md="4"
      >
          Date de naissance: 
      </v-col>
      <v-col 
        cols="12"
        sm="6"
        md="4"
      >
        {{ client.date_naissance}}
      </v-col>
    </v-row>
    <v-row>
      <v-col 
        cols="12"
        sm="6"
        md="4"
      >
          Localisation: 
      </v-col>

      <v-col 
        cols="12"
        sm="6"
        md="4"
      >
        {{client.localisation}}
      </v-col>
    </v-row>

    <v-row>
      <v-col 
        cols="12"
        sm="6"
        md="4"
      >
        Entreprise: 
      </v-col>
      <v-col 
        cols="12"
        sm="6"
        md="4"
      >
      {{client.entreprise}}
        
      </v-col>
    </v-row>

    <v-row>
      <v-col 
        cols="12"
        sm="6"
        md="4"
      >
        Matricule: 
      </v-col>
      <v-col 
        cols="12"
        sm="6"
        md="4"
      >{{client.num_id}}

      </v-col>
    </v-row>
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
    components:{
    },
    methods:{
      gotoUpload:function(){
        this.$router.push({
          name: 'upload',
          params: {client: this.client.id}
        })
      }
    },
    created:function(){
      let id = this.clientId
      this.loading = true
      const options ={
        headers:{
          'x-access-token': 'Bearer ' +localStorage.getItem("token")
        }
      }
      fetch(`/client/${id}`, options).then(resp => {
        if(resp.status == 401){
            this.$router.push('/login')
        }else
          return resp.json()
      }).then(data =>{
        console.log("CLIENT ",data)
        this.client = data
        this.loading = false
      }).catch(err => {
          console.log(err)
          this.$route.push('/login')
      })
    },

  }
</script>
