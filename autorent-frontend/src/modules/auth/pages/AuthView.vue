<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { computed } from "vue";
import { RouterView, useRoute } from "vue-router";
import Button from "@/shared/ui/Button.vue";


const route = useRoute();

const headerTitle = computed(() => {
  switch (route.name) {
    case "login":
      return "С возвращением";
    case "register":
      return "Создание аккаунта";
    case "register-client":
      return "Регистрация клиента";
    case "register-partner":
      return "Регистрация партнёра";
  }
});

const headerSubtitle = computed(() => {
  switch (route.name) {
    case "login":
      return "Войдите чтобы продолжить";
    case "register":
      return "Выберите тип аккаунта";
    case "register-client":
      return "Начните свою поездку уже сегодня";
    case "register-partner":
      return "Добавляйте автомобили и управляйте доходом";
  }
});
</script>

<template>
  <div
    class="flex justify-center items-center h-screen w-full"
  >
    <div
      class="absolute inset-0 bg-overlay/40  backdrop-blur-md lg:backdrop-blur-none"
    ></div>
    <span
      class="absolute top-4 left-[5%] logo primary-text cursor-pointer"
      @click="$router.push('/')"
      >AutoRent</span
    >
    <div class="w-[min(80%,30rem)] z-10">
      <div
        class="p-8 bg-linear-to-r from-blue-500 to-blue-600 rounded-t-3xl shadow-(--shadow-m) text-center relative"
      >
        <h3 class="text-white">
          {{ headerTitle }}
        </h3>
        <p class="text-white">
          {{ headerSubtitle }}
        </p>
      </div>
      <div class="card rounded-t-none flex flex-col gap-4">
        <RouterView />

        <span class="text-center">{{
          route.name === "login" ? "Нет аккаунта?" : "Уже есть аккаунт?"
        }}</span>
        <Button
          variant="text"
          @click="
            {
              $router.push(
                '/auth/' + (route.name === 'login' ? 'register' : 'login'),
              );
            }
          "
          ><span class="flex gap-1 items-center group">
            {{ route.name === "login" ? "Зарегистрироваться" : "Войти"
            }}<Icon
              class="group-hover:translate-x-1 transition duration-200"
              icon="tabler:arrow-right"
            /> </span
        ></Button>
      </div>
    </div>
  </div>
</template>
