<template>
  <v-app-bar 
    app
    class="primary darken-1  white--text"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title >Bienvenue {{username}}, {{role}}</v-toolbar-title>
  </v-app-bar>
</template>
<script>
  export default {
    data: () => ({ 
      drawer: null,
      username:'',
      role:''
    }),
    created:function(){
      this.username = localStorage.getItem("nom")
      this.role = localStorage.getItem("role")
    },
  }
</script>
