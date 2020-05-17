<template>


<div class="general">

 

<slider></slider>


    

    <div class="center">
  <section id="content">
    <h1 class="subheader">Articulos</h1>
    
    <div id="articles" v-if="articles">
               <Articles :articles="articles"></Articles>       
                    <!--AÑADIR ARTICULOS VIA JS-->
                </div>
                
  </section>
     <Sidebar></Sidebar>
    </div>
    <div class="clearfix col-md-1">
     
    </div>
 
  </div>
</template>

<script>
import Slider from "./Slider";
import Sidebar from "./sidebar.vue";
import axios from "axios";
import {global} from '../../global';
import Articles from './Articles';
//import VueJWT from 'vuejs-jwt'
//import * as jwt_decode from 'jwt-decode';
export default {
   
  name: "Blog",
  components:{
   Articles,
     Slider,
    Sidebar,
 
  },
  mounted() {
    this.getArticle();
  },
  data() {
   
    return {
       url: global.url,
      articles: [], 
     
    };
  },
  methods: {
   
     
    getArticle() {
      axios.get(this.url+"articles").then(res => {
        if (res.data.status == "success") {
          this.articles = res.data.articles;
          console.log(this.articles);
        }
   
      });
    }, 
    getArticleCategori(categori){
      console.log(categori)
        axios.get(this.url+"articlecategoria/"+categori).then(res => {
        if (res.data.status == "success") {
          this.articles = res.data.article;
          console.log(res.data.article);
          
        }else{
          console.log(res.data.status)
        }
      });
    
    }
  }
};
</script>