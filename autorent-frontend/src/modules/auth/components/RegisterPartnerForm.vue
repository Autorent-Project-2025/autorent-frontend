<script setup lang="ts">
import { RouterLink } from "vue-router";
import Input from "@/shared/ui/Input.vue";
import Button from "@/shared/ui/Button.vue";


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
    <Button to="/partner" type="submit">Зарегистрироваться</Button>
    
  </form>
</template>
