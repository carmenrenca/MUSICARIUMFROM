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
      axios.get(this.url+"articles").then(res => {
        console.log(res);
        if (res.data.status == "success") {
          this.articles = res.data.articles;
             console.log(res);
          console.log(this.articles);
        }
      });
    },
    obtenerProductosLocalStorage(){
        let productoLS;

        //Comprobar si hay algo en LS
        if(localStorage.getItem('carrito') === null){
            productoLS = [];
        }
        else {
            productoLS = JSON.parse(localStorage.getItem('carrito'));
        }
        return productoLS;
    },
        //Almacenar en el LS
    guardarProductosLocalStorage(article){
      var aux =false;
   this.productos = this.obtenerProductosLocalStorage();
        this.productos.forEach(function(entry) {
   if(entry._id== article._id){

   
         console.log("coincide"+entry._id)
     
     entry.unidad=entry.unidad+1;
   
             localStorage.setItem('carrito', JSON.stringify(this.productos));
        console.log(this.productos)
         aux=true;      
   }
  }, this);


       
    if(aux==false){
       //Agregar el producto al carrito
   article.unidad=1;
   console.log(article);
        this.productos.push(article );
          //Agregamos al LS
      localStorage.setItem('carrito', JSON.stringify(this.productos));

    }
       
   this.$router.push('/carro');
     
 
    
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