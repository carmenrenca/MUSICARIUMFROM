<template>

<div class="general">



    

    <div class="center">

  <MenuPerfil></MenuPerfil>
<div id="infouser">
         <h2 class="title_main">MI INFORMACIÓN PERSONAL</h2>
 
    <div class="title-block">
    <p class="form-legend">DATOS PERSONALES</p>
        <div>
    </div>
   
          </div> 
  <form class="formchangepassword">
<div class="inputpassword" >
<label class="form-label" for="repeat-change-password">NOMBRE<sup class="form-required-asterisk">*</sup></label>
<input id="password" class="form-input js-forminput " v-model="passwordActual2" maxlength="20" type="text" name="password"  required="required">
</div>
<div class="inputpassword2">
<label class="form-label" for="repeat-change-password">Nueva Contraseña<sup class="form-required-asterisk">*</sup></label>
<input id="password" v-model="newPasword" class="form-input js-forminput " maxlength="20" type="password" name="password"  required="required" >
<label class="form-label" for="repeat-change-password">Repite la Contraseña<sup class="form-required-asterisk">*</sup></label>
<input id="password" v-model="repeatPassword" class="form-input js-forminput " maxlength="20" type="password" name="password" required="required" >

<input class="changecuentabutton" @click="changePassword()" type="submit" value="Cambiar contraseña">

</div>
    </form>
    </div>
    
    <div class="clearfix col-md-1"></div>
    </div>
</div>
</template>

<script>

//import axios from "axios";
import {global} from '../../global';
import MenuPerfil from './MenuPerfil';

import Cliente from '../models/Cliente.js';
 import jwtDecode from 'jwt-decode'
 // import Swal from 'sweetalert2'

export default {
   
  name: "DatosPersonales",
  components:{
MenuPerfil
   
 
  },
  mounted() {
      this.verificarol();
  },
  data() {
   
    return {
      cliente: new Cliente("", "", "", "", "", "", ""),
      
       url: global.url
     
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

              

                
     cerrarsesion(){
   
   
     localStorage.removeItem('token');      
          localStorage.removeItem('carrito');      
          localStorage.removeItem('Totalcarrito'); 
            setTimeout(() => {
              this.$router.push("/")
            }, 1500)
   
  
       
  },

  


  }
};
</script>