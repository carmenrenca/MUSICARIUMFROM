<template> 
<html>
<head>

</head>
<body>


  
<div id="app" >
    <div v-if="route!='login' && route!='registro'" >

 <HeaderComponent></HeaderComponent>
    </div>
   <div class="clearfix" v-if="route!='login' && route!='registro'">
     <category></category>
   </div>
    <div class="modal-body">

   </div>
    <div class="center">
      <!--<LastArticle></LastArticle>-->
      <router-view></router-view>
      
    </div>
    <div class="clearfix"></div>
     <div v-if="route!='login' && route!='registro'" >
    <FooterComponent></FooterComponent>
     </div>

  </div>
</body>

</html>

</template>

<script>
import HeaderComponent from "./components/HeaderComponent.vue";

import FooterComponent from "./components/FooterComponent.vue";

export default {
  name: 'App',

  components: {
        HeaderComponent,
        FooterComponent
,

  },
computed: {
  route: function  currentRouteName() {
    console.log(this.$route.name)
        return this.$route.name;
    }
  },
  data: () => ({
    //
  }),
};
</script>

<style>
@import "./assets/css/style.css";
</style>