import { createRouter, createWebHistory } from '@ionic/vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import HomeAdmin from '../views/AdminInicio.vue'
import VistaPerfil from '../views/PerfilView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'loginview',
      component: LoginView
    },


    {
      path: '/admin/inicio',
      name: 'homeadmin',
      component: HomeAdmin,
    }
    ,

    {
      path: '/perfil',
      name: 'vista perfil',
      component: VistaPerfil,
    }
    
    
   
  ]
})

router.beforeEach( (to,from,next) => {
  const usuarioLog = localStorage.getItem('usuario')
  if( to.matched.some(r => r.meta.RequireAuth) && !usuarioLog ) {
    next('/')
  }
  next()
})
  
export default router
