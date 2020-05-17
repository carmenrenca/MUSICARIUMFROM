<template>
<div>
    <div class="form-group filtrostatus">
  <label for="sel1">Ver por estado: </label>
  <select v-model="status" class=" control" id="sel1" @change="getPedidoFiltreStatus(status)" >
    <option>Pendiente</option>
    <option>Preparado para Enviar</option>
    <option>Finalizado</option>
    <option>All</option>
  </select>

   <label for="sel1">Ver por Cliente: </label>
  <select v-model="email" class=" control" id="sel1" @change="getPedidoFiltreContact(email)" >
    <option v-for="cliente in cliente" :key="cliente._id">{{cliente.email}}</option>


  </select>
</div>

<table class="tablePedido table-bordered">
  <thead>
    <tr>
      <th scope="col">ID</th>
    <th>Cliente</th>
      <th scope="col">Fecha de Compra</th>
  
      <th scope="col">Total</th>
       <th scope="col">Estado</th>
          <th scope="col">Acciones</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="pedido in pedido" :key="pedido._id">
      <td>   <router-link :to="{name:'pedidoUser', params:{id: pedido._id}}"><b> {{pedido._id}}</b></router-link> </td>
     <td>{{pedido.email}}</td>
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
    name:'AllPedidos',
   mounted() {
   
 this.tokendecode();
 this.getPedido();
  },
    data() {
   
    return {
        status:'', email:'',
      clienteID:'',
    pedido:[], cliente:[],
      url: global.url ,
      id:'',
   
      
    };
  },
    methods:{
     
    
  tokendecode(){
    const token = localStorage.token
const decoded = jwtDecode(token);
console.log(decoded.sub)
this.id=decoded.sub;
  },
    cerrarsesion(){
          localStorage.removeItem('usertoken');      
            
            setTimeout(() => {
              this.$router.push("/")
            }, 1500)
            
         },

      getPedido(){

          console.log(this.url)
            axios.get(this.url+'getAllpedido').then(res=>{
              console.log(res);
                    if(res.data.status=='success'){
                        this.pedido= res.data.pedido; 
                        this.cliente= res.data.pedido; 
                      console.log(res.data.pedido );
                    }
                  
            });

        },

          getPedidoFiltreStatus(status){
            if(status=="All"){
                this.getPedido();
            }else{
  console.log(status);
          console.log(this.url)
            axios.get(this.url+'getAllpedido/'+status).then(res=>{
              console.log(res);
                    if(res.data.status=='success'){
                        this.pedido= res.data.pedido; 
                      console.log(this.pedido);
                    }
                  
            });
            }
        
        },

        getPedidoFiltreContact(email){

 if(email=="All"){
                this.getPedido();
            }else{

                   axios.get(this.url+'getAllpedido').then(res=>{
              console.log(res);
                    if(res.data.status=='success'){
                        this.cliente= res.data.pedido; 
                      console.log(res.data.pedido );
                    }
                  
            });
console.log(email)
            axios.get(this.url+'getPedidoCliente/'+email).then(res=>{
              console.log(res);
                    if(res.data.status=='success'){
                        this.pedido= res.data.pedido; 
                      console.log(this.pedido);
                    }
                  
            });
            }
        }
    }
};
</script>