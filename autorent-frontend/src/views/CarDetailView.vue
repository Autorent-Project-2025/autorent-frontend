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
            <!-- Images -->
            <div class="space-y-4 flex-shrink-0">
              <!-- Main Image -->
              <div
                class="relative h-96 rounded-3xl overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 shadow-2xl"
              >
                <img
                  :src="currentImage"
                  :alt="`${car.brand} ${car.model}`"
                  class="car-detail-main-image w-full h-full object-cover"
                />

                <!-- Image Navigation -->
                <div
                  v-if="car.images && car.images.length > 1"
                  class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2"
                >
                  <button
                    v-for="(img, index) in car.images"
                    :key="index"
                    @click="currentImageIndex = index"
                    :class="[
                      'w-3 h-3 rounded-full transition-all',
                      currentImageIndex === index
                        ? 'bg-white w-8'
                        : 'bg-white/50 hover:bg-white/75',
                    ]"
                  ></button>
                </div>
              </div>

              <!-- Thumbnail Gallery -->
              <div
                v-if="car.images && car.images.length > 1"
                class="grid grid-cols-4 gap-3"
              >
                <button
                  v-for="(img, index) in car.images.slice(0, 4)"
                  :key="index"
                  @click="currentImageIndex = index"
                  :class="[
                    'relative h-24 rounded-xl overflow-hidden transition-all',
                    currentImageIndex === index
                      ? 'ring-4 ring-primary-500 scale-105'
                      : 'ring-2 ring-gray-200 dark:ring-gray-700 hover:ring-primary-300',
                  ]"
                >
                  <img
                    :src="img"
                    :alt="`${car.brand} ${car.model} - фото ${index + 1}`"
                    class="w-full h-full object-cover"
                  />
                </button>
              </div>
            </div>

            <!-- Description - растягивается до нижней границы Features -->
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
                <div
                  v-if="car.averageRating"
                  class="flex flex-col items-end gap-1"
                >
                  <div class="flex items-center gap-2">
                    <div class="flex items-center gap-1">
                      <svg
                        v-for="i in 5"
                        :key="i"
                        :class="[
                          'w-5 h-5',
                          i <= Math.round(car.averageRating)
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
                      {{ car.averageRating.toFixed(1) }}
                    </span>
                  </div>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {{ car.totalReviews }} отзывов
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

            <!-- Specifications - Expanded -->
            <div
              v-if="car.specifications"
              class="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800"
            >
              <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Характеристики
              </h2>
              <div class="grid grid-cols-2 gap-x-4 gap-y-5">
                <div
                  v-if="car.specifications.engine"
                  class="flex items-center gap-3"
                >
                  <div
                    class="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0"
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
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      Двигатель
                    </p>
                    <p class="font-semibold text-gray-900 dark:text-white">
                      {{ car.specifications.engine }}
                    </p>
                  </div>
                </div>

                <div
                  v-if="car.specifications.transmission"
                  class="flex items-center gap-3"
                >
                  <div
                    class="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0"
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
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      Коробка передач
                    </p>
                    <p class="font-semibold text-gray-900 dark:text-white">
                      {{ car.specifications.transmission }}
                    </p>
                  </div>
                </div>

                <div
                  v-if="car.specifications.seats"
                  class="flex items-center gap-3"
                >
                  <div
                    class="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0"
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
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Мест</p>
                    <p class="font-semibold text-gray-900 dark:text-white">
                      {{ car.specifications.seats }}
                    </p>
                  </div>
                </div>

                <div
                  v-if="car.specifications.fuelType"
                  class="flex items-center gap-3"
                >
                  <div
                    class="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0"
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
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      Топливо
                    </p>
                    <p class="font-semibold text-gray-900 dark:text-white">
                      {{ car.specifications.fuelType }}
                    </p>
                  </div>
                </div>

                <div
                  v-if="car.specifications.color"
                  class="flex items-center gap-3"
                >
                  <div
                    class="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0"
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
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                      />
                    </svg>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Цвет</p>
                    <p class="font-semibold text-gray-900 dark:text-white">
                      {{ car.specifications.color }}
                    </p>
                  </div>
                </div>

                <div
                  v-if="car.specifications.doors"
                  class="flex items-center gap-3"
                >
                  <div
                    class="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0"
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
                        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                      />
                    </svg>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      Дверей
                    </p>
                    <p class="font-semibold text-gray-900 dark:text-white">
                      {{ car.specifications.doors }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Features - НЕ растягивается, естественная высота -->
            <div
              v-if="car.features && car.features.length > 0"
              class="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800"
            >
              <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Особенности
              </h2>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="(feature, index) in car.features"
                  :key="index"
                  class="px-4 py-2 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full text-sm font-semibold"
                >
                  {{ feature }}
                </span>
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
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Отзывы
            <span
              v-if="reviews.length > 0"
              class="text-gray-500 dark:text-gray-400"
              >({{ reviews.length }})</span
            >
          </h2>

          <!-- Reviews List -->
          <div v-if="reviews.length > 0" class="space-y-6">
            <div
              v-for="review in reviews"
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
                      {{ formatDate(review.createdAt) }}
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
                {{ review.comment }}
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
      v-if="car && isModalOpen"
      :is-open="isModalOpen"
      :car="car"
      @close="closeBookingModal"
      @confirm="handleBookingConfirm"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { CarDetails } from "../types/Car";
import type { Review } from "../types/Review";
import { createBooking } from "../api/booking";
import { useToast } from "../composables/useToast";
import BookingModal from "../components/BookingModal.vue";

const route = useRoute();
const router = useRouter();
const { success, error } = useToast();

const loading = ref(true);
const car = ref<CarDetails | null>(null);
const reviews = ref<Review[]>([]);
const currentImageIndex = ref(0);
const isModalOpen = ref(false);

const currentImage = computed(() => {
  if (car.value?.images && car.value.images.length > 0) {
    return car.value.images[currentImageIndex.value];
  }
  return car.value?.imageUrl || "https://placehold.co/600x400?text=No+Image";
});

onMounted(async () => {
  const carId = Number(route.params.id);
  if (isNaN(carId)) {
    loading.value = false;
    return;
  }

  await loadCarDetails(carId);
  await loadReviews(carId);
});

async function loadCarDetails(id: number) {
  try {
    // TODO: Заменить на реальный API вызов когда бэк будет готов
    // const data = await getCarDetails(id);
    // car.value = data;

    // Временные моковые данные
    car.value = {
      id: id,
      brand: "Mercedes-Benz",
      model: "CLA45 S AMG 4Matic",
      year: 2023,
      priceHour: 48,
      priceDay: 288,
      imageUrl: "https://placehold.co/800x600?text=Mercedes+CLA45",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      features: [
        "Полный привод 4MATIC",
        "Спортивные сиденья AMG",
        "Панорамная крыша",
        "Система навигации",
        "Камера 360°",
        "Адаптивный круиз-контроль",
        "Подогрев сидений",
        "Премиум аудиосистема",
      ],
      specifications: {
        engine: "2.0L Turbo 421 л.с.",
        transmission: "Автомат 8-ст. AMG",
        fuelType: "Бензин",
        seats: 5,
        doors: 4,
        color: "Черный металлик",
        mileage: 15000,
      },
      images: [
        "https://www.netcarshow.com/Mercedes-Benz-CLA45_S_AMG_4Matic-2020-Front_Three-Quarter.d21711f9.jpg?w=800&q=80", // Mercedes Front
        "https://preview2.netcarshow.com/Mercedes-Benz-CLA45_S_AMG_4Matic-2020-Side_Profile.d21711f9.jpg?w=800&q=80", // Mercedes Side
        "https://preview2.netcarshow.com/Mercedes-Benz-CLA45_S_AMG_4Matic-2020-Interior.d21711f9.jpg?w=800&q=80", // Mercedes Interior
        "https://www.netcarshow.com/Mercedes-Benz-CLA45_S_AMG_4Matic-2020-Rear.d21711f9.jpg?w=800&q=80", // Mercedes Back
      ],
      averageRating: 4.8,
      totalReviews: 24,
    };
  } catch (e) {
    console.error("Ошибка загрузки деталей:", e);
    car.value = null;
  } finally {
    loading.value = false;
  }
}

async function loadReviews(carId: number) {
  try {
    // TODO: Заменить на реальный API вызов
    // const data = await getCarReviews(carId);
    // reviews.value = data;

    // Временные моковые отзывы
    reviews.value = [
      {
        id: 1,
        userId: 1,
        userName: "Александр Иванов",
        carId: carId,
        rating: 5,
        comment:
          "Потрясающий автомобиль! Мощность, комфорт и стиль - всё на высшем уровне. Арендовал на выходные и получил массу удовольствия от вождения.",
        createdAt: "2026-01-01T10:00:00Z",
      },
      {
        id: 2,
        userId: 2,
        userName: "Елена Петрова",
        carId: carId,
        rating: 5,
        comment:
          "Отличный сервис и шикарная машина! Всё прошло гладко, автомобиль в идеальном состоянии. Обязательно арендую снова!",
        createdAt: "2025-12-28T15:30:00Z",
      },
      {
        id: 3,
        userId: 3,
        userName: "Дмитрий Сидоров",
        carId: carId,
        rating: 4,
        comment:
          "Очень хороший автомобиль, но цена немного высоковата. В остальном всё отлично - динамика, комфорт, технологии.",
        createdAt: "2025-12-25T12:00:00Z",
      },
    ];
  } catch (e) {
    console.error("Ошибка загрузки отзывов:", e);
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

function openBookingModal() {
  isModalOpen.value = true;
}

function closeBookingModal() {
  isModalOpen.value = false;
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
</script>
