<script setup lang="ts">
import Input from "../ui/Input.vue";
import Button from "../ui/Button.vue";
</script>

<template>
  <form class="flex flex-col gap-4">
    <Input
      label="Имя"
      icon="tabler:user-filled"
      placeholder="Ваше имя"
      type="text"
    />
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

    <Button type="submit">Зарегистрироваться</Button>
  </form>
</template>
