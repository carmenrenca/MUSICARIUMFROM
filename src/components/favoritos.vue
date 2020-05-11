<template>
<div id="articlefav">

        <h2 class="subheaderCesta">Mis Favoritos</h2>

    <!--Listado articulos-->
     <div id="articles-list">
      <div id="articulocard" v-for="articles in articles" :key="articles.Idfav">
          

<div class="card">
    <router-link :to="{name:'article', params:{id: articles.Idfav}}">
        <img :src="url+'get-image/'+articles.imagen" :alt="articles.Name" v-if="articles.imagen" class="cardimg" />
              </router-link>    
             <div class="cardfooter">
    <p class="titlecard"><b>{{articles.Name}}</b></p>
  <!-- <span class="date">{{articles.date | moment('from', 'now')}}</span>-->   
  
         <a  @click="deletefav(articles)" ><img src='../assets/borrar.png' class="logofav" alt="Logotipo"/></a>   
         

</div>         
  </div>
   </div>

         
                
  </div>
</div>


</template>

<script>
 import jwtDecode from 'jwt-decode'

import axios from 'axios';
import {global} from "../../global";
export default {
  name: "favorito",
   components:{
    
   },
  
  mounted(){
this.tokendecode(),  this.getfavoritos()
  },
    data() {
   
    return {
          url: global.url,
      articles: [],Email:''
     
 
    };
  },
  methods: {
  getfavoritos() {
        console.log(this.Email);
      axios.get(this.url+"getfav/"+this.Email).then(res => {
        console.log(res);
        if (res.data.status == "success") {
          this.articles = res.data.articles;
             console.log(res);
          console.log(this.articles);
        }
      });
    },
     
     tokendecode(){
           const token = localStorage.token
const decoded = jwtDecode(token);
          
            this.Email=decoded.email;
    
        },

        deletefav(article){
      

                axios.put(this.url+'deletefav/'+article.Idfav,{email: this.Email} ).then(res=>{
           console.log(res);
        
   console.log(article._id+"%%%%%%%%%%%");
      
   
                 this.getfavoritos();
 
         });
   
      
        }
  }
};
</script>