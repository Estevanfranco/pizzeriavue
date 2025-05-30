import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Client from '../views/Client.vue'
import EditarCliente from '../components/clients/EditarClient.vue'
import NewClient from '../components/clients/NewClient.vue'
import Usuario from '../views/Usuario.vue'
import EditarUsuario from '../components/ususarios/EditarUsuario.vue'
import NewUsuario from '../components/ususarios/NewUsuario.vue'
import LoginView from '../views/LoginView.vue'
import AuthLanding from '../views/AuthLanding.vue'    // ✅ Nueva vista inicial

import authService from '@/services/authService'
import Register from '@/views/Register.vue'
import PizzaSize from '@/views/PizzaSize.vue'
import EditarPizzaSize from '@/components/PizzaSize/EditarPizzaSize.vue'
import NewPizzaSize from '@/components/PizzaSize/NewPizzaSize.vue'

const routes = [
   {
    path: '/PizzaSize',
    name: 'PizzaSize',
    component: PizzaSize,
    meta: { requiresAuth: true }
  },
  {
    path: '/EditarPizzaSize/:id',
    name: 'EditarPizzaSize',
    component: EditarPizzaSize,
    meta: { requiresAuth: true }
  },
  {
    path: '/NewPizzaSize',
    name: 'NewPizzaSize',
    component: NewPizzaSize,
    meta: { requiresAuth: true }
  },
  // 👇 Pantalla de bienvenida tipo pizzería
  {
    path: '/',
    name: 'AuthLanding',
    component: AuthLanding
  },
  // 👇 Login
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  // 👇 Registro
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  // 👇 Rutas protegidas
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/client',
    name: 'Client',
    component: Client,
    meta: { requiresAuth: true }
  },
  {
    path: '/EditarCliente/:id',
    name: 'EditarCliente',
    component: EditarCliente,
    meta: { requiresAuth: true }
  },
  {
    path: '/NewClient',
    name: 'NewClient',
    component: NewClient,
    meta: { requiresAuth: true }
  },
  {
    path: '/Usuario',
    name: 'Usuario',
    component: Usuario,
    meta: { requiresAuth: true }
  },
  {
    path: '/EditarUsuario/:id',
    name: 'EditarUsuario',
    component: EditarUsuario,
    meta: { requiresAuth: true }
  },
  {
    path: '/NewUsuario',
    name: 'NewUsuario',
    component: NewUsuario,
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'about',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// ✅ Protección de rutas
router.beforeEach((to, from, next) => {
  const isAuthenticated = authService.isAuthenticated()

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
