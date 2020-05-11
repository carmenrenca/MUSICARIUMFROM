<template>
<html>
<head>
<meta name="viewport" content="width=device-with, initial-scale=1.0, maximun-scale=1.0, user-scalable=no"/>

</head>

<div class="general">

            <Slider></Slider>

    <div class="center">

  <section id="content">
    
    <div class="ultimoarticle">
    <h2 class="subheader">Últimos artículos</h2>

    </div>

    <!--Listado articulos-->
    <div id="articles">
    <div id="articles-list">
      <div id="articulocard" v-for="articles in articles" :key="articles.Id">
          

<div class="card">
    <router-link :to="{name:'article', params:{id: articles._id}}">
        <img :src="url+'get-image/'+articles.imagen" :alt="articles.Name" v-if="articles.imagen" class="cardimg" />
              </router-link>    
             <div class="cardfooter">
    <p class="titlecard"><b>{{articles.Name}}</b></p>
  <!-- <span class="date">{{articles.date | moment('from', 'now')}}</span>-->   
  
         <a v-if="articles.Idfav!=''" @click="addfavoritos(articles)" ><img src='../assets/heart.png' class="logofav" alt="Logotipo"/></a>   
         <a v-if="articles.Idfav==''" @click="addfavoritos(articles)" ><img src='../assets/heartblack.png' class="logofav" alt="Logotipo"/></a>   

</div>         
  </div>
   </div>

         
                
  </div>
    </div>
  </section>
  <Sidebar></Sidebar>
    
    </div>
    <div class="clearfix"></div>
  </div>
  
</html>

</template>

<script>
 import jwtDecode from 'jwt-decode'

import Sidebar from './sidebar';
import axios from 'axios';
import Slider from "./Slider";
import {global} from "../../global";
//import Articles from './Articles';

export default {
  name: "LastArticle",
  components:{
        Slider,
 //   Articles,
    
    Sidebar

  },
  mounted(){
    this.tokendecode(); 
    this.getLastArticle();
    this.getcategori();
    this.getfav();
  },
    data() {
   
    return {
       url: global.url,
      articles: [],
      categori:[],
      favoritos:[],
       drawer: null,Email:'',
      items: [
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' },
      ],
    };
  },
  methods: {
    getLastArticle() {
        console.log(this.Email)
      axios.get(this.url+"articles/"+this.Email).then(res => {
        console.log(res);
        if (res.data.status == "success") {
          this.articles = res.data.articles;
             console.log(res);
          console.log(this.articles);
        }
      });
    },
   getfav(){
     console.log(this.Email)
  
            axios.get(this.url+'getfav/'+this.Email ).then(res=>{
              console.log(res.data);
              this.favoritos=res.data.articles;
            });
            console.log(this.favoritos);
        },
    
        addfavoritos(article){
            console.log(this.article);
      axios
        .post(this.url + "addfav/"+this.Email, article)
        .then(res => {
          if (res.data.status == "success") {
           
          
              this.article = res.data.article;
        
            }
        })
        .catch(error => {
          console.log(error);
        });
        this.getLastArticle();
        },
 
        tokendecode(){
           const token = localStorage.token
const decoded = jwtDecode(token);
          
            this.Email=decoded.email;
    
        },
    getcategori(){
       axios.get(this.url+"articleCategori").then(res=>{
          if (res.data.status == "success") {
          this.categori = res.data.Categoria
          console.log(this.categori);
        }
      })
    }
  }
};
</script>