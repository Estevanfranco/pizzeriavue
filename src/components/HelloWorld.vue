<template>
  <div class="home-container">
    <div class="welcome-card">
      <img
        class="pizza-icon"
        src="https://vectorjungal.com/files/preview/960x960/11721161243fyyregooyx8xnt383dcdprnoozccrmgsvpjszoulhwpkwq5rxgu4fbyntettsrl1ujgnjtrfrzyqi0retegr56svj0f0yw0xegno.png"
        alt="Pizza Icon"
      />
      <h1>¡Bienvenido a <span class="brand">Pizzería Don Código</span>!</h1>
      <p class="subtitle">El sistema perfecto para administrar tus clientes y usuarios con sabor a código.</p>

      <div class="info-section">
        <h2>📋 ¿Qué puedes hacer aquí?</h2>
        <ul>
          <li>👥 Gestionar clientes y sus pedidos.</li>
          <li>👨‍💻 Administrar usuarios del sistema.</li>
          <li>📊 Consultar reportes y estadísticas.</li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>

<style scoped>
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  background: #fffaf2;
  min-height: 100vh;
}

.welcome-card {
  text-align: center;
  background: #fff;
  border-radius: 25px;
  padding: 40px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
  max-width: 800px;
  width: 100%;
}

.pizza-icon {
  width: 90px;
  margin-bottom: 20px;
}

.brand {
  color: #e74c3c;
  font-weight: bold;
  font-family: "Comic Sans MS", cursive, sans-serif;
}

.subtitle {
  font-size: 18px;
  color: #444;
  margin-bottom: 30px;
}

.info-section {
  background-color: #fdf0e3;
  border: 2px dashed #e67e22;
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 30px;
}

.info-section h2 {
  margin-bottom: 10px;
  color: #d35400;
}

.info-section ul {
  list-style: none;
  padding-left: 0;
}

.info-section li {
  font-size: 16px;
  margin: 10px 0;
}

.pizza-img-wrapper {
  margin-top: 20px;
}

.pizza-image {
  width: 100%;
  border-radius: 15px;
  max-height: 260px;
  object-fit: cover;
  border: 3px solid #f39c12;
}
</style>
