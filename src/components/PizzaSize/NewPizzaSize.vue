<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Nuevo Tamaño de Pizza</h1>
    <div class="card">
      <div class="card-header fw-bold">Formulario Tamaño</div>
      <div class="card-body">
        <form @submit.prevent="savePizzaSize">
          <div class="row mb-3">
            <label for="size" class="form-label">Tamaño:</label>
            <select
              id="size"
              class="form-select"
              v-model="pizzaSize.size"
              required
            >
              <option disabled value="">Seleccione un tamaño</option>
              <option value="pequeña">Pequeña</option>
              <option value="mediana">Mediana</option>
              <option value="grande">Grande</option>
            </select>
          </div>

          <div class="row mb-3">
            <label for="price" class="form-label">Precio:</label>
            <input
              type="number"
              step="0.01"
              class="form-control"
              id="price"
              v-model="pizzaSize.price"
              required
              min="0"
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
        // Solo enviar size y price, no id
        const payload = {
          size: this.pizzaSize.size,
          price: Number(this.pizzaSize.price),
        };

        await axios.post("http://127.0.0.1:8000/api/pizza-sizes", payload);

        this.$router.push({ name: "PizzaSize" });

        Swal.fire({
          icon: "success",
          title: "Tamaño guardado correctamente",
          timer: 2000,
          showConfirmButton: false,
          position: "top-end",
        });
      } catch (error) {
        console.error(error);
        let message = "Hubo un error al guardar.";
        if (error.response?.data?.errors) {
          const errors = error.response.data.errors;
          message = Object.values(errors).flat().join("\n");
        }
        Swal.fire({
          icon: "error",
          title: "Error",
          text: message,
        });
      }
    },
  },
};
</script>
