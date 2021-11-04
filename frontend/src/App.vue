<template>
  <v-app id="inspire">
    <div v-show="this.$store.state.user.loggedin">
      <Navigation />
      <Header />
    </div>
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
    }),
    computed: {
      isIdle() {
        return this.$store.state.idleVue.isIdle;
      }
    },

  }
</script>