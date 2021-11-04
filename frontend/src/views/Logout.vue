<template>
</template>
<script>
export default {
  name: "Logout",
  created: function () {
    console.log("Logging out")
    this.$store.state.loggedin = false
    this.$store.state.user = {}
    this.$store.commit("logout");
    this.$router.push('/login')
  }
};
</script>
