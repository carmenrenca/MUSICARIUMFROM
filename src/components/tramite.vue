<template>
  <div id="tramite">
    
    <h5>Tramite Para el Pedido</h5>
    <form>
  <div class="form-group">
    <label for="exampleInputEmail1">Ciudad</label>
    <input  class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="pedido.Ciudad__c" placeholder="Enter email">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Provincia</label>
    <input class="form-control" id="exampleInputPassword1" v-model="pedido.Provincia__c"  placeholder="Password">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Direccion</label>
    <input class="form-control" id="exampleInputPassword1" v-model="pedido.Direccion__c"  placeholder="Password">
  </div>

  
</form>
<button  class="btn btn-primary" @click="tramitar()">Submit</button>
  </div>
  
</template>
<script type='text/javascript' src='https://cdn.jsdelivr.net/npm/emailjs-com@2.4.1/dist/email.min.js'></script>
<script>


import { global } from "../../global";
import Pedido from "../models/Pedido";
import axios from 'axios';
 import jwtDecode from 'jwt-decode'
import swal from "sweetalert";
import emailjs from 'emailjs-com';
import  Cliente from'../models/Cliente';

  export default {
      mounted() {
         this.tokendecode();

      },
    data() {
            

      return {
       idCliente:'', cliente:'',email:'',
                 url: global.url,
      articulos:[],
        pedido:new Pedido("","","","",""),
cliente:[],
      }
    },
    methods: {
  
      tramitar(){
                 this.tokendecode();

                  this.articulos = JSON.parse(localStorage.getItem('carrito'));
        console.log(this.id+"decode");
        if(this.pedido.Provincia__c && this.pedido.Direccion__c && this.pedido.Ciudad__c  && this.pedido.total__c ){
 console.log(this.pedido);
             axios.post(this.url + "pedido/" ,{Status__c:this.pedido.Status__c, Infocliente:this.cliente, Ciudad__c:this.pedido.Ciudad__c,articulos:  this.articulos, total__c:this.pedido.total__c, cliente__c: this.pedido.cliente__c, email:this.pedido.email, Provincia__c: this.pedido.Provincia__c,  Direccion__c: this.pedido.Direccion__c}).then(res => {
     
        if (res) {
          console.log(res);
           axios.post(this.url+'crearpdf/'+this.pedido._id, this.pedido).then(res=>{
              console.log(res);
                    if(res.data.status=='success'){
                        console.log("pdf generado")
                    }
                  
            });
        }
        
      });

    //  this.enviar();
             this.$router.push('/fintramite'); 

        }else{
  swal({
                title: "Completa todos los campos",
                text: "datos incorrectos",
                icon: "warning",

                dangerMode: true
              });
        }
     
      },



        tokendecode(){
          console.log("eeentraaaa")
           const token = localStorage.token
const decoded = jwtDecode(token);
this.cliente=decoded;
           this.idCliente=decoded.sub;
           this.email=decoded.email;
          this.pedido.cliente__c=this.idCliente;
          this.pedido.email=this.email;
            console.log(decoded);
            console.log(this.idCliente+"iiidddd");
             const carrito = localStorage.carrito
              const Totalcarrito = localStorage.Totalcarrito
this.pedido.total__c= Totalcarrito;
console.log("TOTAL: "+Totalcarrito)
        },
          enviar(){
            console.log("EMAIL "+this.email);
   axios.post(this.url+'email/'+this.email ).then(res=>{
           console.log(res);});
    
  }
                      
                        
   
    }
  }  
  
</script>