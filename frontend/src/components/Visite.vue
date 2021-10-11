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
      @click:row="handleRowClick"
    ></v-data-table>
  </v-card>
</template>
<script>
  export default {
    name: 'Visite',
    props:['clientId'],
    data () {
      return {
         search: '',
        headers: [
          { text: 'Date visite', value: 'date_visite', align: 'right'},
          { text: 'Patient', value: 'client', align: 'right' ,groupable: false},
          { text: 'Motif', value: 'motif', align: 'right',groupable: false },
          { text: 'Utilisateur', value: 'utilisateur', align: 'right'}
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
    created:function(){
      let id = this.clientId
      fetch(`/visite/${id}`).then(resp => {
          return resp.json()
        }).then(data =>{
          console.log(data)
          this.data = data
        }).catch(err => console.log(err))
      
    }
  }
  
</script>