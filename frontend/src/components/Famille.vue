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
      @click:row="handleRowClick"
    ></v-data-table>
  </v-card>
</template>
<script>
  export default {
    name:'Famille',
    props:['parentId'],
    data () {
      return {
        search: '',
        headers: [
          { text: 'Prénom', value: 'prenom', align: 'right'},
          { text: 'Nom', value: 'nom', align: 'right'},
          { text: 'PostNom', value: 'postnom', align: 'right'},
          { text: 'Sexe', value: 'sexe', align: 'right'},
          { text: 'Date naissance', value: 'date_naissance', align: 'right'},
          { text: 'Relation', value: 'relation', align: 'right'},
         
        ],
        data:[],
      }
        
    },
    methods:{
      handleRowClick:function(row){
        console.log(row.id, row.nom)
        //this.$router.push({ name:"client-detail", params: {id: row.id} })
      }
    },
    created: function(){
      let id = this.parentId
      fetch(`/famille/${id}`).then(resp => {
        console.log("RESPONSE ",resp)
        return resp.json()
      }).then(data =>{

        console.log("DATA ",data)
        this.data = data

      }).catch(err => console.log(err))
    }
  }
  
</script>