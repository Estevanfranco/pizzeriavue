<template>
  <div class="container">
    <h1 class="text-start">Listado clientes | 
      <button @click="newClient()" class="btn btn-success mx-2">
        <font-awesome-icon icon="plus" />
      </button>
    </h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">user</th>
          <th scope="col">address</th>
          <th scope="col">phone</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(client,index) in clients" :key="client.id">
          <th scope="row"> {{index + 1}}</th>
          <td>{{ client.user.name || 'Sin usuario' }}</td> 
          <td>{{ client.address }}</td>
          <td>{{ client.phone }}</td>
          
          <td>
            <button @click="deleteClient(client.id)" class="btn btn-danger mx-2">
              <font-awesome-icon icon="trash" />
            </button>
            <button @click="editClient(client.id)" class="btn btn-warning mx-2">
              <font-awesome-icon icon="pencil" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "client",
  data() {
      return {
        clients: []
      }
  },

  methods: {
    newClient() {
      this.$router.push({ name: "NewClient" });
    },
    editClient(id) {
      this.$router.push({ name: 'EditarComuna', params: { id: `${id}` } })
    },

    deleteClient(id) {
    Swal.fire({
    title: `¿Quieres eliminar el Cliente con ID ${id}?`,
    showCancelButton: true,
    confirmButtonText: "¡Eliminar!",
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(`http://127.0.0.1:8000/api/clients/${id}`)
        .then(() => {
          Swal.fire('¡Eliminado!', '', 'success');
          this.fetchClients(); // 👈 Esto recarga los datos actualizados sin recargar la página
        })
        .catch((error) => {
          console.error("Error al eliminar:", error);
          Swal.fire("Error", "No se pudo eliminar el cliente", "error");
        });
    }
  });
    },
  fetchClients() {
  axios
    .get('http://127.0.0.1:8000/api/clients')
    .then((response) => {
      this.clients = response.data.data ?? [];
    })
    .catch((error) => {
      console.error("Error al cargar clientes:", error);
    });
}


  },



  mounted() {
    axios
      .get('http://127.0.0.1:8000/api/clients')
      .then(response =>  (this.clients = response.data.data ))
  },
  
};
</script>