<template>
  <div class="registro-container">
    <div class="form-box">
      <h2>🍕 Inicia sesión PizzaRomo</h2>
      <form @submit.prevent="login">
        <input
          type="email"
          v-model="email"
          placeholder="Correo electrónico"
          required
        />
        <input
          type="password"
          v-model="password"
          placeholder="Contraseña secreta"
          required
        />
        <button type="submit">Entrar a la cocina 🔥</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:8000/api/login', {
          email: this.email,
          password: this.password
        })

        // Guarda el token si usas JWT o similar
        localStorage.setItem('auth_token', response.data.token)

        Swal.fire({
          title: '¡Bienvenido a Don Pepito!',
          text: 'Ya puedes pedir tu pizza favorita.',
          icon: 'success',
          confirmButtonText: '¡A pedir!'
        })

        this.$router.push({ name: 'home' })
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Credenciales incorrectas o no registradas.',
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo'
        })
      }
    }
  }
}
</script>

<style scoped>
.registro-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: url('https://images.unsplash.com/photo-1601924928344-65f3d6b05a5f?auto=format&fit=crop&w=1470&q=80') no-repeat center center;
  background-size: cover;
  padding: 20px;
}

.form-box {
  background-color: rgba(255, 255, 255, 0.95);
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

input {
  display: block;
  margin: 15px auto;
  padding: 10px;
  width: 100%;
  max-width: 300px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
}

button {
  padding: 12px 25px;
  background-color: #e63946;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 15px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #d62828;
}

h2 {
  color: #e63946;
  margin-bottom: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>
