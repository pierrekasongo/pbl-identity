<template>
  <v-app id="inspire">
    <Navigation v-if="loggedin"/>

    <Header v-if="loggedin"/>

    <ModalIdle v-if="isIdle" />

    <v-main>
      <!--  -->
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navigation from './components/layout/Navigation.vue'
import Header from './components/layout/Header.vue'
import ModalIdle from './components/ModalIdle.vue'

  export default {
  components: { 
    Navigation,
    Header,
    ModalIdle
  },
    data: () => ({ 
      loggedin: false
    }),
    created:function(){
      if(localStorage.getItem("token"))
        this.loggedin = localStorage.getItem("user_id").length > 0
      console.log("LOGGEDIN ",this.loggedin)
      if(!this.loggedin)
        this.$router.push("/login")
    },
    computed: {
      isIdle() {
        return this.$store.state.idleVue.isIdle;
      }
    }
  }
</script>