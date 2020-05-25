import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import VueMoment from 'vue-moment';
import moment from 'moment';
import 'moment/locale/es';
import LastArticle from './components/LastArticle.vue';
import EditArticle from './components/EditArticle.vue';
import carro from './components/carro.vue';
import Article from './components/Article.vue';
import Cliente from './components/Cliente.vue';
import Tramite from './components/tramite.vue';
import fintramite from './components/FinTramite.vue';
import pedidos from './components/MisPedidos.vue'
import login from './components/login.vue';
import registro from './components/registre.vue';
import ArticleCategori from './components/ArticleCategori.vue';
import CreateArticle from './components/CreateArticle.vue';
import CrearCategori from './components/CrearCategory.vue';
import favorito from './components/favoritos.vue';
import Blog from './components/blog.vue';
import Perfil from './components/perfil.vue';
import DatosAcceso from './components/datosAcceso.vue';
import DatosPersonales from './components/DatosPersonales.vue';
import AllPedidos from './components/AllPedidos.vue';
import PedidoUser from './components/pedidoUser.vue';
import Search from './components/Search.vue';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueRouter);

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(Vuelidate);



Vue.use(VueMoment,{
  moment
});
Vue.config.productionTip = false

const  routes=[
  {path:'/', name:'login' ,component: login},
  {path:'/ArticleCategori/:title',  name:'articlecategori', component: ArticleCategori},
  {path:'/favorito', component:favorito},
  {path:'/createarticle', component: CreateArticle},
  {path:'/home', component: LastArticle},
  {path:'/ultimos-articulos', component: LastArticle},
  {path:'/articulo/:id', name:'article', component: Article},
  {path:'/editarticle/:id', name:'edit', component:EditArticle},
  {path:'/carro', name:'carro', component:carro},
  {path:'/Cliente', component:Cliente},
  {path:'/tramite', component:Tramite},
  {path:'/registro',component:registro,  name:'registro'},
  {path:'/fintramite', component:fintramite},
  {path:'/pedidos', component:pedidos},
  {path:'/saveCategori', component:CrearCategori},
  {path:'/blog', component:Blog},
  {path:'/Perfil' , component:Perfil},
  {path:'/datosAcesso', component:DatosAcceso},
  {path:'/datosPersonales', component:DatosPersonales},
  {path:'/AllPedidos', component:AllPedidos},
  {path:'/redirect/:searchString', component:Search},

  {path:'/pedidoUser/:id',name:'pedidoUser', component:PedidoUser},
]

//hooks(this.routes)
const router = new VueRouter({

  routes,
  mode: 'history'
});
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
