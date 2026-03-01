<script setup lang="ts">
import Card from "@/shared/ui/Card.vue";

const features = [
  {
    icon: "tabler:device-mobile",
    title: "Мгновенный старт",
    description:
      "Забронируйте автомобиль за пару кликов и начните поездку без задержек.",
  },
  {
    icon: "tabler:map-pin",
    title: "Авто рядом с вами",
    description: "Мы привезём машину туда, где вам удобно, когда вам удобно.",
  },
  {
    icon: "tabler:shield-check",
    title: "Езжайте спокойно",
    description:
      "Все автомобили застрахованы, арендуйте с полной уверенностью.",
  },
  {
    icon: "tabler:car",
    title: "Новые и чистые автомобили",
    description:
      "Современный автопарк, регулярно обслуживаемый и всегда в отличном состоянии.",
  },
  {
    icon: "tabler:credit-card",
    title: "Оплата по факту использования",
    description:
      "Гибкая тарификация — платите только за время и расстояние поездки.",
  },
  {
    icon: "tabler:clock",
    title: "Поддержка 24/7",
    description: "Мы всегда на связи, чтобы помочь вам в любом случае.",
  },
];
</script>

<template>
  <section class="section">
    <h2 class="text-center">Почему выбирают нас</h2>

    <div
      class="grid grid-cols-[repeat(auto-fit,minmax(min(100%,25rem),1fr))] gap-4"
    >
      <Card
        v-for="feature in features"
        v-bind="feature"
        variant="card"
      />
    </div>
  </section>
</template>
