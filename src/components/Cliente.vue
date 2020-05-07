<template>
  <div class="general">
    <div class="center">
      <section id="content">
        <br />
        <h2 class="subheader">Usuarios</h2>

        <div id="search" class="sidebar-item">
          <h3>Buscador</h3>
          <p>Encuentra el usuario que buscas</p>
          <form @submit.prevent="getClienteBySearch(searchString)">
            <input type="text" name="search" v-model="searchString" />
            <input type="submit" name="submit" value="Buscar" class="btn" />
            <b-button variant="outline-primary" @click="getClientes()">Ver Todo</b-button>
          </form>
        </div>
         <div class="clearfix"></div>
        <table class="table table-bordered tablecontact responsive">
  <thead>
    <tr>
        <th scope="col">Name</th>
                <th scope="col">LastName</th>
                <th scope="col">FirstName</th>
                <th scope="col">Email</th>
                <th scope="col">Birthdate</th>
                <th scope="col">City</th>
                <th scope="col">Street</th>
                <th scope="col">Eliminar</th>
                <th scope="col">Editar</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="cliente in cliente" :key="cliente.Id">
       <th scope="row"  >{{cliente.Name}}</th>
                <td >{{cliente.FirstName}}</td>
                <td >{{cliente.LastName}}</td>
                <td >{{cliente.Email}}</td>
                <td >{{cliente.Birthdate}}</td> 
                <td >{{cliente.MailingCity}}</td>
                  <td style="width: 100px">{{cliente.MailingStreet}}</td>
                <td >
                  <router-link :to="{name:'cliente', params:{id: cliente._id}}">
                    <button type="button" class="btn btn-outline-primary">Editar</button>
                  </router-link>
                </td>
                <td   v-if="cliente.dni!=dniU">
                  <button
                    class="btn btn-outline-danger"
                    @click="deleteCliente(cliente._id)"
                  >Eliminar</button>
                </td>
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
import { required, minLength } from "vuelidate/lib/validators";
import axios from "axios";
import { global } from "../../global";
import swal from "sweetalert";
import Cliente from "../models/Cliente.js";

export default {
  name: "Cliente",

  components: {
    
  },
  validations: {
    cliente: {
      nombre: {
        required,
        minLength: minLength(2)
      },
      apellidos: {
        required,
        minLength: minLength(2)
      },
      telefono: {
        minLength: minLength(9)
      },
      email: {
        required
      }
    }
  },


  data() {
    return {
      myHeaders: new Headers(),
      dniU:'',
      url: global.url,
      submite: false,
      cliente: new Cliente("", "", "", "", "", "", ""),
      clientes: new Cliente("", "", "", "", "", "", ""),
      clientesList: []
    };
  },
  mounted() {
      this.GETCLIENTES();
  },
  methods: {
  
    mostrarusuario() {
      console.log(this.cliente);
      this.submite = true;
      this.$v.$touch();

      if (this.$v.$invalid) {
        return false;
      }

      alert("Validacion Pasada");
    },
    getClienteBySearch(searchString) {
      axios
        .get(this.url + "cliente-search/" + searchString)
        .then(res => {
          if (res.data.status == "success") {
            this.cliente = res.data.clientes;

            console.log(searchString);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getClientes() {
      axios
        .get(this.url + "contact")
        .then(res => {
          if (res.data.status == "success") {
            this.cliente = res;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    save() {
      console.log(this.url);
      console.log(this.clientes);
      axios
        .post(this.url + "cliente/save", this.clientes)
        .then(res => {
          if (res.data.status == "success") {
            swal(
              "Cliente Creado",
              "el Cliente se ha creado correctamente :)",
              "success"
            );
            this.clientes = res.data.cliente;
            this.$router.push("/Blog");
          } else {
            swal(
              "Creación fallida",
              "El articulo no se ha creado bien :(",
              "error"
            );
          }
        })
        .catch(err => {
          console.log(err);
          console.log(this.cliente);
        });
    },

    GETCLIENTES() {
      return axios({
        method: "GET",
        url: this.url + "contact/",
        headers: this.myHeaders
      })
        .then(res => {
          console.log(res);
          if (res.data.status == "success") {
            
            this.cliente = res.data.message.records;
            this.clientesList.push(res.data.message.records);
            console.log(res.data.message.records);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    deleteCliente(clienteId) {
      axios.delete(this.url + "clientes-delete/" + clienteId).then(res => {
        console.log(res);
        this.GETCLIENTES();
      });
    }
  }
};
</script>