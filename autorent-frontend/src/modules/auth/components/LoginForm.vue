<script setup lang="ts">
import Input from "@/shared/ui/Input.vue";
import Button from "@/shared/ui/Button.vue";
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

    <Button type="submit" to="/partner">Войти</Button>
  </form>
</template>
