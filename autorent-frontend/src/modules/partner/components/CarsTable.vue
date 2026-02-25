<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useCarsStore } from "@/modules/client/stores/carStore";

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

          <td class="py-4 text-green-400">В аренде</td>

          <td class="py-4">
            <div class="flex items-center gap-1">
              {{ car.rating }}
              <Icon icon="tabler:star-filled" class="text-yellow-400 w-4 h-4" />
            </div>
          </td>

          <td class="py-4">{{ car.priceHour * 10 }}$</td>

          <td class="py-4">
            <button class="text-primary hover:underline cursor-pointer">Подробнее</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
