<template>
  <v-app id="inspire">
    <Navigation v-if="loggedin"/>

    <Header v-if="loggedin"/>

    <v-main>
      <!--  -->
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navigation from './components/layout/Navigation.vue'
import Header from './components/layout/Header.vue'
  export default {
  components: { Navigation,Header },
    data: () => ({ 
      loggedin: false
    }),
    created:function(){
      this.loggedin = localStorage.getItem("user_id") > 0 || false
      console.log("LOGGEDIN ",this.loggedin)
      if(!this.loggedin)
        this.$router.push("/login")
    }
  }
</script>