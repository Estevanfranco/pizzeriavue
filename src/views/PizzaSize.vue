<template>
  <div class="container">
    <h1 class="text-start">
      Tamaños de Pizza
      <button @click="newPizzaSize()" class="btn btn-success mx-2">
        <font-awesome-icon icon="plus" />
      </button>
    </h1>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Pizza ID</th>
          <th>Tamaño</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(size, index) in pizzaSizes" :key="size.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ size.id ?? 'N/A' }}</td>
          <td>{{ size.size }}</td>
          <td>{{ size.price }}</td>
          <td>
            <button @click="editPizzaSize(size.id)" class="btn btn-warning mx-2">
              <font-awesome-icon icon="pencil" />
            </button>
            <button @click="deletePizzaSize(size.id)" class="btn btn-danger mx-2">
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
  name: "PizzaSize",
  data() {
    return {
      pizzaSizes: [],
    };
  },
  methods: {
    newPizzaSize() {
      this.$router.push({ name: "NewPizzaSize" });
    },
    editPizzaSize(id) {
      this.$router.push({ name: "EditarPizzaSize", params: { id } });
    },
    deletePizzaSize(id) {
      Swal.fire({
        title: `¿Eliminar tamaño de pizza con ID ${id}?`,
        showCancelButton: true,
        confirmButtonText: "¡Eliminar!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://127.0.0.1:8000/api/pizza-sizes/${id}`)
            .then(() => {
              Swal.fire("¡Eliminado!", "", "success");
              this.fetchPizzaSizes();
            })
            .catch((error) => {
              console.error("Error al eliminar:", error);
              Swal.fire("Error", "No se pudo eliminar el tamaño", "error");
            });
        }
      });
    },
    fetchPizzaSizes() {
      axios
        .get("http://127.0.0.1:8000/api/pizza-sizes")
        .then((response) => {
          this.pizzaSizes = response.data.data ?? [];
        })
        .catch((error) => {
          console.error("Error al cargar tamaños de pizza:", error);
        });
    },
  },
  mounted() {
    this.fetchPizzaSizes();
  },
};
</script>
