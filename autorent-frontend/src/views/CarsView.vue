<template>
  <div
    class="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300"
  >
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">
        Автопарк
      </h1>

      <div
        v-if="cars.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <div
          v-for="car in cars"
          :key="car.id"
          class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col transform hover:-translate-y-1"
        >
          <div class="relative h-48 w-full bg-gray-200 dark:bg-gray-700">
            <img
              :src="car.imageUrl || config.app.defaultCarImage"
              :alt="`${car.brand} ${car.model}`"
              class="h-full w-full object-cover"
            />

            <div
              class="absolute top-2 right-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm"
            >
              <span class="font-bold text-blue-600 dark:text-blue-400"
                >${{ car.priceHour }}</span
              >
              <span class="text-xs text-gray-500 dark:text-gray-400 font-medium"
                >/час</span
              >
            </div>
          </div>

          <div class="p-5 flex flex-col grow">
            <div class="mb-4">
              <h3
                class="text-xl font-bold text-gray-800 dark:text-white leading-tight"
              >
                {{ car.brand }} {{ car.model }}
              </h3>
              <p class="text-gray-500 dark:text-gray-400 text-sm mt-1">
                {{ car.year }} год выпуска
              </p>
            </div>

            <div class="mt-auto">
              <button
                @click="book(car.id)"
                :disabled="bookingInProgress"
                class="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ bookingInProgress ? "Бронирование..." : "Забронировать" }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-20">
        <div
          class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"
        ></div>
        <p class="text-gray-500 dark:text-gray-400 text-lg mt-4">
          Загрузка автомобилей...
        </p>
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
import { useToast } from "../composables/useToast";

const cars = ref<Car[]>([]);
const bookingInProgress = ref(false);
const { success, error } = useToast();

onMounted(async () => {
  try {
    cars.value = await getCars();
  } catch (e) {
    console.error("Ошибка при загрузке авто:", e);
    error("Не удалось загрузить список автомобилей");
  }
});

async function book(id: number) {
  if (bookingInProgress.value) return;

  bookingInProgress.value = true;
  const start = new Date().toISOString();
  const hoursToAdd = config.booking.defaultDurationHours;
  const end = new Date(Date.now() + hoursToAdd * 60 * 60 * 1000).toISOString();

  try {
    await createBooking(id, start, end);
    success("Автомобиль успешно забронирован!");
  } catch (e) {
    error("Ошибка бронирования. Попробуйте снова.");
  } finally {
    bookingInProgress.value = false;
  }
}
</script>
