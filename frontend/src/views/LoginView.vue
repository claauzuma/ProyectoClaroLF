<script>
import {IonPage,IonContent,IonInput,IonButton} from '@ionic/vue'
import { storeToRefs } from "pinia";
import { loginStore } from "../stores/userStore"

export default {
  components: {IonPage,IonContent,IonInput,IonButton},
  setup() {
    const store = loginStore(); //obligatorio
    const { estaLogeado } = storeToRefs(store);
    const { login } = store;
    return { login, estaLogeado };
  },
  data() {
    return {
      user: { alumnoEnGym: false}
    }
  },
  methods: {
    async loginForm() {
      await this.login(this.user);
      if(this.estaLogeado) {
        this.$router.push("/")
      } else {
        alert("Datos inválidos")
        // redirigir a otra pagina
      }
    },
  
  }
}
</script>

<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="container">
        <div class="login-text">Login</div>
        <ion-input class="input" v-model="user.email" placeholder="E-mail" type="email"></ion-input>
        <ion-input class="input" v-model="user.password" placeholder="Password" type="password"></ion-input>
        <ion-button @click="loginForm">Login</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<style>



.login-text{
  font-weight: bold;
  color: rgb(78, 78, 78);
  font-size: 32px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  max-width: 500px;
  background-color: rgb(235, 235, 235);
  max-height: 350px;
  margin: auto;
  margin-top: 120px;
  gap: 22px;
  padding: 42px;
  border-radius: 30px;
  box-shadow: 0px 0px 21px 2px rgba(0,0,0,0.25);
}

.input {
  background-color: white;
  border-radius: 8px;
  border: 3px solid rgb(199, 199, 199);
  transition: 0.3s;
}

.input:hover{
  background-color: rgb(247, 247, 247);
}


.native-input.sc-ion-input-md {
  padding-left: 8px;
}



</style>