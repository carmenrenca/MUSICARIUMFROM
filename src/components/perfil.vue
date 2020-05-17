<template>


<div class="general">



    

    <div class="center">

  <MenuPerfil></MenuPerfil>
<Misdatos></Misdatos>
    <div class="clearfix col-md-1"></div>
    </div>
</div>
</template>

<script>

//import axios from "axios";
import {global} from '../../global';
import Misdatos from './misdatos';
import MenuPerfil from './MenuPerfil';

//import VueJWT from 'vuejs-jwt'
//import * as jwt_decode from 'jwt-decode';
import Cliente from '../models/Cliente.js';
 import jwtDecode from 'jwt-decode'

export default {
   
  name: "Perfil",
  components:{
Misdatos,MenuPerfil
   
 
  },
  mounted() {
      this.verificarol();
  },
  data() {
   
    return {
      cliente: new Cliente("", "", "", "", "", "", ""),
        nombre:"", apellido:"",email:"",direccion:"",
       url: global.url,
      articles: [], 
     
    };
  },
  methods: {
     verificarol(){

               const token = localStorage.token
const decoded = jwtDecode(token);
          this.email=decoded.email;
         this.nombre=decoded.nombre;
    this.apellido=decoded.apellido;
  this.direccion=decoded.direccion;
            
                },

  }
};
</script>