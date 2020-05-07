<template>


  <div class="general">
           <h2 class="titleproduct">{{article.Name}}</h2>

       <div class="product">
         
<div class="product-image">
  <img 
            :src="url+'get-image/'+article.imagen" :alt="article.Name" v-if="article.imagen" class="cardimg"
            />

</div>
    <div id="product-info">
        <div class="descripcionProduc">
      <p>{{article.Descripcion__c}}</p>
     
        <p class="display-4" style="text-align:right">{{article.Precio__c}}€</p>
        <a class="addCart" @click="guardarProductosLocalStorage(article)" >Añadir a la cesta</a>
          <a class="addfav" @click="guardarProductosLocalStorage(article)" >Añadir Favorito</a>
   </div>
      <router-link  :to="'/editarticle/'+article._id" class="btn btn-warning">Editar</router-link>
                <a  @click="deleteArticle(article._id)" to="/eliminar" class="btn btn-danger">Eliminar</a>
    </div>
  
    </div>
   
    <div class="clearfix"></div>
  </div>
</template>

<script>


import {global} from '../../global';
import axios from "axios";
import swal from "sweetalert";
import Article from '../models/Article';
export default {
    name: 'Article',
    
    components:{
   
      
    },
    data(){
        return {
            url: global.url,
     article : new Article("","","","",1),

             rol:"",        productos:[]
        }
    }, mounted(){
      var  articleId=this.$route.params.id;
 this.getArticle(articleId);
    },
    methods:{
        getArticle(articleId){
            axios.get(this.url+'article/'+articleId).then(res=>{
              console.log(res);
                    if(res.data.status=='success'){
                        this.article= res.data.article; 
                        this.article.unidad=1;
                    }
                  
            });
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
   
        this.productos.push(article );
          //Agregamos al LS
      localStorage.setItem('carrito', JSON.stringify(this.productos));

    }
       
   this.$router.push('/carro');
     
 
    
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
     ,
        deleteArticle(articleId){
          console.log(articleId);
         axios.delete(this.url+'article/'+articleId).then(res=>{
           console.log(res);
               swal('Articulo Eliminado','El articulo se ha borrado correctamente','success' );
          this.$router.push('/home');
         });
        },
       
 
    }

}
</script>