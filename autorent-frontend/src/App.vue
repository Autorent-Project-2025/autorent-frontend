<template>
  <Navbar v-if="isLoggedIn" />
  <router-view />
  <ToastContainer />
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import Navbar from "./components/Navbar.vue";
import ToastContainer from "./components/ToastContainer.vue";
import { useTheme } from "./composables/useTheme";

const isLoggedIn = computed(() => !!localStorage.getItem("token"));

// Инициализация темы при загрузке приложения
const { initTheme } = useTheme();
onMounted(() => {
  initTheme();
});
</script>
