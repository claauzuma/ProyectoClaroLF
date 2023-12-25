<script>
// import { RouterLink, RouterView } from 'vue-router'
import {IonApp, IonRouterOutlet, IonHeader, IonButton } from '@ionic/vue'
import { storeToRefs } from "pinia";
import { loginStore } from './stores/userStore'

export default {
  components: { IonApp, IonRouterOutlet, IonHeader, IonButton },
  setup() {
    const store1 = loginStore();
    const { esAlumno, esAlumnoPlatino, esAlumnoOro,
      esProfe,esAdmin,usuario, estaLogeado} = storeToRefs(store1);
    const { logout } = store1;

    return {esAlumnoPlatino,esAlumnoOro,esAlumno,esProfe,esAdmin,usuario, estaLogeado, logout};
  },
  methods: {
       logoutForm() {

        
        this.logout();
        this.$router.push("/login")
      }
  }

}
</script>

<template>
  <ion-app>
    <ion-header class="header-container">
      <div class="button-container">
        <RouterLink class="custom-button" to="/">Home</RouterLink>
        <RouterLink class="custom-button" to="/admin/inicio" v-if="estaLogeado && esAdmin">Inicio</RouterLink>
        <RouterLink class="custom-button" to="/perfil" v-if="estaLogeado">Perfil</RouterLink>
        <RouterLink class="custom-button" to="/login" v-if="!estaLogeado">Login</RouterLink>
      
      </div>
      <div class="user-info">User: {{ this.usuario.email }}</div>
      <div v-if="estaLogeado && !esProfe && !esAdmin" class="user-info">PLAN: {{ this.usuario.plan }}</div>
      <ion-button class="custom-logout" fill="clear" @click="logoutForm" v-if="estaLogeado">Logout</ion-button>
      
    </ion-header>
    <ion-router-outlet />
  </ion-app>
</template>

<style scoped>


.header-container {
  display: flex;
  justify-content: space-between; /* Distribuye los elementos a los lados */
  align-items: center;
  background-color: #f0f0f0;
  padding: 10px;
}

.button-container {
  display: flex;
  align-items: center;
}

.custom-button {
  background-color: #007BFF;
  color: #fff;
  margin: 8px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s, transform 0.3s; /* Transición de color y tamaño al hacer hover */
}

.custom-button:hover {
  background-color: #00b30f;
  transform: scale(1.1); /* Aumenta el tamaño del botón en un 10% al hacer hover */
}

.custom-logout {
  background-color: #DC3545;
  color: #fff;
  margin: 5px;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
}

.user-info {
  padding: 5px;
}

</style>