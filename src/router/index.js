import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Client from '../views/Client.vue'
import EditarCliente from '../components/clients/EditarClient.vue'
import NewClient from '../components/clients/NewClient.vue'


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
