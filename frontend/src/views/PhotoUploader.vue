<style scoped>
.card-detail{
  margin:20px;
  padding:20px;
}
</style>
<template>
<v-container>
<v-toolbar
        flat
      >
  <v-toolbar-title>{{client.prenom}} {{client.nom}} {{client.postnom}}</v-toolbar-title>
    <v-divider
          class="mx-4"
          inset
          vertical
    ></v-divider>
  <v-spacer></v-spacer>
  </v-toolbar>
  <v-card  class="card-detail">
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
      >
            <v-img
              height="100"
              width="80"
              :src="`/uploads/${previewImage}`"
            ></v-img>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="4"
      >
        <v-file-input
              label="Charger une photo"
              v-model="file"
              filled
              accept="image/*"
              prepend-icon="mdi-camera"
              @change="selectImage"
          ></v-file-input>
      </v-col>

      <v-col
        cols="12"
        sm="6"
        md="4"
      >
        <v-btn v-if="isLoaded"
          color="success"
          dark
          small
          @click="upload"
        >
          <v-icon dark>mdi-cloud-upload</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</v-container>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'PhotoUploader',
    data () {
      return {
         client:{},
         file:null,
         currentImage:undefined,
         isLoaded:false,
         message:""
      }  
    },
    methods:{
     selectImage:function(image){
        this.currentImage = image;
        this.previewImage = URL.createObjectURL(this.currentImage);
        this.message = "";
        this.isLoaded = this.currentImage
     },
     upload:function(){
        let formData = new FormData()
        if(this.currentImage){

          console.log("Image ",this.currentImage)

          formData.append("file", this.currentImage)
          formData.append("client", this.client.id)

          axios.post(`/client/upload`,formData,{
            }).then(resp => {
                  console.log(resp)
                  return resp.data
            }).then(data =>{
                console.log("Updated ",data.count)
                //this.$router.back()
                this.$router.push({ name:"client-detail", params: {id: this.client.id} })
            }).catch(err => console.log(err.message))
      }
     }
    },
    created:function(){
      console.log("Params ", this.$route.params.client)
      const clientId = this.$route.params.client

      const options={
          headers:{
            'x-access-token': 'Bearer ' +localStorage.getItem("token")
          }
      }
      fetch(`/client/${clientId}`,options).then(resp => {
          console.log("RESPONSE ",resp)
          if(resp.status == 401){
            this.$router.push('/login')
          }else
            return resp.json()
        }).then(data =>{
          console.log(data)
          this.previewImage = data.photo
          this.client = {
            prenom:data.prenom,
            nom:data.nom,
            postnom:data.postnom,
            photo: data.photo
          }
        }).catch(err => {
          console.log(err)
          this.$router.push('/login')
        })
    }
  }
  
</script>