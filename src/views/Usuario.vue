<template>
  <div class="container">
    <h1 class="text-start">
      Listado de usuarios
      <button @click="newUser()" class="btn btn-success mx-2">
        <font-awesome-icon icon="plus" />
      </button>
    </h1>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Rol</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="user.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>
            <button @click="editUser(user.id)" class="btn btn-warning mx-2">
              <font-awesome-icon icon="pencil" />
            </button>
            <button @click="deleteUser(user.id)" class="btn btn-danger mx-2">
              <font-awesome-icon icon="trash" />
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
  name: "user",
  data() {
    return {
      users: []
    };
  },
  methods: {
    newUser() {
      this.$router.push({ name: "NewUsuario" });
    },
    editUser(id) {
      this.$router.push({ name: "EditarUsuario", params: { id: `${id}` } });
    },
    deleteUser(id) {
      Swal.fire({
        title: `¿Quieres eliminar el usuario con ID ${id}?`,
        showCancelButton: true,
        confirmButtonText: "¡Eliminar!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://127.0.0.1:8000/api/users/${id}`)
            .then(() => {
              Swal.fire("¡Eliminado!", "", "success");
              this.fetchUsers();
            })
            .catch((error) => {
              console.error("Error al eliminar:", error);
              Swal.fire("Error", "No se pudo eliminar el usuario", "error");
            });
        }
      });
    },
    fetchUsers() {
      axios
        .get("http://127.0.0.1:8000/api/users")
        .then((response) => {
          this.users = response.data.data ?? [];
        })
        .catch((error) => {
          console.error("Error al cargar usuarios:", error);
        });
    }
  },
  mounted() {
    this.fetchUsers();
  }
};
</script>
