<template>
  <div class="general">
    <div class="center">
      <section id="content">
        <h1 class="subheader">Crear Categoria</h1>
        <form class="mid-form" v-on:submit.prevent="save()">
          <div class="form-group">
            <label for="title">Nombre de la Categoría</label>
            <input type="text" name="title" v-model="categori.title" />
          </div>


          <input type="submit" value="Guardar" class="btn btn-success" />
        </form>
 <div class="modal-body">

   </div>
<table class="tableCategori table table-striped">
  <thead>
    <tr>
      <th scope="col">Nombre Categoría</th>
      <th scope="col">Nº Productos</th>
      <th scope="col">Eliminar</th>
  
    </tr>
  </thead>
  <tbody>
    <tr  v-for="item in this.categorialist" :key="item">
    
      <td>{{item.title}}</td>
      <td></td>
      <td>  <button class="btn btn-danger"  @click="deleteCategori(item._id)">Eliminar</button></td>
    </tr>
   
  </tbody>
</table>


      </section>

      <Sidebar></Sidebar>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
import Sidebar from "./sidebar.vue";
import Categoria from '../models/Categori'
import { global } from "../../global";
import axios from "axios";
import swal from 'sweetalert';
//import {required, minLength} from 'vuelidate/lib/validators';
export default {
  name: "CreateCategoria",
  components: {
    Sidebar
  },
  data() {
    return {
      file: "",
      url: global.url,
        categorialist:[],
      categori: new Categoria("",null)
    };
  },
  mounted() {this.getCategori()},
  methods: {
 save() {
      console.log(this.categori);
      axios
        .post(this.url + "savecategori", this.categori)
        .then(res => {
          if (res.data.status == "success") {
           
          
              this.article = res.data.categoria;
           
           this.getCategori();
            }else{
            swal(
                      "Creación fallida",
                      "La categoria no se ha creado bien :(",
                      "error"
                    );
            
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
 
        getCategori(){
 console.log("ennntraa")
        axios.get(this.url+"articleCategori").then(res => {
        if (res.data.status == "success") {
          this.categorialist = res.data.Categoria;
          console.log( this.categorialist);
          
        }else{
          console.log(res.data.status)
        }
      });
    },
     deleteCategori(categorId){
         axios.delete(this.url+'deletecategori/'+categorId).then(res=>{
           console.log(res);
           
     this.getCategori();
         });
        }
  }
 
  }
</script>