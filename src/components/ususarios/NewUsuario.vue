<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Nuevo Usuario</h1>
    <div class="card">
      <div class="card-header fw-bold">Formulario Usuario</div>
      <div class="card-body">
        <form @submit.prevent="saveUser">
          <div class="row mb-3">
            <label for="name" class="form-label">Nombre:</label>
            <input
              type="text"
              class="form-control"
              id="name"
              v-model="user.name"
            />
          </div>

          <div class="row mb-3">
            <label for="email" class="form-label">Correo electrónico:</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="user.email"
            />
          </div>

          <div class="row mb-3">
            <label for="password" class="form-label">Contraseña:</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="user.password"
            />
          </div>

          <div class="row mb-3">
            <label for="role" class="form-label">Rol:</label>
            <select class="form-select" id="role" v-model="user.role">
              <option value="">Seleccione un rol</option>
              <option value="cliente">Cliente</option>
              <option value="empleado">Empleado</option>
              <option value="administrador">Administrador</option>
            </select>
          </div>

          <button class="btn btn-primary" type="submit">Guardar</button>
          <button class="btn btn-secondary mx-2" @click="cancel">
            Cancelar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "NewUser",
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        role: "",
      },
    };
  },
  methods: {
    cancel() {
      this.$router.push({ name: "Usuario" });
    },
    async saveUser() {
      console.log("Datos que se van a enviar:", this.user); // 👈 Aquí lo ves
      try {
        const res = await axios.post(
          "http://127.0.0.1:8000/api/users",
          this.user
        );
        this.$router.push({ name: "Usuario" });
        Swal.fire({
          icon: "success",
          title: "Usuario guardado correctamente",
          timer: 2000,
          showConfirmButton: false,
          position: "top-end",
        });
      } catch (error) {
        if (error.response && error.response.status === 422) {
          const messages = Object.values(error.response.data.errors)
            .flat()
            .join("\n");
          Swal.fire({
            icon: "error",
            title: "Error de validación",
            text: messages,
          });
        } else {
          console.error(error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un problema al guardar el usuario.",
          });
        }
      }
    },
  },
};
</script>
