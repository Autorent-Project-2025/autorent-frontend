<script setup lang="ts">
import Input from "../ui/Input.vue";
import Button from "../ui/Button.vue";
import { useAuthStore } from "@/stores/authStore";
import { ref } from "vue";
import { useRouter } from "vue-router";

const reg = useAuthStore();
const router = useRouter();
const name = ref<string>("");
const email = ref<string>("");
const password = ref<string>("");
const errorMessage = ref<string | null>(null);

const handleRegister = () => {
  errorMessage.value = null;

  try {
    // Передаем объект, соответствующий интерфейсу User
    reg.register({
      name: name.value,
      email: email.value,
      password: password.value,
    });

    router.push("/cars");
  } catch (err) {
    if (err instanceof Error) {
      errorMessage.value = err.message;
    }
  }
};
</script>
<template>
  <form class="flex flex-col gap-4" @submit.prevent="handleRegister">
    <Input
      v-model="name"
      label="Имя"
      icon="tabler:user-filled"
      placeholder="Ваше имя"
      type="text"
    />
    <Input
      v-model="email"
      label="Email"
      icon="tabler:mail-filled"
      placeholder="example@mail.com"
      type="email"
    />
    <Input
      v-model="password"
      label="Пароль"
      icon="tabler:lock-filled"
      placeholder="••••••••"
      type="password"
    />

    <Button type="submit">Зарегистрироваться</Button>

    <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
  </form>
</template>
