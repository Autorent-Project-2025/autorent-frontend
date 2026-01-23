<script setup lang="ts">
import CarsCard from "@/components/ui/CarsCard.vue";
import { useCarsStore } from "@/stores/carStore";

const carsStore = useCarsStore();
carsStore.loadCars();
</script>

<template>
  <section class="section pt-25">
    <h2>Наш автопарк</h2>

    <div>
      <div class="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-6">
        <router-link
          v-for="car in carsStore.cars"
          :key="car.id"
          :to="{ name: 'car', params: { id: car.id } }"
          ><CarsCard :car="car"
        /></router-link>
      </div>
    </div>
  </section>
</template>
