<template>
  <div
    class="min-h-screen bg-gray-50 dark:bg-gray-950 py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300"
  >
    <div class="max-w-5xl mx-auto">
      <!-- Header -->
      <div class="mb-12 space-y-4 animate-slide-up">
        <h1
          class="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white"
        >
          Мои бронирования
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-400">
          Управляйте вашими арендами и отслеживайте статус
        </p>
      </div>

      <!-- Bookings List -->
      <div v-if="bookings.length > 0" class="space-y-6">
        <div
          v-for="b in bookings"
          :key="b.id"
          class="group bg-white dark:bg-gray-900 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 dark:border-gray-800 card-hover"
        >
          <div class="p-8">
            <div
              class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
            >
              <!-- Left: Car Info -->
              <div class="space-y-4 flex-1">
                <div class="flex items-start gap-4">
                  <!-- Status Indicator -->
                  <div class="flex-shrink-0 mt-1">
                    <div
                      :class="getStatusIndicatorClass(b.status)"
                      class="w-3 h-3 rounded-full animate-pulse"
                    ></div>
                  </div>

                  <div class="space-y-2">
                    <h3
                      class="text-2xl font-bold text-gray-900 dark:text-white"
                    >
                      {{ b.carBrand }} {{ b.carModel }}
                    </h3>

                    <!-- Dates -->
                    <div
                      class="flex flex-col sm:flex-row sm:items-center gap-4 text-sm"
                    >
                      <div
                        class="flex items-center gap-2 text-gray-600 dark:text-gray-400"
                      >
                        <div
                          class="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center"
                        >
                          <svg
                            class="w-4 h-4 text-primary-600 dark:text-primary-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p class="text-xs text-gray-500 dark:text-gray-500">
                            Начало
                          </p>
                          <p
                            class="font-semibold text-gray-900 dark:text-white"
                          >
                            {{ formatDate(b.startDate) }}
                          </p>
                        </div>
                      </div>

                      <svg
                        class="w-5 h-5 text-gray-400 hidden sm:block"
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

                      <div
                        class="flex items-center gap-2 text-gray-600 dark:text-gray-400"
                      >
                        <div
                          class="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center"
                        >
                          <svg
                            class="w-4 h-4 text-primary-600 dark:text-primary-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p class="text-xs text-gray-500 dark:text-gray-500">
                            Окончание
                          </p>
                          <p
                            class="font-semibold text-gray-900 dark:text-white"
                          >
                            {{ formatDate(b.endDate) }}
                          </p>
                        </div>
                      </div>
                    </div>

                    <!-- Price (if available) -->
                    <div v-if="b.price" class="flex items-baseline gap-2">
                      <span
                        class="text-3xl font-bold text-gray-900 dark:text-white"
                        >${{ b.price }}</span
                      >
                      <span class="text-sm text-gray-500 dark:text-gray-400"
                        >общая стоимость</span
                      >
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right: Status Badge -->
              <div class="flex-shrink-0">
                <span
                  :class="getStatusClass(b.status)"
                  class="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold uppercase tracking-wider shadow-lg"
                >
                  <span
                    :class="getStatusDotClass(b.status)"
                    class="w-2 h-2 rounded-full"
                  ></span>
                  {{ getStatusText(b.status) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Glow Effect -->
          <div
            class="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style="box-shadow: 0 0 40px rgba(59, 130, 246, 0.2)"
          ></div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-32">
        <div class="inline-flex flex-col items-center gap-6 max-w-md mx-auto">
          <div
            class="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
          >
            <svg
              class="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <div class="space-y-2">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
              Нет бронирований
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              Вы еще не арендовали ни одного автомобиля
            </p>
          </div>
          <router-link
            to="/cars"
            class="btn-premium inline-flex items-center gap-2"
          >
            <span>Выбрать автомобиль</span>
            <svg
              class="w-5 h-5"
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
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getMyBookings } from "../api/booking";
import type { Booking } from "../types/Booking";

const bookings = ref<Booking[]>([]);

onMounted(async () => {
  try {
    bookings.value = await getMyBookings();
  } catch (error) {
    console.error("Failed to load bookings", error);
  }
});

function formatDate(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function getStatusClass(status: string) {
  const normalized = status.toLowerCase();
  switch (normalized) {
    case "confirmed":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
    case "canceled":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
    case "completed":
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    default:
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
  }
}

function getStatusIndicatorClass(status: string) {
  const normalized = status.toLowerCase();
  switch (normalized) {
    case "confirmed":
      return "bg-green-500";
    case "pending":
      return "bg-yellow-500";
    case "canceled":
      return "bg-red-500";
    case "completed":
      return "bg-gray-500";
    default:
      return "bg-blue-500";
  }
}

function getStatusDotClass(status: string) {
  const normalized = status.toLowerCase();
  switch (normalized) {
    case "confirmed":
      return "bg-green-600 dark:bg-green-400";
    case "pending":
      return "bg-yellow-600 dark:bg-yellow-400";
    case "canceled":
      return "bg-red-600 dark:bg-red-400";
    case "completed":
      return "bg-gray-600 dark:bg-gray-400";
    default:
      return "bg-blue-600 dark:bg-blue-400";
  }
}

function getStatusText(status: string) {
  const normalized = status.toLowerCase();
  switch (normalized) {
    case "confirmed":
      return "Подтверждено";
    case "pending":
      return "Ожидание";
    case "canceled":
      return "Отменено";
    case "completed":
      return "Завершено";
    default:
      return status;
  }
}
</script>
