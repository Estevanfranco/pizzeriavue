<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Editar Tamaño de Pizza</h1>
    <div class="card">
      <div class="card-header fw-bold">Formulario Tamaño</div>
      <div class="card-body">
        <form @submit.prevent="updatePizzaSize">
          <!-- NO mostramos ni editamos el ID -->

          <div class="row mb-3">
            <label for="size" class="form-label">Tamaño:</label>
            <select
              id="size"
              class="form-control"
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
            />
          </div>

          <button class="btn btn-primary" type="submit">Actualizar</button>
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
  name: "EditPizzaSize",
  data() {
    return {
      pizzaSize: {
        size: "",
        price: null,
      },
      id: null,
    };
  },
  created() {
    // Obtener el id de la ruta para cargar datos existentes
    this.id = this.$route.params.id;
    this.fetchPizzaSize();
  },
  methods: {
    async fetchPizzaSize() {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/pizza-sizes/${this.id}`);
        this.pizzaSize = {
          size: res.data.size,
          price: res.data.price,
        };
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "No se pudo cargar el tamaño de pizza.", "error");
        this.cancel();
      }
    },
    cancel() {
      this.$router.push({ name: "PizzaSize" });
    },
    async updatePizzaSize() {
      try {
        await axios.put(`http://127.0.0.1:8000/api/pizza-sizes/${this.id}`, this.pizzaSize);
        Swal.fire({
          icon: "success",
          title: "Tamaño actualizado correctamente",
          timer: 2000,
          showConfirmButton: false,
          position: "top-end",
        });
        this.$router.push({ name: "PizzaSize" });
      } catch (error) {
        console.error(error);
        let message = "Hubo un error al actualizar.";
        if (error.response?.data?.errors) {
          const errors = error.response.data.errors;
          message = Object.values(errors).flat().join("\n");
        }
        Swal.fire("Error", message, "error");
      }
    },
  },
};
</script>
