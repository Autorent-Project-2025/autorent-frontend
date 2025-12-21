<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300"
  >
    <div
      class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
    >
      <h2
        class="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center"
      >
        Регистрация
      </h2>

      <form @submit.prevent="onRegister" class="space-y-4">
        <div>
          <label
            class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            for="name"
          >
            Имя
          </label>
          <input
            id="name"
            v-model="name"
            type="text"
            placeholder="Ваше имя"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            required
          />
        </div>

        <div>
          <label
            class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            for="email"
          >
            Email
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="example@mail.com"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            required
          />
        </div>

        <div>
          <label
            class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            for="password"
          >
            Пароль
          </label>
          <input
            id="password"
            type="password"
            v-model="password"
            placeholder="********"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:bg-blue-700 transition duration-300 transform active:scale-95"
        >
          Зарегистрироваться
        </button>
      </form>

      <div class="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>
          Уже есть аккаунт?
          <router-link
            to="/login"
            class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold hover:underline"
          >
            Войти
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { register } from "../api/auth";

const router = useRouter();
const name = ref("");
const email = ref("");
const password = ref("");

async function onRegister() {
  try {
    await register(name.value, email.value, password.value);

    router.push("/login");
  } catch (e: any) {
    alert(e.response?.data?.error ?? "Error while registering");
  }
}
</script>
