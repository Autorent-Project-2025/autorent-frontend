<script setup lang="ts">
import { Icon } from "@iconify/vue";
defineProps<{
  kpi_cards: {
    icon: string;
    title: string;
    value: string;
    prefix?: string;
  }[];
}>();

</script>

<template>
  <div class="grid gap-5 grid-cols-[repeat(auto-fit,minmax(10rem,1fr))]">
    <div class="card" v-for="card in kpi_cards" :key="card.title" v-bind="card">
      <span class="inline-flex gap-1 items-center"
        ><Icon :icon="card.icon" class="w-7 h-7 p-1 bg- rounded-md" />
        <h4 class="text-text-muted">{{ card.title }}</h4></span
      >
      <p class="text-2xl font-semibold">
        {{ card.value }} {{ card.prefix }}
      </p>
    </div>
  </div>
</template>
