<template>
  <nav
    class="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div
            class="shrink-0 flex items-center cursor-pointer"
            @click="$router.push('/')"
          >
            <span class="text-2xl font-bold text-blue-600 dark:text-blue-500"
              >AutoRent</span
            >
          </div>

          <div class="hidden sm:ml-8 sm:flex sm:space-x-8 items-center">
            <router-link
              to="/cars"
              active-class="border-blue-500 text-gray-900 dark:text-white"
              class="border-b-2 border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-300 inline-flex items-center px-1 pt-1 text-sm font-medium transition duration-150 ease-in-out h-full"
            >
              Автомобили
            </router-link>

            <router-link
              to="/bookings"
              active-class="border-blue-500 text-gray-900 dark:text-white"
              class="border-b-2 border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-300 inline-flex items-center px-1 pt-1 text-sm font-medium transition duration-150 ease-in-out h-full"
            >
              Мои бронирования
            </router-link>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <!-- Theme Toggle -->
          <ThemeToggle />

          <div v-if="!token">
            <button
              @click="$router.push('/login')"
              class="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-150 shadow-sm"
            >
              Войти
            </button>
          </div>

          <div v-else class="flex items-center gap-4">
            <button
              @click="logout"
              class="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium transition duration-150"
            >
              Выйти
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="sm:hidden flex justify-around border-t dark:border-gray-800 py-2"
    >
      <router-link
        to="/cars"
        active-class="text-blue-600 dark:text-blue-500"
        class="text-gray-600 dark:text-gray-400 text-sm font-medium"
        >Авто</router-link
      >
      <router-link
        to="/bookings"
        active-class="text-blue-600 dark:text-blue-500"
        class="text-gray-600 dark:text-gray-400 text-sm font-medium"
        >Брони</router-link
      >
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { auth } from "../store/auth";
import ThemeToggle from "./ThemeToggle.vue";

const router = useRouter();

const token = computed(() => auth.token);

function logout() {
  auth.logout();
  router.push("/login");
}
</script>
