<script>
import {IonList,IonPage,IonContent,IonInput,IonButton} from '@ionic/vue'
import { storeToRefs } from "pinia";
import { loginStore } from "../stores/userStore"

export default {
  components: {IonList,IonPage,IonContent,IonInput,IonButton},
  setup() {
    const store = loginStore();
    const { estaLogeado } = storeToRefs(store);
    const { eliminarObjeto,cargarDatos,agregarUsuario, editarProfesor } = store;
    return { eliminarObjeto,cargarDatos,agregarUsuario, estaLogeado, editarProfesor };
  },
  data() {
    return {
      user: {rol: "profe"},
      lista:[],
      mostrarFormularioFlag: false, // Inicialmente oculto
      showPassword: false,
      editMode: false, // Bandera para saber si estamos en modo de edición
      editingProfessor: {}, // Almacena los datos del usuario que está siendo editado

    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    async loadData() {
      try {
        this.lista = await this.cargarDatos("profes")
      } catch(e) {
        console.log(e);
        this.errorMessage = "Se produjo un error"
      }
    },
    async addUser() {
      console.log("Hasta aca perfecto")
      await this.agregarUsuario(this.user);
      alert("Se agrego correctamente")
      await this.loadData()
      this.$router.push("/admin/profesores")

    },
    mostrarFormulario() {
      this.mostrarFormularioFlag = !this.mostrarFormularioFlag; // Mostrar el formulario al hacer clic
    },
    mostrarContraseña(item) {
      item.showPassword = !item.showPassword;
    }
    ,
    async eliminar(id) {
      console.log("Pasa primer metodo")
      await this.eliminarObjeto("profesores",id);
      await this.loadData()
      alert("Se eliminó correctamente el profe")
      this.$router.push("/profes")
    },
    editarProfesor(profesor) {
      console.log("Profesor recibido para edición:", profesor);
      this.editingProfessor = { ...profesor }; // Almacena una copia del usuario seleccionado para edición
      console.log("Profesor recibido para edición:", this.editingProfessor);
      this.user = { ...profesor }; // Rellena el formulario con los datos del usuario
      this.editMode = true; // Activa el modo de edición
      this.mostrarFormulario(); // Muestra el formulario flotante
    },
    cancelEdit() {
      // Cerrar formulario y limpiar datos de edición
      this.mostrarFormularioFlag = false; // Ocultar el formulario flotante
      this.editingProfessor = {}; // Limpiar datos de edición
      this.editMode = false; // Desactivar modo de edición

    },
    async updateProfesor() {
      console.log(this.editingProfessor)
      console.log(this.user)
      await this.editarProfesor(this.editingProfessor.id, this.user);
      
      await this.loadData()
      console.log("estoy aca")
      alert("Se edito correctamente")
      this.$router.push("/admin/profesores")
      this.editingProfessor = {};
      this.editMode = false;
      this.mostrarFormulario();
    }
    

  }
}
</script>

<template>
  <ion-page>
    <ion-content class="ion-padding"><br><br><br>

      <h2 class="login-text">Profesores</h2>
      <!-- Botón para abrir el formulario -->
      <ion-button @click="mostrarFormulario">Agregar Profe</ion-button>
      <!-- Lista de usuarios -->
      
      <ion-item v-for="e in lista" :key="e.id">
          <ion-label>
              Nombre y Apellido: {{ e.nombre }} {{ e.apellido }}
            </ion-label>
            <ion-label>
              DNI: {{ e.dni }}
            </ion-label>
            <ion-label>
              Email: {{ e.email }}
            </ion-label>
            <ion-label>
              Password:
              <span v-if="!e.showPassword">********</span>
              <span v-else>{{ e.password }}</span>
          </ion-label>
          <ion-button @click="editarProfesor(e)">Editar</ion-button>
          <ion-button @click="eliminar(e.id)">Borrar</ion-button>
          <ion-button @click="mostrarContraseña(e)">Mostrar/Ocultar Contraseña</ion-button>
      
        </ion-item>
      <!-- Formulario flotante -->
      <div class="floating-form" v-if="mostrarFormularioFlag">
          <button @click="cancelEdit" class="close-button">X</button>
          <div class="login-text">{{ editMode ? 'Editar profesor' : 'Agregar profesor' }}</div>
          <ion-input class="input" v-model="user.nombre" placeholder="Nombre" type="text" required></ion-input>
          <ion-input class="input" v-model="user.apellido" placeholder="Apellido" type="text" required></ion-input>
          <ion-input class="input" v-model="user.dni" placeholder="DNI" type="text" required></ion-input>
          <ion-input class="input" v-model="user.email" placeholder="E-mail" type="email" required></ion-input>
          <ion-input class="input" v-model="user.password" placeholder="Contraseña" type="password" required></ion-input>
          <ion-button @click="editMode ? updateProfesor() : addUser()">{{ editMode ? 'Guardar cambios' : 'Agregar' }}</ion-button>
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
  min-height: 400px;
  background-color: rgb(235, 235, 235);
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

.custom-select {
  border: 2px solid rgb(199, 199, 199);
  border-radius: 8px;
  transition: 0.3s;
}

.custom-select::part(icon) {
  display: none; /* Oculta el icono del desplegable */
}

.custom-select:hover {
  background-color: rgb(247, 247, 247);
}

.custom-select {
  --placeholder-color: rgb(199, 199, 199);
}

.floating-form {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  gap: 11px;
  transform: translate(-50%, -50%);
  background-color: white; /* Fondo transparente */
  padding: 20px;
  border: 2px solid rgba(0, 0, 0, 0.25); /* Borde del formulario */
  border-radius: 12px; /* Mayor radio para la figura circular */
  box-shadow: 0px 0px 21px 2px rgba(0, 0, 0, 0.25);
  z-index: 1; /* Para que aparezca por encima del contenido */
}

</style>