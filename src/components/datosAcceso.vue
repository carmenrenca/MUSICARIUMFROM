<template>


<div class="general">



    

    <div class="center">

  <MenuPerfil></MenuPerfil>
<div id="infouser">
         <h2 class="title_main">MIS DATOS DE ACCESO Y CONTRASEÑA </h2>
    <p class="textmodify"> <b>Tu cuenta de acceso es</b> {{this.email}} <br>
<b>¿Quieres modificarla?</b></p>
    <div>
<label class="text_acceso" for="new_login">Escribe tu nueva cuenta de acceso<sup class="form-required-asterisk">*</sup> </label>
<input class="form-input1" name="new_login" v-model="NewEmail" placeholder="Correo electrónico" value="" required="required" >
<label class="form-label" for="repeat-change-password">Contraseña<sup class="form-required-asterisk">*</sup></label>
<input id="password" v-model="passwordActual" class="form-input js-forminput " maxlength="20" type="password" name="password"  required="required" pattern="^.{6,}$">
<input class="changecuentabutton" @click="changeDireccion()" type="submit" value="Cambiar cuenta de acceso">
    </div>
    <form class="formchangepassword">
<div class="inputpassword" >
<label class="form-label" for="repeat-change-password">Contraseña actual<sup class="form-required-asterisk">*</sup></label>
<input id="password" class="form-input js-forminput " v-model="passwordActual2" maxlength="20" type="password" name="password"  required="required" pattern="^.{6,}$">
</div>
<div class="inputpassword2">
<label class="form-label" for="repeat-change-password">Nueva Contraseña<sup class="form-required-asterisk">*</sup></label>
<input id="password" v-model="newPasword" class="form-input js-forminput " maxlength="20" type="password" name="password"  required="required" pattern="^.{6,}$">
<label class="form-label" for="repeat-change-password">Repite la Contraseña<sup class="form-required-asterisk">*</sup></label>
<input id="password" v-model="repeatPassword" class="form-input js-forminput " maxlength="20" type="password" name="password" required="required" pattern="^.{6,}$">

<input class="changecuentabutton" @click="changePassword()" type="submit" value="Cambiar contraseña">

</div>
    </form>
    </div>
    
    <div class="clearfix col-md-1"></div>
    </div>
</div>
</template>

<script>

import axios from "axios";
import {global} from '../../global';
import MenuPerfil from './MenuPerfil';

//import VueJWT from 'vuejs-jwt'
//import * as jwt_decode from 'jwt-decode';
import Cliente from '../models/Cliente.js';
 import jwtDecode from 'jwt-decode'
  import Swal from 'sweetalert2'

export default {
   
  name: "DatosAcceso",
  components:{
MenuPerfil
   
 
  },
  mounted() {
      this.verificarol();
  },
  data() {
   
    return {
      cliente: new Cliente("", "", "", "", "", "", ""),
        nombre:"", apellido:"",email:"",direccion:"", NewEmail:"", passwordActual:"",passwordActual2:"", newPasword:"", repeatPassword:"",
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

                changeDireccion(){

      axios
        .put(this.url + "updateEmail/"+ this.email,{email:this.NewEmail, password:this.passwordActual})
        .then(res => {
          if (res.data.status == "success") {
           
             Swal.fire({
  position: 'Usuario Actualizado',
  icon: 'success',
  title: 'Tu Usuario ha sido actualizado',
  showConfirmButton: false,
  timer: 1500
})
           console.log(res);
           this.cerrarsesion();

    
            } else{
                     
                        Swal.fire({
            position: 'Datos incorrectos',
            icon: 'error',
            title: 'Revise de nuevo los datos introducios',
            showConfirmButton: false,
            timer: 1500
            })
            }
        })
        .catch(error => {
          console.log(error);
             Swal.fire({
            position: 'Datos incorrectos',
            icon: 'error',
            title: 'Revise de nuevo los datos introducios',
            showConfirmButton: false,
            timer: 1500
            })
        });
  
                },
  changePassword(){


if(this.newPasword==this.repeatPassword){
    console.log(this.email);
axios
        .put(this.url + "updatePassword/"+ this.email,{ password:this.passwordActual2, passwordNew:this.newPasword})
        .then(res => {
            console.log(res);

          if (res.data.status == "success") {
             
             Swal.fire({
  position: 'Contraseña Actualizada con exito',
  icon: 'success',
  title: 'Contraseña Actualizada con exito',
  showConfirmButton: false,
  timer: 1500
})
        
           this.cerrarsesion();

       
          } else {
                             console.log("entra en error")
                        Swal.fire({
            position: 'Datos incorrectos',
            icon: 'error',
            title: 'Revise de nuevo los datos introducios',
            showConfirmButton: false,
            timer: 1500
            })
            }
        })
          
}else{
        Swal.fire({
                position: 'Las Contraseñas No Coinciden',
                icon: 'error',
                title: 'Las Contraseñas No Coinciden',
                showConfirmButton: false,
                timer: 1500
})
}
      
  
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