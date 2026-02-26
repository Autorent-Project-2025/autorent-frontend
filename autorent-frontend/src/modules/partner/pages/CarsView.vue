<script setup lang="ts">
import CarPreviewCard from "../components/CarPreviewCard.vue";
import { useCarsStore } from "@/app/stores/carStore";

const carsStore = useCarsStore();
carsStore.loadCars();
</script>

<template>
  <section class="section p-8">
    <h2>Машины</h2>
    <CarPreviewCard v-for="car in carsStore.cars" :key="car.id" :car="car" />
  </section>
</template>
