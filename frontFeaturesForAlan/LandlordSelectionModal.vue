<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        @click.self="closeModal"
      >
        <div
          class="relative w-full max-w-5xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden transform transition-all max-h-[90vh] flex flex-col"
          @click.stop
        >
          <!-- Header -->
          <div
            class="relative bg-gradient-to-br from-primary-600 to-primary-700 px-8 py-6 text-white flex-shrink-0"
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
              <h2 class="text-3xl font-bold">Выберите арендодателя</h2>
              <p class="text-primary-100 text-sm">
                {{ car.brand }} {{ car.model }} - {{ totalLandlords }}
                предложений
              </p>
            </div>
          </div>

          <!-- Sort Controls -->
          <div
            class="px-8 py-4 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700 flex-shrink-0"
          >
            <div class="flex items-center gap-4">
              <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Сортировка:
              </span>
              <div class="flex gap-2">
                <button
                  @click="sortBy = 'rating'"
                  :class="[
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                    sortBy === 'rating'
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
                  ]"
                >
                  По рейтингу
                </button>
                <button
                  @click="sortBy = 'price'"
                  :class="[
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                    sortBy === 'price'
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
                  ]"
                >
                  По цене
                </button>
              </div>
            </div>
          </div>

          <!-- Landlords List with Pagination -->
          <div class="flex-1 overflow-y-auto px-8 py-6">
            <div class="space-y-3">
              <div
                v-for="landlord in currentPageLandlords"
                :key="landlord.id"
                class="group relative p-5 bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-400 transition-all hover:shadow-lg cursor-pointer"
              >
                <div class="flex items-center gap-5">
                  <!-- Avatar -->
                  <div
                    class="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg"
                  >
                    {{
                      landlord.companyName
                        ? landlord.companyName.charAt(0).toUpperCase()
                        : landlord.username!.charAt(0).toUpperCase()
                    }}
                  </div>

                  <!-- Info -->
                  <div class="flex-1 min-w-0">
                    <!-- Name -->
                    <div class="flex items-center gap-2 mb-1">
                      <h3
                        class="text-lg font-bold text-gray-900 dark:text-white truncate"
                      >
                        {{ landlord.companyName || landlord.username }}
                      </h3>
                      <svg
                        v-if="landlord.isVerified"
                        class="w-5 h-5 text-blue-500 flex-shrink-0"
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

                    <!-- Rating -->
                    <div class="flex items-center gap-3 mb-2">
                      <div class="flex items-center gap-1">
                        <svg
                          v-for="i in 5"
                          :key="i"
                          :class="[
                            'w-4 h-4',
                            i <= Math.round(landlord.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300 dark:text-gray-600',
                          ]"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          />
                        </svg>
                        <span
                          class="text-sm font-bold text-gray-900 dark:text-white ml-1"
                        >
                          {{ landlord.rating.toFixed(1) }}
                        </span>
                      </div>
                      <span class="text-xs text-gray-500 dark:text-gray-400">
                        ({{ landlord.reviewsCount }} отзывов)
                      </span>
                    </div>

                    <!-- Description -->
                    <p
                      v-if="landlord.description"
                      class="text-sm text-gray-600 dark:text-gray-400"
                    >
                      {{ landlord.description }}
                    </p>
                  </div>

                  <!-- Price & Action -->
                  <div
                    class="flex-shrink-0 flex flex-col items-end gap-3 ml-4"
                  >
                    <div class="text-right">
                      <div
                        class="text-2xl font-extrabold text-primary-600 dark:text-primary-400"
                      >
                        ${{ landlord.pricePerHour }}
                      </div>
                      <div class="text-xs text-gray-500 dark:text-gray-400">
                        за час
                      </div>
                      <div
                        class="text-sm text-gray-600 dark:text-gray-300 mt-1"
                      >
                        ${{ landlord.pricePerDay }}/день
                      </div>
                    </div>

                    <button
                      @click="selectLandlord(landlord)"
                      class="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all hover:shadow-lg active:scale-95"
                    >
                      Выбрать
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div
            v-if="totalPages > 1"
            class="flex-shrink-0 px-8 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700"
          >
            <div class="flex items-center justify-between">
              <!-- Prev Button -->
              <button
                @click="prevPage"
                :disabled="currentPage === 1"
                :class="[
                  'flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all',
                  currentPage === 1
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-md',
                ]"
              >
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span>Предыдущие</span>
              </button>

              <!-- Page Info -->
              <div class="text-center">
                <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Страница {{ currentPage }} из {{ totalPages }}
                </span>
                <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Показаны {{ (currentPage - 1) * itemsPerPage + 1 }} -
                  {{ Math.min(currentPage * itemsPerPage, totalLandlords) }} из
                  {{ totalLandlords }}
                </div>
              </div>

              <!-- Next Button -->
              <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                :class="[
                  'flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all',
                  currentPage === totalPages
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-md',
                ]"
              >
                <span>Следующие</span>
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
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
import { mockLandlords } from "../types/Landlord";

interface Props {
  isOpen: boolean;
  car: Car;
}

interface Emits {
  (e: "close"): void;
  (e: "select", landlord: Landlord): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// State
const currentPage = ref(1);
const itemsPerPage = 10;
const sortBy = ref<"rating" | "price">("rating"); // По умолчанию по рейтингу

// Mock данные (потом заменим на API)
// ВАЖНО: Сразу сортируем по умолчанию (рейтинг↓ + цена↑)
const allLandlords = ref<Landlord[]>(
  [...mockLandlords].sort((a, b) => {
    // Сначала по рейтингу (desc)
    if (b.rating !== a.rating) {
      return b.rating - a.rating;
    }
    // Потом по цене (asc)
    return a.pricePerHour - b.pricePerHour;
  })
);

// Sorted landlords
const sortedLandlords = computed(() => {
  const sorted = [...allLandlords.value];

  if (sortBy.value === "rating") {
    // Сортировка: сначала по рейтингу (desc), потом по цене (asc)
    sorted.sort((a, b) => {
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }
      return a.pricePerHour - b.pricePerHour;
    });
  } else {
    // Сортировка: сначала по цене (asc), потом по рейтингу (desc)
    sorted.sort((a, b) => {
      if (a.pricePerHour !== b.pricePerHour) {
        return a.pricePerHour - b.pricePerHour;
      }
      return b.rating - a.rating;
    });
  }

  return sorted;
});

// Pagination
const totalLandlords = computed(() => sortedLandlords.value.length);
const totalPages = computed(() =>
  Math.ceil(totalLandlords.value / itemsPerPage)
);

const currentPageLandlords = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return sortedLandlords.value.slice(start, end);
});

// Reset page when sort changes
watch(sortBy, () => {
  currentPage.value = 1;
});

// Reset when modal opens
watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      currentPage.value = 1;
      sortBy.value = "rating";
    }
  }
);

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function selectLandlord(landlord: Landlord) {
  emit("select", landlord);
}

function closeModal() {
  emit("close");
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
  transform: scale(0.95);
  opacity: 0;
}
</style>
