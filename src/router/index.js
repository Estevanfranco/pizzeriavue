import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Client from '../views/Client.vue'
import EditarCliente from '../components/clients/EditarClient.vue'
import NewClient from '../components/clients/NewClient.vue'
import Usuario from '@/views/Usuario.vue'
import EditarUsuario from '@/components/ususarios/EditarUsuario.vue'
import NewUsuario from '@/components/ususarios/NewUsuario.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
{
    path: '/client',
    name: 'Client',
    component: Client,
  },
 {
    path: '/EditarCliente/:id',
    name: 'EditarCliente',
    component: EditarCliente,
  },
 {
  path: '/NewClient',
  name: 'NewClient',
  component: NewClient
},
{
  path: '/Usuario',
  name: 'Usuario',
  component: Usuario
},
{
    path: '/EditarUsuario/:id',
    name: 'EditarUsuario',
    component: EditarUsuario,
  },
  {
  path: '/NewUsuario',
  name: 'NewUsuario',
  component: NewUsuario
},
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
