<script>
import {IonPage, IonContent, IonInput, IonButton} from '@ionic/vue'
import { storeToRefs } from "pinia";
import { loginStore,  } from "../stores/userStore"

export default {
  components: {IonPage, IonContent, IonInput, IonButton},

  setup() {
    const store = loginStore();
    const { usuario } = storeToRefs(store);
    const { modificarPerfil } = store;
    return {modificarPerfil, usuario };
  },
  data(){
    return{
    mostrarFlagModifEmail: false, // Inicialmente oculto
    mostrarFlagModifContra: false // Inicialmente oculto
    }
  
  },
  methods: {
    async modificarPerfil() {
      await this.modificarPerfil(this.usuario, nuevoDato, esEmail);
      alert("Se modificó correctamente el perfil")
      this.$router.push("/perfil")
    },
    formModificarEmail() {
      if (this.mostrarFlagModifContra) {
        this.mostrarFlagModifContra = false;
      }
      this.mostrarFlagModifEmail = !this.mostrarFlagModifEmail; // Mostrar el formulario al hacer clic
      console.log("Se modifica el flag email")
      console.log(this.mostrarFlagModifEmail)
    },

    formModificarContra() {
      this.mostrarFlagModifContra = !this.mostrarFlagModifContra; // Mostrar el formulario al hacer clic
      if (this.mostrarFlagModifEmail) {
        this.mostrarFlagModifEmail = false;
      }
    },

    async modificarPerfilLocal(esEmail) {
        const nuevoDato = esEmail ? this.usuario.nuevoEmail : this.usuario.nuevoDato;
        await this.modificarPerfil(this.usuario, nuevoDato, esEmail);
        if (esEmail){
          this.formModificarEmail()
        } else {
          this.formModificarContra()
        }
        
        alert("Se modificó correctamente el perfil")
        this.$router.push("/perfil")
    }
  }
}
</script>

<template>

  <ion-page>
    <ion-content class="ion-padding">
      <div class="container">
        <div class="login-text">Perfil</div>
    <h2>Datos del perfil</h2>
    {{ usuario.email }}
    <br>
    {{ usuario.password }}
    
    <ion-button @click="formModificarEmail">Modificar email</ion-button>
    <ion-button @click="formModificarContra">Modificar contraseña</ion-button>
    </div>

     <!-- Formulario flotante -->
     <div class="modify-form" v-if="mostrarFlagModifEmail">
        <div >
          <div class="login-text">Modificar email</div>
          <ion-input class="input" placeholder="Ingrese email actual" type="email"></ion-input>
          <ion-input class="input" v-model="usuario.nuevoEmail" placeholder="Ingrese nuevo email" type="email"></ion-input>
          <ion-button @click="() => modificarPerfilLocal(true)">Modificar</ion-button>
        </div>
      </div>

        <!-- Formulario flotante -->
     <div class="modify-form" v-if="mostrarFlagModifContra">
        <div >
          <div class="login-text">Modificar contraseña</div>
          <ion-input class="input" placeholder="Ingrese contraseña actual" type="password"></ion-input>
          <ion-input class="input" v-model="usuario.nuevoDato" placeholder="Ingrese nueva contraseña" type="password"></ion-input>
          <ion-button @click="() => modificarPerfilLocal(false)">Modificar</ion-button>
        </div>
      </div>

    </ion-content>
  </ion-page>
   

</template>


<style>

.modify-form {
  position: absolute;
  top: 40%;
  left: 80%;
  transform: translate(-50%, -50%);
  background-color: transparent; /* Fondo transparente */
  padding: 20px;
  border: 2px solid rgba(0, 0, 0, 0.25); /* Borde del formulario */
  border-radius: 12px; /* Mayor radio para la figura circular */
  box-shadow: 0px 0px 21px 2px rgba(0, 0, 0, 0.25);
  z-index: 1; /* Para que aparezca por encima del contenido */
}</style>