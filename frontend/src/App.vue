<template>
  <v-app id="inspire">

    <v-navigation-drawer
      v-model="drawer"
      app
      class="primary darken-1 white--text font-weight-bold"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6 white--text font-weight-bold">
            PBL IDENTITY
          </v-list-item-title>
          <v-list-item-subtitle class="white--text">
            version 1.0
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          link
        >
          <v-list-item-icon >
            <v-icon >{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content class="white--text font-weight-bold">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar 
    app
    class="primary darken-1  white--text"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title >Bienvenue</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <!--  -->
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({ 
      drawer: null,
      items: [
          { title: 'Acceuil', icon: 'mdi-view-home', to:'/'},
          { title: 'Abonnés', icon: 'mdi-view-dashboard', to:'/client'},
          { title: 'Visites', icon: 'mdi-image', to:'/visite-page'},
          { title: 'Entreprises', icon: 'mdi-view-dashboard', to:'/entreprise'},
          { title: 'Changer mot de passe', icon: 'mdi-help-box', to:'/compte'},
          { title: 'Utilisateurs', icon: 'mdi-help-box', to:'/user'},
        ],
        right: null,
      }),
  }
</script>