<template>
    <header id="header">
            <div class="center">
                <!-- LOGO -->
                <div id="logo">
                    <img src="../assets/logo.png" class="app-logo" alt="Logotipo" />
                    <span id="brand">
                        <strong>Musi</strong>carium
                    </span>
                </div>
                        <div id="MenuMovile" ref="app">
                          
  <slider :width="300" format="push" direction="left" :opacity="0.15" :links="[{'id': 1, 'text': 'Inicio', 'url': '/home'}, {'id': 2, 'text': 'Mi Perfil', 'url': '/pefil'},
  {'id': 3, 'text': 'Articulos', 'url': '/Blog'},{'id': 4, 'text': 'Eventos', 'url': '/TablonEventos'},{'id': 5, 'text': 'Usuarios', 'url': '/Cliente'}]">>
    <p>sd</p>
  </slider>
</div>
                <!-- MENU -->
                <nav id="menu" class="col-lg-12" >
           
                    <ul class="" >
                        <li >
                        <router-link to="/home">Inicio</router-link>
                      
                        </li>
                         <li >
                        <router-link to="/pedidos">Mis Pedidos</router-link>
                      
                        </li>
                      
                       
                        <li >
                        <router-link to="/TablonEventos">Eventos</router-link>
                      
                        </li>
                        <li >
                       <router-link to="/Cliente">Usuarios</router-link>
                        </li>
                        <li>
                            <router-link to="/favorito" >Favoritos</router-link>
                        </li>
                            <li >
                         

                        </li>
                        
                     <li>
                               <router-link to="/carro" > <img  src="../assets/carro.png" class="app-logo-header" alt="carro" width="50px" /></router-link>             

                     </li>
                      
                       <li>
                              <a  v-on:click="cerrarsesion()"> <img src="../assets/exit.png" class="app-logo-header" alt="exit" width="50px" /></a>             

                     </li>
                  
                            
                    </ul>
                    
                </nav>
 <div id="categorias">
  <ul v-for="categori in categori" :key="categori">
           
           <li><router-link :to="{path:'/ArticleCategori',  params:{id: categori.title}}">{{categori.title}}
              </router-link> </li>
         </ul>
 </div>
  </div>
                <!--LIMPIAR FLOTADOS-->
                <div class="clearfix"></div>

        </header>

</template>

<script>

  import Swal from 'sweetalert2'
import Slider2 from '@jeremyhamm/vue-slider'
import {global} from "../../global";
import axios from 'axios';

export default {
    data:()=>({
       url: global.url,
       categori:[],
         icons: {
     
      }, rol:""
    }),
    mounted(){
     this.verificarol(); this.getcategori();

    },
      components:{
     
        'slider': Slider2

  },

    name:'HeaderComponent',
     methods:{
        getcategori(){
      axios.get(this.url+"articleCategori").then(res=>{
          if (res.data.status == "success") {
          this.categori = res.data.Categoria
          console.log(this.categori);
        }
      })
    },
     verificarol(){
     
        this.rol= localStorage.getItem('rol');
     console.log(this.rol+"%%%%%%%%%%%%%%")
            
            
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
       
            setTimeout(() => {
              this.$router.push("/")
            }, 1500)
   
  }
})        
  }

     
                     

     }
}
</script>