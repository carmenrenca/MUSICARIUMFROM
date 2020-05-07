<template>


  <div id="articles-list">
      <div id="articulocard" v-for="articles in articles" :key="articles.Id">
          

<div class="card">
    <router-link :to="{name:'article', params:{id: articles._id}}">
        <img :src="url+'get-image/'+articles.imagen" :alt="articles.Name" v-if="articles.imagen" class="cardimg" />
              </router-link>    
             <div class="cardfooter">
    <p class="titlecard"><b>{{articles.Name}}</b></p>
     <span class="date">{{articles.date | moment('from', 'now')}}</span>
  </div>        
                </div>

       

</div>
 
  </div>

</template>

<script>
import { global } from "../../global";
export default {
  name: "Articles",

  props: ["articles"],
  data() {
    return {
      url: global.url,
        productos:[]
    };
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
    }

  }
};
</script>
