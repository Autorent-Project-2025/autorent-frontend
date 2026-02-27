<script setup lang="ts">
import type { CarPreview } from "@/shared/types/Car";
import Button from "@/shared/ui/Button.vue";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";

const router = useRouter();

defineProps<{ car: CarPreview }>();
</script>
<template>
  <div class="card bg-bg flex items-center gap-4">
    <img
      :src="car.imageUrl"
      class="aspect-video w-60 object-cover rounded-xl"
    />
    <div class="flex items-center justify-between w-full">
      <div class="flex flex-col gap-2">
          <h3>{{ car.brand }} {{ car.model }}</h3>
          <span>{{ car.year }} года выпуска</span>
        <span class="flex items-center gap-1"
          >{{ car.rating
          }}<Icon icon="tabler:star-filled" class="text-yellow-400" /> (128
          отзывов)</span
        >
      </div>
      <Button @click="router.push(`/partner-cars/${car.id}`)">Подробнее</Button>
    </div>
  </div>
</template>
