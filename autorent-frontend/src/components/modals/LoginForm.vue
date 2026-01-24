<script setup lang="ts">
import Input from "../ui/Input.vue";
import Button from "../ui/Button.vue";
import { useAuthStore } from "@/stores/authStore";
import { ref } from "vue";
import { useRouter } from "vue-router";
</script>

<template>
  <form class="flex flex-col gap-4">
    <Input
      label="Email"
      icon="tabler:mail-filled"
      placeholder="example@mail.com"
      type="email"
    />
    <Input
      label="Пароль"
      icon="tabler:lock-filled"
      placeholder="••••••••"
      type="password"
    />

    <Button type="submit">Войти</Button>
  </form>
</template>
