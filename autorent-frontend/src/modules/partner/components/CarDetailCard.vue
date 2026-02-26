<script setup lang="ts">
import Features from "@/shared/ui/Features.vue";
import { Icon } from "@iconify/vue";
import type { CarDetails } from "@/shared/types/Car";

defineProps<{ car: CarDetails }>();
</script>

<template>
  <div class="card flex justify-between">
    <div class="flex gap-6">
      <img
        :src="car.images?.[0]"
        class="aspect-video w-60 object-cover rounded-xl"
      />

      <div class="space-y-2">
        <h3>{{ car.brand }} {{ car.model }}</h3>
        <p>{{ car.year }} года выпуска</p>

        <div class="flex items-center gap-2">
          <span class="font-semibold text-2xl">{{ car.rating }}</span>
          <span class="flex gap-1"
            ><Icon
              v-for="star in 5"
              icon="tabler:star-filled"
              class="text-yellow-400"
          /></span>
          <span>(128 отзывов)</span>
        </div>
      </div>
    </div>

    <div class="flex flex-col items-end justify-between">
      <Features type="green">В аренде</Features>

      <div class="text-right">
        <h4 class="text-text-muted">Доход</h4>
        <p class="text-3xl font-semibold">10.000 $</p>
      </div>
    </div>
  </div>
</template>
