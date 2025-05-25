<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Editar</h1>
    <div class="card">
      <div class="card-header fw-bold">Usuario</div>
      <div class="card-body">
        <form @submit.prevent="updateUser">
          <div class="row mb-3">
            <label for="id" class="form-label">ID</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="tag" />
              </div>
              <input
                type="text"
                class="form-control"
                id="id"
                disabled
                v-model="user.id"
              />
            </div>
          </div>

          <div class="row mb-3">
            <label for="name" class="form-label">Nombre</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="user" />
              </div>
              <input
                type="text"
                class="form-control"
                id="name"
                placeholder="Nombre del usuario"
                v-model="user.name"
              />
            </div>
          </div>

          <div class="row mb-3">
            <label for="email" class="form-label">Correo</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="envelope" />
              </div>
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="Correo del usuario"
                v-model="user.email"
              />
            </div>
          </div>

          <button class="btn btn-primary" type="submit">Actualizar</button>
          <button type="button" class="btn btn-secondary mx-2" @click="cancelar">
            Cancelar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'EditarUsuario',
  data() {
    return {
      user: {
        id: 0,
        name: '',
        email: ''
      }
    }
  },
  methods: {
    cancelar() {
      this.$router.push({ name: 'Usuario' }) // ← Ajusta si el nombre de la ruta cambia
    },
    async updateUser() {
      const res = await axios.put(
        `http://127.0.0.1:8000/api/users/${this.user.id}`, this.user)
      if (res.status === 200) {
        this.$router.push({ name: 'Usuario' }) // ← Ajusta si el nombre de la ruta cambia
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario actualizado exitosamente',
          showConfirmButton: false,
          timer: 2000
        })
      }
    }
  },
  mounted() {
    this.user.id = this.$route.params.id
    axios.get(`http://127.0.0.1:8000/api/users/${this.user.id}`)
      .then(response => {
        const data = response.data.user
        this.user.id = data.id
        this.user.name = data.name
        this.user.email = data.email
      })
      .catch(error => {
        console.error('Error al cargar usuario:', error)
      })
  }
}
</script>
