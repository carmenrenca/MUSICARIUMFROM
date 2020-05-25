<template>


  <div class="general">
      <section id="content">
        <h5 class="subheader">Detalle del Pedido</h5>  
        <div  v-if="this.rol=='Administrador'" >
           <label class="labeloption" for="sel1">Cambiar estado del pedido: </label>
<select id="cars" class="changeoption" v-model="status">
  <option>Pendiente</option>
    <option>Preparado para Enviar</option>
    <option>Finalizado</option>
</select>

         

<input class="changecuentabuttonPedido" @click="changeStatus()" type="submit" value="Cambiar estado">
 </div>
 <br>
 <ul class="list-group list-group-flush infopedido"  v-for="Cliente in Cliente" :key="Cliente._id">
    <h5>Datos del usuario:</h5>
      <li class="list-group-item"><b>Nombre:</b> {{Cliente.nombre+" "+Cliente.apellido}}</li>
    <li class="list-group-item"><b>Email: </b> {{Cliente.email}}</li>
     <li class="list-group-item"><b>Telefono: </b> {{Cliente.telefono}}</li>
  </ul>
<br>
  <ul class="list-group list-group-flush infopedido"  v-for="pedido in pedido" :key="pedido._id">
    <h5>Dirección de envio:</h5>
      <li class="list-group-item"><b>Pedido:</b> {{pedido._id}}</li>
    <li class="list-group-item"><b>Dirección: </b> {{pedido.Ciudad__c}}</li>
  </ul>
<br>
  <ul class="list-group list-group-flush infopedido"  v-for="pedido in pedido" :key="pedido._id">
    <h5>Dirección del pedido:</h5>
      <li class="list-group-item"><b>Estado:</b> {{pedido.Status__c}}</li>
    <li class="list-group-item"><b>Número de pedido:</b> </li>
   <li class="list-group-item"><b>Total a pagar: </b> {{pedido.total__c}}</li>
      <li class="list-group-item productpedido"><b>Productos: </b> 
      
        <div id="tableCarro" class="pedidotable">
     <table >
          <tr >
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Unidades</th>

          </tr>
            <tr v-for="i in articlescarro"  v-bind:key='i' >
              <td>
                <router-link :to="{name:'article', params:{id: i._id}}">
              <img 
            :src="url+'get-image/'+i.imagen" :alt="i.Name" v-if="i.imagen" class="cardimgcarro"
            />
                </router-link>
            </td>
                  <td><router-link :to="{name:'article', params:{id: i._id}}">  {{i.Name}}</router-link></td> 
          
            <td> {{i.Precio__c}}€</td>
              <td> {{i.unidad}}</td>
            
            
            </tr>

     </table>
 
                 <input class="changecuentabutton" @click="descargarPDF(PedidoId)" type="submit" value="Imprimir">


   </div>

      </li>

  </ul>
        </section>
    <Sidebar></Sidebar>
    </div>
   
    
</template>
 <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.0.272/jspdf.debug.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.js"></script>
<script src="html2pdf.bundle.min.js"></script>
<script>
import jsPDF from 'jspdf';
 import jwtDecode from 'jwt-decode'
import {global} from '../../global';
import axios from "axios";
import swal from "sweetalert";
//import Article from '../models/Article';
import Sidebar from './sidebar';

export default {
    name: 'PedidoUser',
    
    components:{
   
          Sidebar
    },
    data(){
        return {
            url: global.url,Email:'',PedidoId:'',pedido:[], articlescarro: [], Cliente:[],status:'',rol:"",
    aux:false,
        
        }
    }, mounted(){
    this.PedidoId=this.$route.params.id;
this.getPedido(this.PedidoId);

    },
    methods:{
 
         verificarol(){

               const token = localStorage.token
const decoded = jwtDecode(token);
          
         this.rol=decoded.role;
            
                },
changeStatus(){
  console.log(this.status);
  axios.put(this.url+'updateStatus/'+this.PedidoId, {status:this.status}).then(res=>{

                    if(res.data.status=='success'){
                      swal({
              title: "Estado cambiado A "+this.status,
              text: "Estado actualizado con exito",
              icon: "success",
              dangerMode: true
            });
                      console.log(   res);
                    }else if(res.data.status=='error'){
                               swal({
              title: res.data.message,
              text: "",
              icon: "error",
              dangerMode: true
            });
                    }
                  
            });
},
 getPedido(PedidoId){
        axios.get(this.url+'getPedidoId/'+PedidoId).then(res=>{
              console.log(res);
                    if(res.data.status=='success'){
                        this.pedido= res.data.pedido; 
                       this.articlescarro=res.data.pedido[0].articulos;
                       this.Cliente=res.data.pedido[0].Infocliente;
                      console.log(   this.articlescarro);
                    }
                  
            });
 },

 descargarPDF( PedidoId){

      axios.get(this.url+'getpdf/'+PedidoId).then(res=>{
              console.log(res);
                    if(res.data.status=='success'){

                        console.log("pdf generado");
                    }
                  
            });
 }
       
 
    }

}
</script>