<script setup lang="ts">
import Input from "../ui/Input.vue";
</script>

<template>
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
</template>
