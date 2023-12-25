import { defineStore } from 'pinia'
import axios from 'axios'
import { jwtDecode } from "jwt-decode";
export const loginStore = defineStore('login', {
    state: () => {
        return {
            usuario: {},
            estaLogeado: false,
            esAdmin: false,
            esLector: false,
            idLogeado: 0
        }
    },
    actions: {
        async login(usuario) {
            try {
                console.log(usuario.email)
                console.log(usuario.password)
                const datos = await axios.post("http://localhost:8080/api/usuarios/login", usuario);
                console.log(datos.data.email);
                if (datos.status == 200) {
                    console.log("Se logueo correctamente")
                    const decryptedToken = jwtDecode(datos.data.token)
                    this.esAdmin = decryptedToken.rol == 'admin';
                    this.esLector = decryptedToken.rol == 'lector';
                    this.idLogeado = decryptedToken.id;
                    this.estaLogeado = true;
                    this.usuario.email = usuario.email;
                    this.usuario.password = usuario.password;
                    this.usuario.id = decryptedToken.id;
                    console.log(decryptedToken.rol)

                    localStorage.setItem('usuario', JSON.stringify(
                        { email: usuario.email, token: datos.data.token }))
                } else {
                    console.log("No se pudo loggear")
                    this.estaLogeado = false;
                }
            } catch (e) {
                console.log(e);
            }
        },
       

        logout() {
            try {
                this.estaLogeado = false;
                this.idLogeado = 0;
                this.usuario = {};
                console.log("Se deslogea")
            } catch (e) {
                console.log(e);
            }
        },

        async agregarUsuario(usuario) {
            try {
            console.log("2da parte hecha")
            const datos = await axios.post("http://localhost:3000/usuarios/agregar", usuario);
            } catch (e) {
                console.log(e);
            }
        },
        async editarUsuario(id, usuario) {
            try {
            console.log("editando usuario")
            const datos = await axios.put("http://localhost:3000/alumnos/"+id, usuario);
            } catch (e) {
                console.log(e);
            }
        },
        async editarRutina(id, rutina) {
            try {
            console.log("editando rutina")
            const datos = await axios.put("http://localhost:3000/rutinas/"+id, rutina);
            console.log(" rutina editada - user store")
            } catch (e) {
                console.log(e);
            }
        },
        async editarClase(id, clase) {
            try {
            console.log("editando clase")
            const datos = await axios.put("http://localhost:3000/admin/clases/"+id, clase);
            console.log(" clase editada - user store")
            } catch (e) {
                console.log(e);
            }
        },
        async editarProfesor(id, profesor) {
            try {
            console.log("editando profesor")
            const datos = await axios.put("http://localhost:3000/admin/profesores/"+id, profesor);
            console.log(" profesor editado - user store")
            } catch (e) {
                console.log(e);
            }
        },
        async cargarDatos(objetos) {
            try {
            const response = await axios.get("http://localhost:3000/"+objetos);
            return response.data;
            } catch (e) {
                console.log(e);
            }
        },
        async addObject(objeto,objetos) {
            try {
            const datos = await axios.post("http://localhost:3000/"+objetos+"/agregar",objeto);
            } catch (e) {
                console.log(e);
            }
        },
        async insicribirseAClase(idClase, usuario) {
        
            console.log("Hasta aca va bien " +idClase + this.usuario.id)
            const datos = await axios.post("http://localhost:3000/clases/agregar/"+idClase,this.usuario);
           
        },
        async desuscribirseAClase(idClase) {
        
            console.log("desuscribirse " +idClase + this.usuario.id)
            const datos = await axios.delete("http://localhost:3000/clases/desuscribir/"+idClase, this.usuario);
            
           
        },

        suscritoAClase(idClase){
        const datos = axios.get("http://localhost:3000/clase/"+idClase,this.usuario.id)
        return datos.data
        },

        async eliminarObjeto(objeto,id) {
        console.log("Segunda parte esta bien" +objeto+id)
        const datos = await axios.delete("http://localhost:3000/"+objeto+"/"+id);


        },
        async modificarPerfil(usuario, nuevoDato, esEmail) {
            console.log("Se envia al backend la modificación de usuario: " + usuario.id)
            console.log("El nuevo mail/pass: " + nuevoDato)
            console.log("es Email: " + esEmail)
            const data = {
                id: usuario.id,  // Asumiendo que tu usuario tiene un campo "id"
                nuevoDato,
                esEmail
              };
            const datos = axios.put("http://localhost:3000/perfil/"+ usuario.id , data)

        }

        

    }
})
