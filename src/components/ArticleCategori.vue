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
    <div id="articles-list">
      <div id="articulocard" v-for="articles in articles" :key="articles.Id">
          

<div class="card">
    <router-link :to="{name:'article', params:{id: articles._id}}">
        <img :src="url+'get-image/'+articles.imagen" :alt="articles.Name" v-if="articles.imagen" class="cardimg" />
              </router-link>    
             <div class="cardfooter">
               
    <p class="titlecard"><b>{{articles.Name}}</b></p>
             <div v-if="articles.Descuento">
     <p class="preciocard" style="color:#e21e04"><b>{{articles.PrecioFinal}}€</b></p>
          <p class="precioantiguo"  ><b>{{articles.Precio__c}}€</b></p>

     <p class="descuento"><b>- {{articles.Descuento}}%</b></p>

             </div>
     <p v-if="!articles.Descuento" class="preciocard"><b>{{articles.PrecioFinal}}€</b></p>
  
         <a  @click="guardarProductosLocalStorage(articles)" ><img src='../assets/bolsa.png' class="logofav" alt="Logotipo"/></a>   

</div>         
  </div>
   </div>

         
                
  </div>
    </div>
  </section>
    </div>
    <Sidebar></Sidebar>
    <div class="clearfix"></div>

  </div>
</template>

<script>

import axios from 'axios';
import Sidebar from "./sidebar.vue";

import Slider from "./Slider";
import {global} from "../../global";

export default {
  name: "ArticleCategori",
  components:{
        Slider,Sidebar,
   
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