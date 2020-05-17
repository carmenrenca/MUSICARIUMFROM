<template>
<section id="contentProfile">

<div class="infocliente">
<a href="/home">    <img src="../assets/logo.png" class="app-logo" alt="Logotipo" /> </a>
<div class="menu-profile">

    <p class="namecliente">{{ this.nombre+' '+ this.apellido }}</p>
    <a @click="cerrarsesion()" class="cerrarprofile">Cerrar sesión</a>
</div>
<div class="pedidosprofile">
<h3 class="title_with_icon"> Mis Pedidos</h3>
<router-link class="ts-my-orders" to="/pedidos">Consulta de todos mis pedidos</router-link>

</div>
<div class="pedidosprofile">
<h3 class="title_with_icon"> Mis Datos</h3>
      <router-link to="/datosAcesso" class="ts-my-orders">Mis datos de acceso y contraseña</router-link>

   <router-link to="/datosPersonales" class="ts-my-orders">Mi información personal</router-link>

<a href="/mis-pedidos/" class="ts-my-orders">Mi libreta de direcciones</a>
<a href="/mis-pedidos/" class="ts-my-orders">Mis medios de pago</a>

</div>
</div>
               
  </section>
</template>

<script>
import {global} from "../../global";
//import axios from 'axios';
 import jwtDecode from 'jwt-decode'
  import Swal from 'sweetalert2'

export default {
  name: "MenuPerfil",
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

                 cerrarsesion(){
      
     Swal.fire({
  title: 'Cerrar Sesion?',
  text: "Va a cerrar la sesion",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Salir'
}).then((result) => {
  if (result.value) {
     localStorage.removeItem('token');      
          localStorage.removeItem('carrito');      
          localStorage.removeItem('Totalcarrito'); 
            setTimeout(() => {
              this.$router.push("/")
            }, 1500)
   
  }
})        
  }

 
  },
   computed: {

  }, 
  mounted() {
   this.verificarol();
  },
};
</script>