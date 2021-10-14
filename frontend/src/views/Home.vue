<style scoped>
.main{
  margin:10px;
}
</style>

<template>
  <div class="main">
    <h2>Acceuil</h2>
  </div>
</template>

<script>

  export default {
    name: 'Home',
    data:() =>({
      username: "",
      role: ""
    }),
    created:function(){
      this.username = localStorage.getItem("nom")
      this.role = localStorage.getItem("role")
    }
  }
</script>
