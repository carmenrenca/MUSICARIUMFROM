<template>
<div class="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
    <div class="cardlogin card0 border-0">
        <div class="row d-flex">
            <div class="col-lg-6">
                <div class="card1 pb-5">
                    <div class="row px-3 justify-content-center mt-4 mb-5 border-line"> <img src="../assets/logo.jpg" class="image"> </div>
                </div>
                
            </div>
            <div class="col-lg-6">
                <div class="card2 cardlogin border-0 px-4 py-5">
                       <div class="row px-3"> <label class="mb-1">
                            <h6 class="mb-0 text-sm">Nombre</h6>
                        </label> <input class="mb-4"  v-model="clientes.nombre" type="text" name="User" placeholder="Enter a Name"> </div>

                       <div class="row px-3"> <label class="mb-1">
                            <h6 class="mb-0 text-sm">Apellido</h6>
                        </label> <input class="mb-4"  v-model="clientes.apellido" type="text" name="User" placeholder="Enter a Alias"> </div>
                 
 
                          <div class="row px-3"> <label class="mb-1">
                            <h6 class="mb-0 text-sm">Phone</h6>
                        </label> <input class="mb-4"  v-model="clientes.telefono" type="text" name="Phone" placeholder="Enter a valid Phone"> </div>
                   
                   <div class="row px-3"> <label class="mb-1">
                            <h6 class="mb-0 text-sm">Email</h6>
                        </label> <input class="mb-4"  v-model="clientes.email" type="text" name="Email" placeholder="Enter a valid email address"> </div>

                    <div class="row px-3"> <label class="mb-1">
                            <h6 class="mb-0 text-sm">Password</h6>
                        </label> <input type="password" v-model="clientes.password" name="password" placeholder="Enter password"> </div>
                  <br>
                    <div class="row mb-3 px-3"> <button type="submit" class="btn btn-blue text-center"  @click="registro()">Registre</button> </div>
                    <div class="row mb-4 px-3"> <small class="font-weight-bold"> Have an account? <router-link class="text-danger " to="/">Login</router-link></small> </div>
                </div>
            </div>
        </div>
        <div class="bg-blue py-4">
            <div class="row px-3"> <small class="ml-4 ml-sm-5 mb-2">Copyright &copy; 2019. All rights reserved.</small>
                <div class="social-contact ml-4 ml-sm-auto"> <span class="fa fa-facebook mr-4 text-sm"></span> <span class="fa fa-google-plus mr-4 text-sm"></span> <span class="fa fa-linkedin mr-4 text-sm"></span> <span class="fa fa-twitter mr-4 mr-sm-5 text-sm"></span> </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import axios from "axios";
import { global } from "../../global";
import swal from "sweetalert";
// import jwtDecode from 'jwt-decode'

import Cliente from "../models/Cliente.js";
export default {
  props: {
    size: {
      default: "70px",
      source: String
    },

    background: {
      default: "#41b883"
    },
    duration: {
      default: "1.2s"
    }
  },

  computed: {
    rectStyles() {
      return {
        backgroundColor: this.background,
        animationDuration: this.duration
      };
    },
    styles() {
      return {
        width: this.size,
        height: this.size
      };
    }
  },

  data() {
    return {
      url: global.url,
      items: ["Administrador", "Cliente"],
      user: null,
      body: null,
      cliente: new Cliente("", "", "", "", "","",""),
      loanding: false,
      clientes: new Cliente("", "", "", "", "","",""),
      nombre: "",
  
      email: "",
      password: "",
        telefono:"",
        apellido:"",

      validacion: ""
    };
  },

  methods: {
    registro() {
      this.loanding = true;
      this.validacion = "";
    
      console.log(this.clientes);
      axios
        .post(this.url+"signup", {
          nombre: this.clientes.nombre,
          email: this.clientes.email,
          apellido: this.clientes.apellido,
          telefono: this.clientes.telefono,
          direccion: this.clientes.direccion
        })
        .then(res => {
          console.log(res);
               localStorage.setItem("token", res.data.token);

            this.email = "";
            this.password = "";
              if (localStorage.getItem("token") != "undefined") {
              this.$router.push("/home");
            } else {
              console.log("es undefine" + localStorage.getItem("token"));
              swal({
                title: res.data.message,
                text: "Los datos son incorrectos",
                icon: "warning",

                dangerMode: true
              });
            }
        })
        .catch(err => {
          this.loanding = false;
          console.log(err);
          swal("Error", "Datos No Validos", "error");
        });
    }
  }
};
</script>