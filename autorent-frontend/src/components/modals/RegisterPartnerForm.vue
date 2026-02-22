<script setup lang="ts">
import Input from "../ui/Input.vue";
import Button from "../ui/Button.vue";


</script>

<template>
  <form class="flex flex-col gap-4">
    <Input
      label="Название компании"
      icon="tabler:building-community"
      placeholder="Название компании"
      type="text"
    />
    <Input
      label="Контактное лицо"
      icon="tabler:user-filled"
      placeholder="Контактное лицо"
      type="text"
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
