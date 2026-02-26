<script setup lang="ts">
defineProps<{
  user: {
    name: string;
    role: string;
    avatar?: string;
  };
}>();
</script>
<template>
  <div class="flex items-center gap-4">
    <img :src="user.avatar" class="aspect-square rounded-full w-12" :alt="user.name" />
    <div class="flex flex-col">
      <h3>{{ user.name }}</h3>
      <p>{{ user.role }}</p>
    </div>
  </div>
</template>
