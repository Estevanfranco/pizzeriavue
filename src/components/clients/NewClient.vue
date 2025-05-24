<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Nuevo Cliente</h1>
    <div class="card">
      <div class="card-header fw-bold">Formulario Cliente</div>
      <div class="card-body">
        <form @submit.prevent="saveClient">
          
           <div class="row mb-3">
            <label for="user" class="form-label">Usuario:</label>
            <div class="input-group">
              <div class="input-group-text"><font-awesome-icon icon="user" /></div>
              <select class="form-select" v-model="client.users_id">
              <option value="">Seleccione un usuario</option>
              <option v-for="user in users" :key="user.id" :value="user.id">
                {{ user.name }}
              </option>
            </select>

            </div>
          </div>
          
          
          <div class="row mb-3">
            <label for="address" class="form-label">Dirección:</label>
            <div class="input-group">
              <div class="input-group-text"><font-awesome-icon icon="location-dot" /></div>
              <input
                type="text"
                class="form-control"
                id="address"
                placeholder="Dirección"
                v-model="client.address"
              />
            </div>
          </div>

          <div class="row mb-3">
            <label for="phone" class="form-label">Teléfono:</label>
            <div class="input-group">
              <div class="input-group-text"><font-awesome-icon icon="phone" /></div>
              <input
                type="text"
                class="form-control"
                id="phone"
                placeholder="Teléfono"
                v-model="client.phone"
              />
            </div>
          </div>

         

          <button class="btn btn-primary" type="submit">Guardar</button>
          <button class="btn btn-secondary mx-2" @click="cancel">Cancelar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: 'NewClient',
  data() {
    return {
      client: {
        address: '',
        phone: '',
        users_id: ''
      },
      users: []
    };
  },
  methods: {
    cancel() {
      this.$router.push({ name: 'Client' });
    },
    /*async saveClient() {
      
        const res = await axios.post('http://127.0.0.1:8000/api/clients', this.client);
        console.log(res)
        if (res.status === 200 ) {
          this.$router.push({ name: 'Client' });
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Cliente guardado exitosamente',
            showConfirmButton: false,
            timer: 2000
          });
        }
   
    }*/
   async saveClient() {
    console.log('Datos que se van a enviar:', this.client);
  try {
    const res = await axios.post('http://127.0.0.1:8000/api/clients', this.client);
    this.$router.push({ name: 'Client' });
    Swal.fire({
      icon: 'success',
      title: 'Cliente guardado correctamente',
      timer: 2000,
      showConfirmButton: false,
      position: 'top-end'
    });
  } catch (error) {
    if (error.response && error.response.status === 422) {
      const messages = Object.values(error.response.data.errors).flat().join('\n');
      Swal.fire({
        icon: 'error',
        title: 'Error de validación',
        text: messages
      });
    } else {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al guardar el cliente.'
      });
    }
  }
}

  },
  mounted() {
   axios.get('http://127.0.0.1:8000/api/users').then(response => {
        this.users = response.data; // Asegúrate de que así viene tu JSON
      });
  }
};
</script>
