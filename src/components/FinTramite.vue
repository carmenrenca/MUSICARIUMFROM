<template>
  <div >
    
   <div class="generalcarro">
     <div id="texttramite">
        <h5>Tu pedido se ha confirmado</h5>
    <p>Tu pedido ha sido guardadp con exito, una vex que realizes la transferencia bancaria a la cuenta 7329832388012ADD con el coste del pedido, sera procesado y enviado</p>
       <div class="cardCliente" style="width: 18rem;">
  <div class="card-header">
    Cliente
  </div>
  <ul class="list-group list-group-flush">
      <li class="list-group-item">Nombre: {{this.Name}}</li>
    <li class="list-group-item">Correo: {{this.Email}}</li>
  
  </ul>
</div>
     </div>
    
   <div id="tableCarro">
     
     <table  id="table">
          <tr >
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Unidades</th>
   
          </tr>
            <tr v-for="i in this.articlescarro"  v-bind:key='i' >
              <td>
                 <img 
            :src="url+'get-image/'+i.imagen" :alt="i.Name" v-if="i.imagen" class="cardimgcarro"
            /></td>

            <!--<td><router-link :to="{name:'article', params:{id: i.Id}}">  {{i.Name}}</router-link></td>  --> 
          <td><router-link :to="{name:'article', params:{id: i.Id}}">  {{i.Name}}</router-link></td> 
            <td> {{i.Precio__c}}€</td>
            
              <td> {{i.unidad}}</td>
            </tr>
            
     </table>
     <div class="total"><h2>Total: {{this.suma}}€ </h2>
      </div>
     
 <div>
         <button type="button"  @click="descargarPDF" class="btn btn-dark">Download PDF</button>

       </div>
   </div>

    <div class="clearfix"></div>
  </div>
   
  </div>
</template>

<script src="js/jquery.min.js"></script>
<script src="jspdf.min.js"></script>
<script src="jspdf.plugin.autotable.min.js"></script>
<!-- jsPDF library -->
<script src="js/jsPDF/dist/jspdf.min.js"></script>
<script>
 import jwtDecode from 'jwt-decode'
import jsPDF from 'jspdf'
import JsPDFAutotable from 'jspdf-autotable' ;
import {global} from "../../global";

  export default {
    data() {
      return {
             url: global.url,
        lineafactura:[
        { imagen:'', nombre:'', precio:'', unidades:''}
      ] ,
         headers: [
        {
          align: "left",
          filterable: false,
          value: "name"
        },
        { text: "Titulo", value: "title" },
        { text: "Precio€", value: "precio" },
        { text: "Cantidad", value: "cantidad" },
        { text: "ADD", value: "action", sortable: false }
      ],
           articlescarro: [],suma:0,Name:'',Email:''
      }
    },
  
    mounted(){
      this.obtenerProductosLocalStorage();
    this.tokendecode();
console.log(this.articlescarro);
  },
    methods: {
   obtenerProductosLocalStorage(){
      

        //Comprobar si hay algo en LS
        if(localStorage.getItem('carrito') === null){
            this.articlescarro = [];
        }
        else {
            this.articlescarro = JSON.parse(localStorage.getItem('carrito'));
            console.log(this.articlescarro)
        }
    this.calculartotal();
    },
    calculartotal(){
    this.suma=0;
           this.articlescarro.forEach(function(entry) {
           this.suma=this.suma+entry.Precio__c*entry.unidad;
            
  }, this);
this.suma=this.suma.toFixed(2);
  console.log( this.suma);
    }  ,
       tokendecode(){
           const token = localStorage.token
const decoded = jwtDecode(token);
            this.Name=decoded.nombre;
            this.Email=decoded.email;
            console.log(this.Name)
        },
         descargarPDF(){
         
var doc = new jsPDF();
  var img = new Image();
    img.src = 'logo.png';
    doc.addImage(img, "PNG", 1, 1);
             doc.setFontSize(18);
  doc.setTextColor(40);
  doc.setFontStyle('bold');
  doc.text("FACTURA", 80, 12);

      var columns = [ "Nombre", "Precio","Unidades"];
var rows = [];
 this.articlescarro.forEach(element =>{
   console.log(element);
      var temp = [element.Name,element.Precio__c,element.unidad];
      rows.push(temp);
    }); 
doc.autoTable(columns, rows);


      doc.save('table.pdf');
         }
         }
    
  }
</script>