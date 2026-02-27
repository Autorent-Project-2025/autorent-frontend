<script setup lang="ts">
import Input from "@/shared/ui/Input.vue";
import Button from "@/shared/ui/Button.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { register } from "@/app/api/auth";
import { useToast } from "@/shared/composables/useToast";

const router = useRouter();
const name = ref("");
const email = ref("");
const password = ref("");
const loading = ref(false);
const { success, error } = useToast();

async function onRegister() {
  if (loading.value) return;

  loading.value = true;
  try {
    await register(name.value, email.value, password.value);
    success("Регистрация успешна! Теперь войдите в систему.");
    router.push("/auth/login");
  } catch (e: any) {
    const errorMsg =
      e.response?.data?.error || "Ошибка при регистрации. Попробуйте снова.";
    error(errorMsg);
  } finally {
    loading.value = false;
  }
}

</script>

<template>
  <form  @submit.prevent="onRegister" class="flex flex-col gap-4">
    <Input
      label="Имя"
      icon="tabler:user-filled"
      placeholder="Ваше имя"
      type="text"
      v-model="name"
    />
    <Input
      label="Email"
      icon="tabler:mail-filled"
      placeholder="example@mail.com"
      type="email"
      v-model="email"
    />
    <Input
      label="Пароль"
      icon="tabler:lock-filled"
      placeholder="••••••••"
      type="password"
      v-model="password"
    />

    <Button @click="onRegister" type="submit">Зарегистрироваться</Button>
  </form>
</template>
