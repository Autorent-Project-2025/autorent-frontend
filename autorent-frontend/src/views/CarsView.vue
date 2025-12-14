<template>
  <div class="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-extrabold text-gray-900 mb-8">Автопарк</h1>

      <div
        v-if="cars.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <div
          v-for="car in cars"
          :key="car.id"
          class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
        >
          <div class="relative h-48 w-full bg-gray-200">
            <img
              :src="car.imageUrl || config.app.defaultCarImage"
              :alt="`${car.brand} ${car.model}`"
              class="h-full w-full object-cover"
            />

            <div
              class="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm"
            >
              <span class="font-bold text-blue-600">${{ car.priceHour }}</span>
              <span class="text-xs text-gray-500 font-medium">/час</span>
            </div>
          </div>

          <div class="p-5 flex flex-col grow">
            <div class="mb-4">
              <h3 class="text-xl font-bold text-gray-800 leading-tight">
                {{ car.brand }} {{ car.model }}
              </h3>
              <p class="text-gray-500 text-sm mt-1">
                {{ car.year }} год выпуска
              </p>
            </div>

            <div class="mt-auto">
              <button
                @click="book(car.id)"
                class="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 active:scale-[0.98]"
              >
                Забронировать
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-20">
        <p class="text-gray-500 text-lg">Загрузка автомобилей...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getCars } from "../api/cars";
import { createBooking } from "../api/booking";
import type { Car } from "../types/Car";
import { config } from "../config";

const cars = ref<Car[]>([]);

onMounted(async () => {
  try {
    cars.value = await getCars();
  } catch (e) {
    console.error("Ошибка при загрузке авто:", e);
  }
});

async function book(id: number) {
  const start = new Date().toISOString();
  const hoursToAdd = config.booking.defaultDurationHours;
  const end = new Date(Date.now() + hoursToAdd * 60 * 60 * 1000).toISOString();

  try {
    await createBooking(id, start, end);
    alert("Автомобиль успешно забронирован!");
  } catch (e) {
    alert("Ошибка бронирования");
  }
}
</script>
