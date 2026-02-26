<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useCarsStore } from "@/app/stores/carStore";
import Features from "@/shared/ui/Features.vue";
import Button from "@/shared/ui/Button.vue";

const carsStore = useCarsStore();
carsStore.loadCars();
</script>
<template>
  <div class="card">
    <h3>Мои машины</h3>

    <table class="w-full">
      <thead class="text-gray-400">
        <tr class="text-left">
          <th class="p-4">Машина</th>
          <th class="py-4">Статус</th>
          <th class="py-4">Рейтинг</th>
          <th class="py-4">Доход</th>
          <th class="py-4">Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="car in carsStore.cars"
          :key="car.id"
          class="border-b border-border hover:bg-bg-light transition"
        >
          <td class="p-4">{{ car.brand }} {{ car.model }}</td>

          <td><Features type="green">В аренде</Features></td>

          <td class="py-4">
            <div class="flex items-center gap-1">
              {{ car.rating }}
              <Icon icon="tabler:star-filled" class="text-yellow-400 w-4 h-4" />
            </div>
          </td>

          <td class="py-4">{{ car.priceHour * 10 }}$</td>

          <td class="py-4">
            <Button variant="underline">Подробнее</Button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
