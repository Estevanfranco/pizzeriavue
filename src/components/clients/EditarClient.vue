<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Editar</h1>
    <div class="card">
      <div class="card-header fw-bold">Cliente</div>
      <div class="card-body">
        <form @submit.prevent="updateClient">
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
                v-model="client.id"
              />
            </div>
          </div>

          <div class="row mb-3">
            <label for="users_id" class="form-label">Usuario</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="user" />
              </div>
               <input
                type="text"
                class="form-control"
                id="users_id"
                disabled="true"
                v-model="client.user_name"
              />
            </div>
          </div>

          <div class="row mb-3">
            <label for="address" class="form-label">Dirección</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="map-marker-alt" />
              </div>
              <input
                type="text"
                class="form-control"
                id="address"
                placeholder="Dirección del cliente"
                v-model="client.address"
              />
            </div>
          </div>

          <div class="row mb-3">
            <label for="phone" class="form-label">Teléfono</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="phone" />
              </div>
              <input
                type="text"
                class="form-control"
                id="phone"
                placeholder="Teléfono del cliente"
                v-model="client.phone"
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
  name: 'EditarClient',
  data() {
    return {
      client: {
      id: 0,
      users_id: '',
      address: '',
      phone: '',
      user_name: ''
    },
      users: []
    }
  },
  methods: {
    cancelar() {
      this.$router.push({ name: 'Client' })
    },
    async updateClient() {
      const res = await axios.put(
        `http://127.0.0.1:8000/api/clients/${this.client.id}`, this.client)
      if (res.status === 200) {
        this.$router.push({ name: 'Client' })
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Cliente actualizado exitosamente',
          showConfirmButton: false,
          timer: 2000
        })
      }
    }
  },
  mounted() {
    this.client.id = this.$route.params.id
    axios.get(`http://127.0.0.1:8000/api/clients/${this.client.id}`)
        .then(response => {
    const data = response.data.client
    this.client.id = data.id
    this.client.users_id = data.users_id
    this.client.address = data.address
    this.client.phone = data.phone

    if (data.user) {
      this.client.user_name = data.user.name // Aquí guardas el nombre
    }
  })
      .catch(error => {
        console.error('Error al cargar cliente:', error)
      })
  }
}
</script>
