<template>
  <nav>
    <router-link to="/home">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/client">client</router-link> |
    <router-link to="/usuario">Usuarios</router-link>|
    <button @click="logout">Cerrar sesión</button>
  </nav>
  <router-view/>
</template>
<script>
import authService from '@/services/authService'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()

    const logout = () => {
      authService.logout()
      router.push({ name: 'Login' })
    }

    return { logout }
  }
}
</script>
<style>
button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 3px 5px;
  cursor: pointer;
  border-radius: 5px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
