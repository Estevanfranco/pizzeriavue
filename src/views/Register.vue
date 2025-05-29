<template>
  <div class="registro-container">
    <div class="form-box">
      <h2>🍕 Registro de Usuario</h2>
      <form @submit.prevent="register">
        <input v-model="form.name" placeholder="Nombre completo" />
        <input v-model="form.email" placeholder="Correo electrónico" type="email" />
        <input v-model="form.password" placeholder="Contraseña" type="password" />
        <input v-model="form.password_confirmation" placeholder="Confirmar contraseña" type="password" />

        <select v-model="form.role">
          <option disabled value="">Selecciona un rol</option>
          <option value="cliente">Cliente</option>
          <option value="empleado">Empleado</option>
          <option value="administrador">Administrador</option>
        </select>

        <button type="submit">Registrarse</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'RegisterView',
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: ''
      }
    }
  },
  methods: {
    async register() {
      try {
        await axios.post('http://localhost:8000/api/register', this.form)

        Swal.fire({
          title: '¡Registro exitoso!',
          text: 'Tu cuenta ha sido creada.',
          icon: 'success',
          confirmButtonText: 'OK'
        })

        this.$router.push({ name: 'Login' })
      } catch (error) {
        if (error.response?.data?.errors) {
          const mensajes = Object.values(error.response.data.errors).flat().join('<br>')
          Swal.fire({
            title: 'Errores en el formulario',
            html: mensajes,
            icon: 'error',
            confirmButtonText: 'Corregir'
          })
        } else {
          Swal.fire('Error', 'Ocurrió un error inesperado.', 'error')
        }
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

input,
select {
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
