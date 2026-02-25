<script setup lang="ts">
import { Icon } from "@iconify/vue";
const kpi_cards = [
  {
    icon: "tabler:currency-dollar",
    title: "Доход за месяц",
    value: "10.000",
    prefix: "$",
  },
  {
    icon: "tabler:moneybag",
    title: "Общий доход",
    value: "300.000",
    prefix: "$",
  },
  {
    icon: "tabler:file",
    title: "Активные заявки",
    value: "10",
  },
  {
    icon: "tabler:car",
    title: "Машины в аренде",
    value: "10",
    prefix: "шт.",
  },
];
</script>

<template>
  <div class="grid gap-5 grid-cols-[repeat(auto-fit,minmax(10rem,1fr))]">
    <div class="card" v-for="card in kpi_cards" :key="card.title" v-bind="card">
      <span class="inline-flex gap-1 items-center"
        ><Icon :icon="card.icon" class="w-7 h-7 p-1 bg- rounded-md" />
        <h4>{{ card.title }}</h4></span
      >
      <p class="text-3xl font-semibold text-primary">
        {{ card.value }} {{ card.prefix }}
      </p>
    </div>
  </div>
</template>
