import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Client from '../views/Client.vue'
import EditarCliente from '../components/clients/EditarClient.vue'
import NewClient from '../components/clients/NewClient.vue'
import Usuario from '../views/Usuario.vue'
import EditarUsuario from '../components/ususarios/EditarUsuario.vue'
import NewUsuario from '../components/ususarios/NewUsuario.vue'
import LoginView from '../views/LoginView.vue' // Asegúrate de crear este archivo
import authService from '@/services/authService' // Asegúrate de crear este archivo también

const routes = [
  {
    path: '/',
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
    path: '/login',
    name: 'Login',
    component: LoginView
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

// Protección de rutas
router.beforeEach((to, from, next) => {
  const isAuthenticated = authService.isAuthenticated()

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
