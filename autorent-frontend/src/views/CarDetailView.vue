<template>
  <div
    class="min-h-screen bg-gray-50 dark:bg-gray-950 py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300"
  >
    <div class="max-w-7xl mx-auto">
      <!-- Back Button -->
      <button
        @click="$router.back()"
        class="mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
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
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span class="font-medium">Назад к автомобилям</span>
      </button>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-32">
        <div class="inline-flex flex-col items-center gap-6">
          <div class="relative">
            <div
              class="w-16 h-16 rounded-full border-4 border-primary-200 dark:border-primary-900 border-t-primary-600 dark:border-t-primary-400 animate-spin"
            ></div>
          </div>
          <p class="text-gray-600 dark:text-gray-400 text-lg font-medium">
            Загрузка информации...
          </p>
        </div>
      </div>

      <!-- Car Details -->
      <div v-else-if="car" class="space-y-8">
        <!-- Main Info Grid -->
        <div class="grid lg:grid-cols-2 gap-8">
          <!-- Left Column -->
          <div class="flex flex-col gap-6">
            <!-- Main Image -->
            <div class="space-y-4 flex-shrink-0">
              <div
                class="relative h-96 rounded-3xl overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 shadow-2xl"
              >
                <img
                  :src="
                    car.imageUrl || 'https://placehold.co/800x600?text=No+Image'
                  "
                  :alt="`${car.brand} ${car.model}`"
                  class="car-detail-main-image w-full h-full object-cover"
                />
              </div>
            </div>

            <!-- Description -->
            <div
              v-if="car.description"
              class="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 flex flex-col flex-1"
            >
              <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Описание
              </h2>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                {{ car.description }}
              </p>
            </div>
          </div>

          <!-- Right Column -->
          <div class="flex flex-col gap-6">
            <!-- Title, Rating & Price -->
            <div class="space-y-4">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <h1
                    class="text-4xl font-extrabold text-gray-900 dark:text-white"
                  >
                    {{ car.brand }} {{ car.model }}
                  </h1>
                  <p class="text-lg text-gray-600 dark:text-gray-400 mt-1">
                    {{ car.year }} год выпуска
                  </p>
                </div>

                <!-- Rating -->
                <div v-if="car.rating" class="flex flex-col items-end gap-1">
                  <div class="flex items-center gap-2">
                    <div class="flex items-center gap-1">
                      <svg
                        v-for="i in 5"
                        :key="i"
                        :class="[
                          'w-5 h-5',
                          i <= Math.round(car.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300 dark:text-gray-600',
                        ]"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        />
                      </svg>
                    </div>
                    <span
                      class="text-2xl font-bold text-gray-900 dark:text-white"
                    >
                      {{ car.rating.toFixed(1) }}
                    </span>
                  </div>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {{ car.comments?.length || 0 }} отзывов
                  </p>
                </div>
              </div>

              <!-- Price -->
              <div
                class="flex items-baseline gap-3 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl"
              >
                <span
                  class="text-4xl font-extrabold text-primary-600 dark:text-primary-400"
                >
                  ${{ car.priceHour }}
                </span>
                <span class="text-lg text-gray-700 dark:text-gray-300"
                  >/час</span
                >
                <span class="text-gray-500 dark:text-gray-400 ml-4"
                  >или ${{ car.priceDay }}/день</span
                >
              </div>
            </div>

            <!-- Book Button -->
            <button
              @click="openBookingModal"
              class="w-full btn-premium py-5 text-lg"
            >
              <span>Забронировать автомобиль</span>
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
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Reviews Section -->
        <div
          class="mt-12 p-8 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800"
        >
          <div class="flex items-center justify-between mb-8">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
              Отзывы
              <span
                v-if="car.comments?.length || 0 > 0"
                class="text-gray-500 dark:text-gray-400"
                >({{ car.comments?.length || 0 }})</span
              >
            </h2>

            <!-- Add Review Button (только для авторизованных) -->
            <button
              v-if="isAuthenticated"
              @click="openReviewModal"
              class="btn-premium inline-flex items-center gap-2 py-3 px-6"
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>Оставить отзыв</span>
            </button>
          </div>

          <!-- Login Prompt -->
          <div
            v-if="!isAuthenticated"
            class="mb-8 p-6 bg-primary-50 dark:bg-primary-900/20 rounded-2xl text-center"
          >
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Войдите, чтобы оставить отзыв
            </p>
            <router-link
              to="/login"
              class="btn-premium inline-flex items-center gap-2 py-3 px-6"
            >
              Войти
            </router-link>
          </div>

          <!-- Reviews List -->
          <div v-if="car.comments?.length || 0 > 0" class="space-y-6">
            <div
              v-for="review in car.comments"
              :key="review.id"
              class="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl space-y-3"
            >
              <!-- User Info & Rating -->
              <div class="flex items-start justify-between">
                <div class="flex items-center gap-3">
                  <div
                    class="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center"
                  >
                    <span
                      class="text-lg font-bold text-primary-600 dark:text-primary-400"
                    >
                      {{ review.userName.charAt(0).toUpperCase() }}
                    </span>
                  </div>
                  <div>
                    <p class="font-semibold text-gray-900 dark:text-white">
                      {{ review.userName }}
                    </p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      {{ formatDate(review.created_On) }}
                    </p>
                  </div>
                </div>

                <!-- Rating -->
                <div class="flex items-center gap-1">
                  <svg
                    v-for="i in 5"
                    :key="i"
                    :class="[
                      'w-5 h-5',
                      i <= review.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300 dark:text-gray-600',
                    ]"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                </div>
              </div>

              <!-- Comment -->
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                {{ review.content }}
              </p>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-16">
            <div
              class="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
            >
              <svg
                class="w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Пока нет отзывов
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              Будьте первым, кто оставит отзыв об этом автомобиле!
            </p>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else class="text-center py-32">
        <div class="inline-flex flex-col items-center gap-6 max-w-md mx-auto">
          <div
            class="w-24 h-24 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center"
          >
            <svg
              class="w-12 h-12 text-red-600 dark:text-red-400"
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
          </div>
          <div class="space-y-2">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
              Автомобиль не найден
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              Запрашиваемый автомобиль не существует или был удален
            </p>
          </div>
          <router-link
            to="/cars"
            class="btn-premium inline-flex items-center gap-2"
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Вернуться к списку</span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Booking Modal -->
    <BookingModal
      v-if="car && isBookingModalOpen"
      :is-open="isBookingModalOpen"
      :car="car"
      @close="closeBookingModal"
      @confirm="handleBookingConfirm"
    />

    <!-- Review Modal -->
    <ReviewModal
      v-if="car && isReviewModalOpen"
      :is-open="isReviewModalOpen"
      :car="car"
      @close="closeReviewModal"
      @submit="handleReviewSubmit"
      ref="reviewModalRef"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { CarDetails } from "../types/Car";
import { getCarDetails, createCarComment } from "../api/cars";
import { createBooking } from "../api/booking";
import { useToast } from "../composables/useToast";
import { useAuth } from "../composables/useAuth";
import BookingModal from "../components/BookingModal.vue";
import ReviewModal from "../components/ReviewModal.vue";

const route = useRoute();
const router = useRouter();
const { success, error } = useToast();
const { isAuthenticated } = useAuth();

const loading = ref(true);
const car = ref<CarDetails | null>(null);
const isBookingModalOpen = ref(false);
const isReviewModalOpen = ref(false);
const reviewModalRef = ref<InstanceType<typeof ReviewModal> | null>(null);

onMounted(async () => {
  const carId = Number(route.params.id);
  if (isNaN(carId)) {
    loading.value = false;
    return;
  }

  await loadCarDetails(carId);
});

async function loadCarDetails(id: number) {
  try {
    const data = await getCarDetails(id);

    // Убедимся что comments это массив
    if (!data.comments) {
      data.comments = [];
    }

    car.value = data;
  } catch (e) {
    console.error("Ошибка загрузки деталей:", e);
    car.value = null;
  } finally {
    loading.value = false;
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

// Booking Modal
function openBookingModal() {
  isBookingModalOpen.value = true;
}

function closeBookingModal() {
  isBookingModalOpen.value = false;
}

async function handleBookingConfirm(startDate: string, endDate: string) {
  if (!car.value) return;

  try {
    await createBooking(car.value.id, startDate, endDate);
    success(`${car.value.brand} ${car.value.model} успешно забронирован!`);
    closeBookingModal();
  } catch (e) {
    console.error("Ошибка бронирования:", e);
    error("Ошибка бронирования. Попробуйте снова.");
  }
}

// Review Modal
function openReviewModal() {
  isReviewModalOpen.value = true;
}

function closeReviewModal() {
  isReviewModalOpen.value = false;
}

async function handleReviewSubmit(rating: number, content: string) {
  if (!car.value) return;

  try {
    await createCarComment(car.value.id, content, rating);
    success("Отзыв успешно добавлен!");

    // Закрываем модальное окно
    closeReviewModal();

    // Перезагружаем детали машины чтобы увидеть новый отзыв
    await loadCarDetails(car.value.id);
  } catch (e: any) {
    console.error("Ошибка добавления отзыва:", e);
    error(e.response?.data?.message || "Не удалось добавить отзыв");
  } finally {
    // Reset submitting state in modal
    if (reviewModalRef.value) {
      reviewModalRef.value.setSubmitting(false);
    }
  }
}
</script>
