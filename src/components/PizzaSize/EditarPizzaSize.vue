<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Editar Tamaño</h1>
    <div class="card">
      <div class="card-header fw-bold">Tamaño de Pizza</div>
      <div class="card-body">
        <form @submit.prevent="updatePizzaSize">
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
                v-model="pizzaSize.id"
              />
            </div>
          </div>

          <div class="row mb-3">
            <label for="pizzas_id" class="form-label">ID de Pizza</label>
            <input
              type="number"
              class="form-control"
              id="pizzas_id"
              v-model="pizzaSize.pizzas_id"
            />
          </div>

          <div class="row mb-3">
            <label for="size" class="form-label">Tamaño</label>
            <input
              type="text"
              class="form-control"
              id="size"
              v-model="pizzaSize.size"
            />
          </div>

          <div class="row mb-3">
            <label for="price" class="form-label">Precio</label>
            <input
              type="number"
              step="0.01"
              class="form-control"
              id="price"
              v-model="pizzaSize.price"
            />
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
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "EditPizzaSize",
  data() {
    return {
      pizzaSize: {
        id: "",
        pizzas_id: "",
        size: "",
        price: "",
      },
    };
  },
  methods: {
    cancelar() {
      this.$router.push({ name: "PizzaSizes" });
    },
    async updatePizzaSize() {
      try {
        const res = await axios.put(
          `http://127.0.0.1:8000/api/pizza-sizes/${this.pizzaSize.id}`,
          this.pizzaSize
        );
        if (res.status === 200) {
          this.$router.push({ name: "PizzaSizes" });
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Tamaño actualizado exitosamente",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      } catch (error) {
        console.error("Error al actualizar:", error);
        Swal.fire("Error", "No se pudo actualizar el tamaño", "error");
      }
    },
  },
  mounted() {
    this.pizzaSize.id = this.$route.params.id;
    axios
      .get(`http://127.0.0.1:8000/api/pizza-sizes/${this.pizzaSize.id}`)
      .then((response) => {
        const data = response.data;
        this.pizzaSize = {
          id: data.id,
          pizzas_id: data.pizzas_id,
          size: data.size,
          price: data.price,
        };
      })
      .catch((error) => {
        console.error("Error al cargar tamaño:", error);
      });
  },
};
</script>
