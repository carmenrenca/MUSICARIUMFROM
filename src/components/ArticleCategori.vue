<template>
<div class="general">
            <Slider></Slider>

    <div class="center">

  <section id="content">
    <br>
    <br>
    <div class="ultimoarticle">
    <h2 class="subheader">Últimos artículos</h2>

    </div>

    <!--Listado articulos-->
    <div id="articles">
      <Articles v-bind:articles="articles"></Articles>
    </div>
  </section>
    <aside id="lateral">
             
            <h5><b>ESTILOS DE MÚSICA</b></h5>
         <ul v-for="categori in categori" :key="categori">
           <li><router-link :to="{name:'/ArticleCategori', params:{id:categori.Family}}">{{categori.Family}}
              </router-link> </li>
         </ul>
    </aside>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>

import axios from 'axios';
import Slider from "./Slider";
import {global} from "../../global";
import Articles from './Articles';
export default {
  name: "ArticleCategori",
  components:{
        Slider,
    Articles
  },
  mounted(){
    this.getLastArticle();
    this.getcategori();
  },
    data() {
   
    return {
       url: global.url,
      articles: [],
      categori:[]
    };
  },
  methods: {
    getLastArticle() {
        
      axios.get(this.url+"articles").then(res => {
        if (res.data.status == "success") {
          this.articles = res.data.message.records
          console.log(this.articles);
        }
      });
    },
    getcategori(){
      axios.get(this.url+"articleCategori").then(res=>{
          if (res.data.status == "success") {
          this.categori = res.data.message.records
          console.log(this.categori);
        }
      })
    }
  }
};
</script>