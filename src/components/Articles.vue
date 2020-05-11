<template>


  <div id="articles-list">
      <div id="articulocard" v-for="articles in articles" :key="articles.Id">
          

<div class="card">
    <router-link :to="{name:'article', params:{id: articles._id}}">
        <img :src="url+'get-image/'+articles.imagen" :alt="articles.Name" v-if="articles.imagen" class="cardimg" />
              </router-link>    
             <div class="cardfooter">
    <p class="titlecard"><b>{{articles.Name}}</b></p>
  <!-- <span class="date">{{articles.date | moment('from', 'now')}}</span>-->   
  
         <a v-if="articles.like!='like'" @click="addfavoritos(articles)" ><img src='../assets/heart.png' class="logofav" alt="Logotipo"/></a>   
         <a v-if="articles.like=='like'" @click="addfavoritos(articles)" ><img src='../assets/heartblack.png' class="logofav" alt="Logotipo"/></a>   

</div>         
  </div>
   </div>

         
                
  </div>

</template>

<script>
 import jwtDecode from 'jwt-decode'

import { global } from "../../global";
import axios from 'axios';
export default {
  name: "Articles",

  props: ["articles"],
  data() {
    return {
      url: global.url,
        productos:[],articlesfav:[], aux:false,Email:'',
    };
  },
  mounted() {
this.tokendecode();
  },
  methods:{



      //Almacenar en el LS
    guardarProductosLocalStorage(article){
       
        //Toma valor de un arreglo con datos del LS
        this.productos = this.obtenerProductosLocalStorage();
        //Agregar el producto al carrito
   
        this.productos.push(article);
        //Agregamos al LS
        localStorage.setItem('carrito', JSON.stringify(this.productos));
        console.log(this.productos)
    },
      //Comprobar que hay elementos en el LS
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
        },

 
        tokendecode(){
           const token = localStorage.token
const decoded = jwtDecode(token);
          
            this.Email=decoded.email;
    
        },
  }
};
</script>
