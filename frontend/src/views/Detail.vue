
<template>

  <v-card>
    <v-tabs
      v-model="tabs"
      background-color="orange lighten-2"
      dark
    >
      <v-tab>
        Informations de l'abonné
      </v-tab>

      <v-tab>
        Famille
      </v-tab>

      <v-tab >
        Visites
      </v-tab>
    </v-tabs>

     <v-tabs-items v-model="tabs">
      <v-tab-item>
        <Client-detail :clientId="this.$route.params.id" />
      </v-tab-item>

      <v-tab-item>
        <Famille :parentId="this.$route.params.id" />
      </v-tab-item>

      <v-tab-item>
        <Visite :clientId="this.$route.params.id" />
      </v-tab-item>

    </v-tabs-items>
  </v-card>
  
</template>

<script>
import ClientDetail from '../components/ClientDetail'
import Visite from '../components/Visite'
import Famille from '../components/Famille'
export default {
    name:"Detail",
    data: () => ({
      tabs: null,
    }),
    components:{
      ClientDetail,
      Visite,
      Famille
    },
  }
</script>
