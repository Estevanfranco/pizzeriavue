<template>
  <div class="container mt-5">
    <h2>Iniciar sesión</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label>Email</label>
        <input type="email" v-model="email" class="form-control" required />
      </div>
      <div class="form-group mt-2">
        <label>Contraseña</label>
        <input type="password" v-model="password" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary mt-3">Ingresar</button>
    </form>
  </div>
</template>

<script>
import authService from "@/services/authService";

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async login() {
      try {
        await authService.login(this.email, this.password);
        this.$router.push({ name: "Home" });
      } catch (error) {
        alert("Credenciales incorrectas");
      }
    }
  }
};
</script>
