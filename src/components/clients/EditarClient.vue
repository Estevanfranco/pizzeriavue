<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Editar Cliente</h1>
    <div class="card">
      <div class="card-header fw-bold">Cliente</div>
      <div class="card-body">
        <form @submit.prevent="updateClient">
          <div class="row mb-3">
            <label for="id" class="form-label">ID</label>
            <input
              type="text"
              class="form-control"
              id="id"
              disabled
              v-model="client.id"
            />
          </div>

          <div class="row mb-3">
            <label for="users_id" class="form-label">Usuario</label>
            <select class="form-select" v-model="client.users_id">
              <option value="">Seleccione un usuario</option>
              <option v-for="user in users" :key="user.id" :value="user.id">
                {{ user.name }}
              </option>
            </select>
          </div>

          <div class="row mb-3">
            <label for="address" class="form-label">Dirección</label>
            <input
              type="text"
              class="form-control"
              id="address"
              v-model="client.address"
            />
          </div>

          <div class="row mb-3">
            <label for="phone" class="form-label">Teléfono</label>
            <input
              type="text"
              class="form-control"
              id="phone"
              v-model="client.phone"
            />
          </div>

          <button type="submit" class="btn btn-primary">Actualizar</button>
          <button type="button" class="btn btn-secondary mx-2" @click="cancelar">
            Cancelar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: 'EditClient',
  data() {
    return {
      client: {
        id: 0,
        users_id: '',
        address: '',
        phone: ''
      },
      users: []
    };
  },
  methods: {
    cancelar() {
      this.$router.push({ name: 'Clients' });
    },
    async updateClient() {
      
        const res = await axios.put(`http://127.0.0.1:8000/api/clients/${this.client.id}`, this.client);
        if (res.status === 200) {
         this.$router.push({ name: 'Clients' });
          Swal.fire({
            icon: 'success',
            title: 'Cliente actualizado',
            timer: 2000,
            position: 'top-end',
            showConfirmButton: false
          });
         
        }
      
    }
  },
mounted() {
  this.client.id = this.$route.params.id;
  axios.get(`http://127.0.0.1:8000/api/clients/${this.client.id}`)
    .then(response => {
      this.client = response.data.client;
      this.users = response.data.users; // si en el controlador mandas también la lista de usuarios
    })
    .catch(error => {
      console.error("Error al cargar el cliente:", error);
    });
}

};
</script>
