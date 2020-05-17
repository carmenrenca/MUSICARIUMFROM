<template>
<div id="infouser">
         <h2 class="title_main">Bienvenida/o {{ this.nombre+' '+ this.apellido }}  </h2>

    <div class="title-block">
    <p class="title_with_icon">Datos de acceso</p>
      <router-link to="/datosAcesso"><p class="link_primary">Editar</p></router-link>
        <div>
    </div>
   
          </div> 
           <div class="emailcliente">
             <label class="form-label">USUARIO</label>
         <p >{{this.email}}</p>
    </div>
     <div class="title-block">
    <p class="title_with_icon">Datos Personales</p>
    <a href="/datos-de-acceso/"><p class="link_primary">Editar</p></a>
        <div>
    </div>
   
          </div>
            <div class="emailcliente">
         <p >{{ this.nombre+' '+ this.apellido }}</p>
    </div> 

     <div class="title-block">
    <p class="title_with_icon">Dirección principal</p>
    <a href="/datos-de-acceso/"><p class="link_primary">Editar</p></a>
        <div>
        
    </div>
   
          </div>
          <div class="direccion_none">   <p>Para poder enviarte tus pedidos debes tener al menos una dirección.</p></div>
    </div>
</template>

<script>
import {global} from "../../global";
//import axios from 'axios';
 import jwtDecode from 'jwt-decode'

export default {
  name: "Misdatos",
  data(){
    return{
  
            nombre:"", apellido:"",email:"",direccion:"",
       url: global.url,
    }
  }, methods:{
  verificarol(){

               const token = localStorage.token
const decoded = jwtDecode(token);
          this.email=decoded.email;
         this.nombre=decoded.nombre;
    this.apellido=decoded.apellido;
  this.direccion=decoded.direccion;
            
                },
 
  },
   computed: {

  }, 
  mounted() {
      this.verificarol();
  },
};
</script>