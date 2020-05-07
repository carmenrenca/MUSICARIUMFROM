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
      <Articles v-bind:articles="articles"></Articles>
    </div>
  </section>
  <Sidebar></Sidebar>
    
    </div>
    <div class="clearfix"></div>
  </div>
  
</html>

</template>

<script>
import Sidebar from './sidebar';
import axios from 'axios';
import Slider from "./Slider";
import {global} from "../../global";
import Articles from './Articles';

export default {
  name: "LastArticle",
  components:{
        Slider,
    Articles,Sidebar

  },
  mounted(){
    this.getLastArticle();
    this.getcategori();
  },
    data() {
   
    return {
       url: global.url,
      articles: [],
      categori:[],
       drawer: null,
      items: [
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' },
      ],
    };
  },
  methods: {
    getLastArticle() {
        
      axios.get(this.url+"articles").then(res => {
        console.log(res);
        if (res.data.status == "success") {
          this.articles = res.data.articles;
             console.log(res);
          console.log(this.articles);
        }
      });
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