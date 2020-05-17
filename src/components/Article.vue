<template>


  <div class="general">
           <h2 class="titleproduct">{{article.Name}}</h2>

       <div class="product">
         
<div class="product-image">
  <img 
            :src="url+'get-image/'+article.imagen" :alt="article.Name" v-if="article.imagen" class="cardimg"
            />
            </div>
   <div class="descripcionProduc">
      <p>{{article.Descripcion__c}}</p>
        <div v-if="article.Descuento">
     <p class="display-4" style="text-align:right">{{article.PrecioFinal}}€</p>
          <p class="precioantiguoArticle"  ><b>{{article.Precio__c}}€</b></p>

     <p class="descuentoArticle"><b>- {{article.Descuento}}%</b></p>

             </div>
        <p  v-if="!article.Descuento" class="display-4" style="text-align:right">{{article.PrecioFinal}}€</p>
     
        <a class="addCart" @click="guardarProductosLocalStorage(article)" >Añadir a la cesta</a>
           <div v-if="aux==false">
       <a class="addfav" @click="addfavoritos(article._id)" >Añadir Favorito</a>
         <a  @click="addfavoritos(article._id)" ><img src='../assets/heart.png' class="logofavarticle" alt="Logotipo"/></a>   

        </div>
          <div  v-if="aux==true" >
              <a class="addfav" @click="deletefavorito(article)" >Añadido a favoritos</a>
         <a @click="deletefavorito(article)"   ><img src='../assets/heartblack.png' class="logofavarticle" alt="Logotipo"/></a>   

          </div>
          
          <div  v-show="this.rol=='Administrador'" class="buttonarticle">
             <router-link  :to="'/editarticle/'+article._id" class="btn btn-warning">Editar</router-link>
                <a  @click="deleteArticle(article._id)" to="/eliminar" class="btn btn-danger">Eliminar</a>
          </div>
            
   </div>
   

  
  
    </div>
   
    <div class="clearfix"></div>
  </div>
</template>

<script>

 import jwtDecode from 'jwt-decode'
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
            url: global.url,Email:'',
     article : new Article("","","","",1,"",""),
    aux:false,
             rol:"",        productos:[]
        }
    }, mounted(){
      var  articleId=this.$route.params.id;
 this.tokendecode();
 this.getfav(articleId);
  this.getArticle(articleId);

    },
    methods:{
        getArticle(articleId){
            axios.get(this.url+'article/'+articleId).then(res=>{
              console.log(res);
                    if(res.data.status=='success'){
                        this.article= res.data.article; 
                        this.article.unidad=1;
                         this.article.Descripcion__c=res.data.article.Descripcion__c
                    }
                  
            });
        },
   
   getfav(articleId){
     console.log(this.Email)
     console.log(articleId);
            axios.post(this.url+'articlefav/'+articleId, {email:this.Email} ).then(res=>{
              console.log(res);
                    if(res.data.message=="Existe"){
                 this.aux=true;
                    }else{
                      this.aux=false;
                    }
                      this.getArticle(articleId);

            });
    console.log("AUX"+this.aux)
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
         axios.delete(this.url+'article/'+articleId).then(res=>{
           console.log(res);
               swal('Articulo Eliminado','El articulo se ha borrado correctamente','success' );
          this.$router.push('/home');
         });

        },

        

        deletefavorito(article){
     
          axios.put(this.url+'deletefav/'+article._id,{email: this.Email} ).then(res=>{
           console.log(res);
        
   console.log(article._id+"%%%%%%%%%%%");
      
           this.aux=false;
                      this.getArticle(article._id);
 
         });
        },

        addfavoritos(articleId){
      axios
        .post(this.url + "addfav/"+this.Email, this.article)
        .then(res => {
          if (res.data.status == "success") {
           
          
              this.article = res.data.article;
        this.aux=true;
            }else{
                this.getArticle(articleId);
 this.getfav(articleId);
            }
        })
        .catch(error => {
          console.log(error);
             this.getArticle(articleId);
 this.getfav(articleId);
        });
        this.getfav(articleId);
   this.getArticle(articleId);

        },
        tokendecode(){
           const token = localStorage.token
const decoded = jwtDecode(token);
          
            this.Email=decoded.email;
           
         this.rol=decoded.role;
        },
       
 
    }

}
</script>