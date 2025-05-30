<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Nuevo Tamaño de Pizza</h1>
    <div class="card">
      <div class="card-header fw-bold">Formulario Tamaño</div>
      <div class="card-body">
        <form @submit.prevent="savePizzaSize">
          <div class="row mb-3">
            <label for="pizzas_id" class="form-label">ID de Pizza:</label>
            <input
              type="number"
              class="form-control"
              id="pizzas_id"
              v-model="pizzaSize.pizzas_id"
            />
          </div>

          <div class="row mb-3">
            <label for="size" class="form-label">Tamaño:</label>
            <input
              type="text"
              class="form-control"
              id="size"
              v-model="pizzaSize.size"
            />
          </div>

          <div class="row mb-3">
            <label for="price" class="form-label">Precio:</label>
            <input
              type="number"
              step="0.01"
              class="form-control"
              id="price"
              v-model="pizzaSize.price"
            />
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
  name: "NewPizzaSize",
  data() {
    return {
      pizzaSize: {
        pizzas_id: "",
        size: "",
        price: "",
      },
    };
  },
  methods: {
    cancel() {
      this.$router.push({ name: "PizzaSizes" });
    },
    async savePizzaSize() {
      try {
        const res = await axios.post("http://127.0.0.1:8000/api/pizza-sizes", this.pizzaSize);
        this.$router.push({ name: "PizzaSizes" });
        Swal.fire({
          icon: "success",
          title: "Tamaño guardado correctamente",
          timer: 2000,
          showConfirmButton: false,
          position: "top-end",
        });
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al guardar el tamaño de pizza.",
        });
      }
    },
  },
};
</script>
