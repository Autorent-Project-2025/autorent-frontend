<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";
import Input from "@/shared/ui/Input.vue";
import Button from "@/shared/ui/Button.vue";
import { useToast } from "@/shared/composables/useToast";

const auth = useAuthStore();
const router = useRouter();
const email = ref("");
const password = ref("");
const loading = ref(false);
const { success, error } = useToast();

async function onLogin() {
  if (loading.value) return;

  loading.value = true;
  try {
    await auth.login(email.value, password.value);
    success("Добро пожаловать!");
    router.push("/cars");
  } catch (err) {
    error("Ошибка входа! Проверьте email и пароль.");
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <form @submit.prevent="onLogin" class="flex flex-col gap-4">
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

    <Button type="submit" @click="onLogin">Войти</Button>
  </form>
</template>
