<template>
<div>
    <div class="form-group filtrostatus">
  <label for="sel1">Ver por estado:</label>
  <select class="form-control control" id="sel1">
    <option>Pendiente</option>
    <option>Preparado para Enviar</option>
    <option>Finalizado</option>

  </select>
</div>

<table class="tablePedido table-bordered">
  <thead>
    <tr>
      <th scope="col">ID</th>

      <th scope="col">Fecha de Compra</th>
      <th scope="col">Total</th>
       <th scope="col">Estado</th>
          <th scope="col">Acciones</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="pedido in pedido" :key="pedido._id">

           <td>   <router-link :to="{name:'pedidoUser', params:{id: pedido._id}}"><b> {{pedido._id}}</b></router-link> </td>

        <td>{{pedido.date | moment('from', 'now')}}</td>
      <td>{{pedido.total__c}}€</td>
       <td>{{pedido.Status__c}}</td>
       <td>Imprimir</td>
     
    </tr>
  
  </tbody>
</table>
</div>
</template>

<script>
import axios from "axios";
 import jwtDecode from 'jwt-decode'
import { global } from "../../global";
export default {
    name:'perfil',
   mounted() {
    this.clienteID = this.$route.params.id;
 this.tokendecode();
 console.log(this.email);
 this.getPedido(this.email);
  },
    data() {
   
    return {
      clienteID:'',
    pedido:[],
      url: global.url ,
      email:'',
   
      
    };
  },
    methods:{
     
    
  tokendecode(){
    const token = localStorage.token
const decoded = jwtDecode(token);
console.log(decoded.sub)
this.email=decoded.email;
  },
    cerrarsesion(){
          localStorage.removeItem('usertoken');      
            
            setTimeout(() => {
              this.$router.push("/")
            }, 1500)
            
         },

      getPedido(email){
          console.log(email);
          console.log(this.url)
            axios.get(this.url+'getPedidoCliente/'+email).then(res=>{
              console.log(res);
                    if(res.data.status=='success'){
                        this.pedido= res.data.pedido; 
                      console.log(this.pedido);
                    }
                  
            });
        },
    }
};
</script>