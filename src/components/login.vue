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
                    <div class="row mb-4 px-3">
                        <h6 class="mb-0 mr-4 mt-2">Sign in with</h6>
                        <div >
                          <img src="../img/instagram.png" />
                            <div class="fa fa-facebook"></div>
                        </div>
                        <div class="twitter text-center mr-3">
                            <div class="fa fa-twitter"></div>
                        </div>
                        <div class="linkedin text-center mr-3">
                            <div class="fa fa-linkedin"></div>
                        </div>
                    </div>
                    <div class="row px-3 mb-4">
                        <div class="line"></div> <small class="or text-center">Or</small>
                        <div class="line"></div>
                    </div>
                    <div class="row px-3"> <label class="mb-1">
                            <h6 class="mb-0 text-sm">Email Address</h6>
                        </label> <input class="mb-4"  v-model="email" type="text" name="email" placeholder="Enter a valid email address"> </div>
                    <div class="row px-3"> <label class="mb-1">
                            <h6 class="mb-0 text-sm">Password</h6>
                        </label> <input type="password" v-model="password" name="password" placeholder="Enter password"> </div>
                    <div class="row px-3 mb-4">
                        <div class="custom-control custom-checkbox custom-control-inline"> <input id="chk1" type="checkbox" name="chk" class="custom-control-input"> <label for="chk1" class="custom-control-label text-sm">Remember me</label> </div> <a href="#" class="ml-auto mb-0 text-sm">Forgot Password?</a>
                    </div>
                    <div class="row mb-3 px-3"> <button type="submit" class="btn btn-blue text-center"  @click="onSubmit()">Login</button>  </div>
                    <div class="row mb-4 px-3"> <small class="font-weight-bold">Don't have an account? <router-link class="text-danger " to="/registro">Register</router-link></small> </div>
           
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
import Cliente from "../models/Cliente.js";
 //import jwtDecode from 'jwt-decode'

  export default {
      data() {
    return {
      searchString: null,
      url: global.url,
      user: null,
      email: "",
      password: "",
      rol:"",
      body: null,
       cliente: new Cliente("", "", "", "", "", "", ""),
    };
  },
    props: {
      source: String,
    },methods:{
       onSubmit() {
         console.log("entrra")
      axios
        .post(this.url+"signin", {
           email: this.email,
          password: this.password
        })
        .then(res => {
          localStorage.setItem("token", res.data.token);
          console.log(res.data.token);
          this.email = "";
          this.password = "";
            localStorage.removeItem("rol");
//const token = localStorage.usertoken
//const decoded = jwtDecode(token)
//this.rol= decoded.identity.rol;
//console.log("ROLLL: "+this.rol)
//localStorage.setItem("rol",this.rol);
          if (localStorage.getItem("usertoken") != "undefined") {
            this.$router.push("/home");
            console.log("entraa");
          } else {
            console.log("es undefine" + localStorage.getItem("token"));
            swal({
              title: "Usuario Invalido",
              text: "Si no dispone de una cuenta de usuario registrese",
              icon: "warning",
              dangerMode: true
            });
          }
          //  router.push({ name: 'Profile' })
        })
        .catch(err => {
          console.log(err);
            swal({
              title: "Error",
              text: "Si no dispone de una cuenta de usuario registrese",
              icon: "warning",
              dangerMode: true
            });
        });
      
      // this.emitMethod()
    },
    }
  }
</script>