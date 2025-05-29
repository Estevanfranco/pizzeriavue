<template>
  <div class="container text-center mt-5">
    <img src="https://cdn-icons-png.flaticon.com/512/3595/3595455.png" alt="Logo Pizza" width="120" class="mb-4" />
    <h2>¡Bienvenido a Pizzería Don Code! 🍕</h2>
    <p class="lead">Del horno al código, la mejor experiencia en pizzas digitales</p>

    <div class="mt-4">
      <button class="btn btn-danger m-2 px-4 py-2" @click="goToLogin">
        🍕 Iniciar Sesión
      </button>
      <button class="btn btn-warning m-2 px-4 py-2" @click="goToRegister">
        🧀 Registrarse
      </button>
    </div>

    <div class="mt-5">
      <small class="text-muted">Hecho con amor y mucho queso por el equipo dev ❤️🧀</small>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthLanding',
  methods: {
    goToLogin() {
      this.$router.push({ name: 'Login' })
    },
    goToRegister() {
      this.$router.push({ name: 'Register' })
    }
  }
}
</script>

<style scoped>
body {
  background-color: #fff8f0;
}

.container {
  background: #fff3e0;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0 20px rgba(255, 165, 0, 0.2);
}
</style>
