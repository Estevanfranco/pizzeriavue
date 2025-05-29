<template>
  <div class="about-container">
    <div class="about-card">
      <h1>Acerca de Pizzería Don Código</h1>
      <p>
        Bienvenido al sistema de gestión de <strong>Pizzería Don Código</strong>, una solución diseñada para optimizar y facilitar el control de nuestros clientes, usuarios y procesos internos.
      </p>
      <p>
        Nuestro sistema fue creado con el propósito de digitalizar la experiencia de gestión en una pizzería, permitiendo una administración eficiente, rápida y amigable.
      </p>
      <p>
        Aquí podrás llevar el registro de clientes, controlar los accesos de los usuarios del sistema, gestionar pedidos, y mantener todo bajo control desde una sola plataforma.
      </p>
      <p>
        Gracias por confiar en nosotros. ¡Tu pizzería ahora tiene más sabor... y más control! 🍕
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutView",
};
</script>

<style scoped>
.about-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
  background-color: #fffaf2;
  min-height: 100vh;
}

.about-card {
  background-color: #fff;
  border-radius: 20px;
  padding: 40px;
  max-width: 800px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

.about-card h1 {
  color: #e74c3c;
  font-size: 32px;
  margin-bottom: 20px;
  text-align: center;
}

.about-card p {
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 15px;
  text-align: justify;
}
</style>
