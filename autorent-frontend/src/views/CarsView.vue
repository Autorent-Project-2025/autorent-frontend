<template>
  <div
    class="min-h-screen bg-gray-50 dark:bg-gray-950 py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300"
  >
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-12 space-y-4 animate-slide-up">
        <h1
          class="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white"
        >
          Наш автопарк
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
          Выберите автомобиль вашей мечты из нашей коллекции премиальных и
          бизнес-автомобилей
        </p>
      </div>

      <!-- Cars Grid -->
      <div
        v-if="cars.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <div
          v-for="car in cars"
          :key="car.id"
          class="group relative bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 card-hover border border-gray-200 dark:border-gray-800"
        >
          <!-- Image Container -->
          <div
            class="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900"
          >
            <img
              :src="car.imageUrl || config.app.defaultCarImage"
              :alt="`${car.brand} ${car.model}`"
              class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />

            <!-- Gradient Overlay -->
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            ></div>

            <!-- Price Badge -->
            <div
              class="absolute top-4 right-4 glass px-4 py-2 rounded-full backdrop-blur-md"
            >
              <div class="flex items-baseline gap-1">
                <span class="text-2xl font-bold text-white"
                  >${{ car.priceHour }}</span
                >
                <span class="text-sm text-gray-300 font-medium">/час</span>
              </div>
            </div>

            <!-- Year Badge -->
            <div
              class="absolute top-4 left-4 glass px-3 py-1.5 rounded-full backdrop-blur-md"
            >
              <span class="text-sm font-semibold text-white">{{
                car.year
              }}</span>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6 space-y-6">
            <!-- Car Info -->
            <div class="space-y-2">
              <h3
                class="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
              >
                {{ car.brand }} {{ car.model }}
              </h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm font-medium">
                {{ car.year }} год выпуска
              </p>
            </div>

            <!-- Features (if available) -->
            <div class="flex flex-wrap gap-2">
              <span
                class="px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-xs font-semibold rounded-full"
              >
                Премиум
              </span>
              <span
                class="px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-xs font-semibold rounded-full"
              >
                Доступен
              </span>
            </div>

            <!-- Book Button -->
            <button
              @click="book(car.id)"
              :disabled="bookingInProgress"
              class="w-full relative overflow-hidden bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/50 active:scale-95 disabled:cursor-not-allowed disabled:hover:shadow-none group/btn"
            >
              <span
                class="relative z-10 flex items-center justify-center gap-2"
              >
                <span v-if="!bookingInProgress">Забронировать</span>
                <span v-else>Бронирование...</span>
                <svg
                  v-if="!bookingInProgress"
                  class="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>

              <!-- Shimmer effect -->
              <div
                class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"
              ></div>
            </button>
          </div>

          <!-- Glow Effect on Hover -->
          <div
            class="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style="box-shadow: 0 0 40px rgba(59, 130, 246, 0.3)"
          ></div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-else class="text-center py-32">
        <div class="inline-flex flex-col items-center gap-6">
          <div class="relative">
            <div
              class="w-16 h-16 rounded-full border-4 border-primary-200 dark:border-primary-900 border-t-primary-600 dark:border-t-primary-400 animate-spin"
            ></div>
            <div
              class="absolute inset-0 w-16 h-16 rounded-full glow-primary opacity-50"
            ></div>
          </div>
          <p class="text-gray-600 dark:text-gray-400 text-lg font-medium">
            Загрузка автомобилей...
          </p>
        </div>
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
