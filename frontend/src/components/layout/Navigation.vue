<template>
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
          <v-list-item-icon 
          >
            <v-icon dark>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content 
            class="white--text font-weight-bold"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>
<script>
export default {
    data: () => ({ 
      drawer: null,
      role:'',
      items: [
          /*{ title: 'Acceuil', icon: 'mdi-view-home', to:'/'},*/
          { title: 'Abonnés', icon: 'mdi-account-group-outline', to:'/client',role:['*']},
          { title: 'Visites', icon: 'mdi-hospital', to:'/visite-page',role:['Admin','Gestionnaire']},
          { title: 'Entreprises', icon: 'mdi-domain', to:'/entreprise',role:['Admin']},
          { title: 'Changer mot de passe', icon: 'mdi-key', to:'/compte',role:['*']},
          { title: 'Utilisateurs', icon: 'mdi-account-cog', to:'/user',role:['Admin']},
          { title: 'Sauvegarde', icon: 'mdi-backup-restore', to:'/sauvegarde',role:['*']},
          { title: 'Déconnexion', icon: 'mdi-logout', to:'/logout',role:['*']},
        ],
        right: null,
      }),
      created:function(){
        
      },
      beforeMount:function(){
        console.log("Before mount")
        const role = localStorage.getItem("role")//this.$store.state.user.role
        console.log("Role ",role)
        this.items = this.items.filter(v => v.role.includes(role)  ||  v.role.includes('*'))
      }
}
</script>