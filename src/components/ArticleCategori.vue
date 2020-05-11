<template>
<div class="general">
            <Slider></Slider>

    <div class="center">

  <section id="content">
    <br>
    <br>
    <div class="ultimoarticle">
    <h2 class="subheader">{{this.title}}</h2>

    </div>

    <!--Listado articulos-->
    <div id="articles">
      <Articles v-bind:articles="articles"></Articles>
    </div>
  </section>
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
      this.title=this.$route.params.title;
 this.getcategori(this.title);
    this.getLastArticle();

  },
    data() {
   
    return {
       url: global.url,
      articles: [],
      categori:[],
        title:'',
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
    getcategori(title){
      axios.get(this.url+"articleforcategori/"+title).then(res=>{
        console.log(res.data);
          if (res.data.status == "success") {
          this.articles = res.data.article;
          console.log(this.articles);
        }
      })
    }
  }
};
</script>