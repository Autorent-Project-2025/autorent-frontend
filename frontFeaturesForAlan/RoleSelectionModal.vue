<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        @click.self="closeModal"
      >
        <div
          class="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden transform transition-all"
          @click.stop
        >
          <!-- Header -->
          <div
            class="relative bg-gradient-to-br from-primary-600 to-primary-700 px-8 py-8 text-white text-center"
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
              <h2 class="text-3xl font-bold">Выберите тип аккаунта</h2>
              <p class="text-primary-100 text-lg">
                Как вы хотите использовать платформу?
              </p>
            </div>
          </div>

          <!-- Content -->
          <div class="p-8">
            <div class="grid md:grid-cols-2 gap-6">
              <!-- Client Card -->
              <button
                @click="selectRole('client')"
                class="group relative p-8 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-3xl border-2 border-blue-200 dark:border-blue-800 hover:border-blue-500 dark:hover:border-blue-400 transition-all hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
              >
                <!-- Icon -->
                <div
                  class="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow"
                >
                  <svg
                    class="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>

                <!-- Title -->
                <h3
                  class="text-2xl font-bold text-gray-900 dark:text-white mb-3 text-center"
                >
                  Я клиент
                </h3>

                <!-- Description -->
                <p
                  class="text-gray-600 dark:text-gray-400 text-center mb-6 leading-relaxed"
                >
                  Хочу арендовать автомобиль для личных или деловых поездок
                </p>

                <!-- Features -->
                <div class="space-y-3">
                  <div class="flex items-start gap-3">
                    <svg
                      class="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="text-sm text-gray-700 dark:text-gray-300">
                      Бронирование автомобилей
                    </span>
                  </div>
                  <div class="flex items-start gap-3">
                    <svg
                      class="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="text-sm text-gray-700 dark:text-gray-300">
                      Выбор из множества предложений
                    </span>
                  </div>
                  <div class="flex items-start gap-3">
                    <svg
                      class="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="text-sm text-gray-700 dark:text-gray-300">
                      Отзывы и рейтинги
                    </span>
                  </div>
                </div>

                <!-- Badge -->
                <div
                  class="absolute top-4 right-4 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full"
                >
                  Популярный выбор
                </div>
              </button>

              <!-- Landlord Card -->
              <button
                @click="selectRole('landlord')"
                class="group relative p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-3xl border-2 border-purple-200 dark:border-purple-800 hover:border-purple-500 dark:hover:border-purple-400 transition-all hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
              >
                <!-- Icon -->
                <div
                  class="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow"
                >
                  <svg
                    class="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>

                <!-- Title -->
                <h3
                  class="text-2xl font-bold text-gray-900 dark:text-white mb-3 text-center"
                >
                  Я арендодатель
                </h3>

                <!-- Description -->
                <p
                  class="text-gray-600 dark:text-gray-400 text-center mb-6 leading-relaxed"
                >
                  Хочу сдавать свои автомобили в аренду и зарабатывать
                </p>

                <!-- Features -->
                <div class="space-y-3">
                  <div class="flex items-start gap-3">
                    <svg
                      class="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="text-sm text-gray-700 dark:text-gray-300">
                      Управление автопарком
                    </span>
                  </div>
                  <div class="flex items-start gap-3">
                    <svg
                      class="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="text-sm text-gray-700 dark:text-gray-300">
                      Установка своих цен
                    </span>
                  </div>
                  <div class="flex items-start gap-3">
                    <svg
                      class="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="text-sm text-gray-700 dark:text-gray-300">
                      Пассивный доход
                    </span>
                  </div>
                </div>

                <!-- Badge -->
                <div
                  class="absolute top-4 right-4 px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full"
                >
                  Для бизнеса
                </div>
              </button>
            </div>

            <!-- Footer Note -->
            <p
              class="text-center text-sm text-gray-500 dark:text-gray-400 mt-8"
            >
              Вы сможете изменить тип аккаунта в настройках профиля
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  isOpen: boolean;
}

interface Emits {
  (e: "close"): void;
  (e: "select", role: "client" | "landlord"): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

function closeModal() {
  emit("close");
}

function selectRole(role: "client" | "landlord") {
  emit("select", role);
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
