<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        @click.self="closeModal"
      >
        <div
          class="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden transform transition-all"
          @click.stop
        >
          <!-- Header -->
          <div
            class="relative bg-gradient-to-br from-primary-600 to-primary-700 px-6 py-8 text-white"
          >
            <button
              @click="closeModal"
              class="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Закрыть"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div class="space-y-2">
              <h2 class="text-2xl font-bold">Выберите даты</h2>
              <p class="text-primary-100 text-sm">
                {{ car.brand }} {{ car.model }}
              </p>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6 space-y-6">
            <!-- Selected Landlord Info -->
            <div
              class="p-4 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 rounded-2xl border-2 border-primary-200 dark:border-primary-800"
            >
              <div class="flex items-center gap-3">
                <div
                  class="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-lg font-bold shadow-md"
                >
                  {{
                    landlord.companyName
                      ? landlord.companyName.charAt(0).toUpperCase()
                      : landlord.username!.charAt(0).toUpperCase()
                  }}
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2">
                    <p
                      class="font-bold text-gray-900 dark:text-white truncate"
                    >
                      {{ landlord.companyName || landlord.username }}
                    </p>
                    <svg
                      v-if="landlord.isVerified"
                      class="w-4 h-4 text-blue-500 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <div class="flex items-center gap-1">
                      <svg
                        class="w-4 h-4 text-yellow-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        />
                      </svg>
                      <span class="font-semibold text-gray-900 dark:text-white">
                        {{ landlord.rating.toFixed(1) }}
                      </span>
                    </div>
                    <span class="text-gray-600 dark:text-gray-400">•</span>
                    <span class="font-bold text-primary-600 dark:text-primary-400">
                      ${{ landlord.pricePerHour }}/час
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Date Start -->
            <div class="space-y-2">
              <label
                for="start-date"
                class="block text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                Дата начала
              </label>
              <div class="relative">
                <input
                  id="start-date"
                  v-model="startDate"
                  type="datetime-local"
                  :min="minDate"
                  class="w-full px-4 py-3 pr-12 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  required
                />
                <div
                  class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                >
                  <svg
                    class="w-5 h-5 text-gray-400"
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
              </div>
            </div>

            <!-- Date End -->
            <div class="space-y-2">
              <label
                for="end-date"
                class="block text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                Дата окончания
              </label>
              <div class="relative">
                <input
                  id="end-date"
                  v-model="endDate"
                  type="datetime-local"
                  :min="startDate || minDate"
                  class="w-full px-4 py-3 pr-12 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  required
                />
                <div
                  class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                >
                  <svg
                    class="w-5 h-5 text-gray-400"
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
              </div>
            </div>

            <!-- Duration Info -->
            <div
              v-if="duration"
              class="flex items-center gap-3 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl"
            >
              <div
                class="flex-shrink-0 w-10 h-10 bg-primary-100 dark:bg-primary-900/40 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-5 h-5 text-primary-600 dark:text-primary-400"
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
              <div class="flex-1">
                <p class="text-sm font-semibold text-gray-900 dark:text-white">
                  Продолжительность аренды
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ duration.days > 0 ? `${duration.days} дн. ` : ""
                  }}{{ duration.hours }} ч.
                  {{ duration.minutes > 0 ? `${duration.minutes} мин.` : "" }}
                </p>
              </div>
            </div>

            <!-- Price Estimation -->
            <div
              v-if="estimatedPrice"
              class="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-xl"
            >
              <span
                class="text-sm font-semibold text-gray-700 dark:text-gray-300"
                >Примерная стоимость:</span
              >
              <span
                class="text-2xl font-bold text-green-600 dark:text-green-400"
                >${{ estimatedPrice }}</span
              >
            </div>

            <!-- Error Message -->
            <div
              v-if="errorMessage"
              class="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl"
            >
              <svg
                class="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p class="text-sm text-red-600 dark:text-red-400">
                {{ errorMessage }}
              </p>
            </div>
          </div>

          <!-- Footer -->
          <div
            class="flex gap-3 px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700"
          >
            <button
              @click="closeModal"
              class="flex-1 px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all active:scale-95"
            >
              Отмена
            </button>
            <button
              @click="confirmBooking"
              :disabled="!isValid || isLoading"
              class="flex-1 px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-semibold rounded-xl transition-all hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:hover:shadow-none flex items-center justify-center gap-2"
            >
              <span v-if="!isLoading">Забронировать</span>
              <span v-else>Загрузка...</span>
              <svg
                v-if="!isLoading"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import type { Car } from "../types/Car";
import type { Landlord } from "../types/Landlord";

interface Props {
  isOpen: boolean;
  car: Car;
  landlord: Landlord;
}

interface Emits {
  (e: "close"): void;
  (e: "confirm", startDate: string, endDate: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const isLoading = ref(false);
const startDate = ref("");
const endDate = ref("");
const errorMessage = ref("");

// Минимальная дата - текущий момент
const minDate = computed(() => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 16);
});

// Инициализация дат по умолчанию
watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      const now = new Date();
      now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
      startDate.value = now.toISOString().slice(0, 16);

      const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      endDate.value = tomorrow.toISOString().slice(0, 16);

      errorMessage.value = "";
    }
  }
);

// Вычисление продолжительности
const duration = computed(() => {
  if (!startDate.value || !endDate.value) return null;

  const start = new Date(startDate.value);
  const end = new Date(endDate.value);
  const diffMs = end.getTime() - start.getTime();

  if (diffMs <= 0) return null;

  const totalMinutes = Math.floor(diffMs / (1000 * 60));
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  return { days, hours, minutes, totalMinutes };
});

// Примерная цена (используем цену выбранного landlord)
const estimatedPrice = computed(() => {
  if (!duration.value) return null;

  const totalHours = duration.value.totalMinutes / 60;
  return Math.round(totalHours * props.landlord.pricePerHour);
});

// Валидация
const isValid = computed(() => {
  if (!startDate.value || !endDate.value) {
    errorMessage.value = "Заполните обе даты";
    return false;
  }

  const start = new Date(startDate.value);
  const end = new Date(endDate.value);
  const now = new Date();

  if (start < now) {
    errorMessage.value = "Дата начала не может быть в прошлом";
    return false;
  }

  if (end <= start) {
    errorMessage.value = "Дата окончания должна быть позже даты начала";
    return false;
  }

  const diffMs = end.getTime() - start.getTime();
  const minDuration = 60 * 60 * 1000; // 1 час

  if (diffMs < minDuration) {
    errorMessage.value = "Минимальная продолжительность аренды - 1 час";
    return false;
  }

  errorMessage.value = "";
  return true;
});

function closeModal() {
  emit("close");
}

function confirmBooking() {
  if (!isValid.value) return;

  const start = new Date(startDate.value).toISOString();
  const end = new Date(endDate.value).toISOString();

  emit("confirm", start, end);
}
</script>

<style scoped>
/* Modal transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active > div,
.modal-leave-active > div {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from > div,
.modal-leave-to > div {
  transform: scale(0.9);
  opacity: 0;
}

/* Custom datetime input styling */
input[type="datetime-local"]::-webkit-calendar-picker-indicator {
  opacity: 0;
  position: absolute;
  right: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
</style>
