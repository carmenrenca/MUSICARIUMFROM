<template>
  <aside id="sidebar" >
    <div  v-show="this.rol=='Administrador'"  id="nav-blog" class="sidebar-item">
      <h3>Puedes hacer esto</h3>
        <div class="clearfix" >
   <router-link to="/createarticle" class="btn btn-success">Crear Articulo</router-link>
      <router-link to="/saveCategori" class="btn btn-success">Crear Categoria</router-link>
        </div>
       
    </div>

      <div id="nav-blog" class="sidebar-item">
      <h3>ESTILOS DE MÚSICA</h3>
        <div id="categorilateral" class="clearfix" >

    <ul v-for="categori in categori" :key="categori">
           <li><router-link :to="{name:'articlecategori',  params:{title: categori.title}}">{{categori.title}}
              </router-link> </li>
         </ul>
        </div>
       
    </div>

    <div id="search" class="sidebar-item" v-show="route!='evento' && route!='TablonEventos'">
      <h3>Buscador</h3>
      <p>Encuentra el artículo que buscas</p>
      <form @submit.prevent="gosearch">
        <input type="text" name="search" v-model="searchString"/>
        <input type="submit" name="submit" value="Buscar" class="btn" />
      </form>
    </div>
  </aside>
</template>

<script>
import {global} from "../../global";
import axios from 'axios';
 import jwtDecode from 'jwt-decode'

export default {
  name: "Sidebar",
  data(){
    return{
      searchString: null,
           url: global.url,rol:"", categori:[]
    }
  }, methods:{
    gosearch(){
    
          this.$router.push('/redirect/'+this.searchString);
    },
        getcategori(){
    axios.get(this.url+"articleCategori").then(res=>{
          if (res.data.status == "success") {
          this.categori = res.data.Categoria
          console.log(this.categori);
        }
      })
    },
     verificarol(){
              const token = localStorage.token
const decoded = jwtDecode(token);
          
         this.rol=decoded.role;

     }
 
  },
   computed: {

  }, 
  mounted() {
    this.verificarol();this.getcategori();
  },
};
</script>