<template>

<div class="generalcarro">
      <h2 class="subheaderCesta">Cesta</h2>
   <div id="tableCarro">
     <table >
          <tr >
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Unidades</th>
            <th>Eliminar</th>
          </tr>
            <tr v-for="i in this.articlescarro"  v-bind:key='i' >
              <td>
              <img 
            :src="url+'get-image/'+i.imagen" :alt="i.Name" v-if="i.imagen" class="cardimgcarro"
            />
            </td>
                  <td><router-link :to="{name:'article', params:{id: i._id}}">  {{i.Name}}</router-link></td> 
          
            <td> {{i.Precio__c}}€</td>
              <td> {{i.unidad}}</td>
             <td>   <button class="btn btn-danger"  @click="eliminarcarro(i)">Eliminar</button> </td> 
            
            </tr>
     </table>
     <div class="total"><h2>Total: {{this.suma}} </h2>
      <a class="hacerpedido" href="/tramite"  >Hacer Pedido</a></div>
     

   </div>

    <div class="clearfix"></div>
  </div>
</template>

<script>
//import axios from 'axios';
import {global} from "../../global";
//import Articles from './Articles';
export default {
  name: "carro",
   props: ["articles"],
   
  components:{
  
     
  },
  mounted(){
      this.obtenerProductosLocalStorage();

console.log(this.articlescarro);
  },
    data() {
   
    return {
         article:null,
         suma:0,
       url: global.url,
      articlescarro: []
    };
  },
  methods: {
   obtenerProductosLocalStorage(){
      

        //Comprobar si hay algo en LS
        if(localStorage.getItem('carrito') === null){
            this.articlescarro = [];
        }
        else {
            this.articlescarro = JSON.parse(localStorage.getItem('carrito'));
            console.log(this.articlescarro)
        }
      // this.calculartotal();
         this.calculartotal();
    },
 
    eliminarcarro(articulo){

           this.articlescarro.forEach(function(entry, index) {
   if(entry._id== articulo._id){

   
         console.log("coincide"+articulo.Id)
         this.articlescarro.splice(index,1);
     

   }
  }, this);
   localStorage.setItem('carrito', JSON.stringify(this.articlescarro));
       this.calculartotal();
    },  
    
    
    
    calculartotal(){
      
    this.suma=0;
           this.articlescarro.forEach(function(entry) {
           this.suma=this.suma+entry.Precio__c*entry.unidad;
            
  }, this);
this.suma=this.suma.toFixed(2);
  console.log( this.suma);

     localStorage.setItem('Totalcarrito', JSON.stringify(this.suma));

    }  
 
  }
};
</script>