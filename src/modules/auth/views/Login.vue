<template>
  <div class="login-container">
    <div class="login-box">
      <img src="@/assets/logos/Logo_w.png" alt="Logo" class="logo" />
      <h2>Login</h2>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" v-model="email" required autocomplete="email" />
          <p v-if="authStore.errorMessages.email" class="error-message">
            {{ authStore.errorMessages.email }}
          </p>
        </div>

        <div class="form-group">
          <label for="password">Password:</label>
          <input
            type="password"
            v-model="password"
            required
            autocomplete="current-password"
          />
          <p v-if="authStore.errorMessages.password" class="error-message">
            {{ authStore.errorMessages.password }}
          </p>
        </div>

        <p v-if="authStore.errorMessage" class="error-message">
          {{ authStore.errorMessage }}
        </p>

        <button type="submit" class="btn" :disabled="loading">
          {{ loading ? "Logging in..." : "Login" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../store/authStore";

const authStore = useAuthStore();
const email = ref("walaa@gmail.com");
const password = ref("Ps123456789");
const loading = ref(false);

const handleLogin = async () => {
  loading.value = true;
  await authStore.login(email.value, password.value);
  loading.value = false;
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  color: #fff;
}

.login-box {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.3);
  text-align: center;
  width: 420px;
  transition: transform 0.3s ease-in-out;
}

.login-box:hover {
  transform: scale(1.03);
}

.logo {
  width: 120px;
  margin-bottom: 20px;
  filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.3));
}

h2 {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 1px;
  color: #f8f9fa;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

input {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  outline: none;
  font-size: 16px;
  transition: 0.3s;
}

input:focus {
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.2);
}

.btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #00c6ff, #0072ff);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn:hover {
  background: linear-gradient(135deg, #0072ff, #00c6ff);
  box-shadow: 0 0 18px rgba(0, 183, 255, 0.6);
}

.error-message {
  color: #ff4d4d;
  font-size: 14px;
  margin-top: 5px;
}
</style>
