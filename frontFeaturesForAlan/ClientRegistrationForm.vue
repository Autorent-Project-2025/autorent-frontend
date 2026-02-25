<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto"
        @click.self="closeModal"
      >
        <div
          class="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden transform transition-all my-8"
          @click.stop
        >
          <!-- Header -->
          <div
            class="relative bg-gradient-to-br from-blue-600 to-cyan-600 px-8 py-6 text-white"
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
              <h2 class="text-3xl font-bold">Регистрация клиента</h2>
              <p class="text-blue-100">
                Заполните форму для создания аккаунта
              </p>
            </div>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleSubmit" class="p-8 space-y-6">
            <!-- Full Name -->
            <div class="space-y-2">
              <label
                for="fullName"
                class="block text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                ФИО <span class="text-red-500">*</span>
              </label>
              <input
                id="fullName"
                v-model="formData.fullName"
                type="text"
                required
                placeholder="Иванов Иван Иванович"
                class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
            </div>

            <!-- Email -->
            <div class="space-y-2">
              <label
                for="email"
                class="block text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                Email <span class="text-red-500">*</span>
              </label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                required
                placeholder="example@mail.com"
                class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
            </div>

            <!-- Phone -->
            <div class="space-y-2">
              <label
                for="phone"
                class="block text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                Номер телефона <span class="text-red-500">*</span>
              </label>
              <input
                id="phone"
                v-model="formData.phone"
                type="tel"
                required
                placeholder="+7 (777) 123-45-67"
                class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
            </div>

            <!-- Country/Region -->
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <label
                  for="country"
                  class="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Страна <span class="text-red-500">*</span>
                </label>
                <select
                  id="country"
                  v-model="formData.country"
                  required
                  class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 transition-all"
                >
                  <option value="">Выберите</option>
                  <option value="KZ">Казахстан</option>
                  <option value="RU">Россия</option>
                  <option value="KG">Кыргызстан</option>
                  <option value="UZ">Узбекистан</option>
                </select>
              </div>

              <div class="space-y-2">
                <label
                  for="region"
                  class="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Регион/Город <span class="text-red-500">*</span>
                </label>
                <input
                  id="region"
                  v-model="formData.region"
                  type="text"
                  required
                  placeholder="Алматы"
                  class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 transition-all"
                />
              </div>
            </div>

            <!-- Password -->
            <div class="space-y-2">
              <label
                for="password"
                class="block text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                Пароль <span class="text-red-500">*</span>
              </label>
              <input
                id="password"
                v-model="formData.password"
                type="password"
                required
                minlength="8"
                placeholder="Минимум 8 символов"
                class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
            </div>

            <!-- Confirm Password -->
            <div class="space-y-2">
              <label
                for="confirmPassword"
                class="block text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                Подтвердите пароль <span class="text-red-500">*</span>
              </label>
              <input
                id="confirmPassword"
                v-model="formData.confirmPassword"
                type="password"
                required
                placeholder="Повторите пароль"
                class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
              <p
                v-if="passwordError"
                class="text-sm text-red-600 dark:text-red-400"
              >
                {{ passwordError }}
              </p>
            </div>

            <!-- Terms Agreement -->
            <div class="flex items-start gap-3">
              <input
                id="terms"
                v-model="formData.agreeToTerms"
                type="checkbox"
                required
                class="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label
                for="terms"
                class="text-sm text-gray-700 dark:text-gray-300"
              >
                Я согласен с
                <a
                  href="#"
                  class="text-blue-600 dark:text-blue-400 hover:underline"
                  >условиями использования</a
                >
                и
                <a
                  href="#"
                  class="text-blue-600 dark:text-blue-400 hover:underline"
                  >политикой конфиденциальности</a
                >
              </label>
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

            <!-- Buttons -->
            <div class="flex gap-3 pt-4">
              <button
                type="button"
                @click="closeModal"
                class="flex-1 px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all active:scale-95"
              >
                Отмена
              </button>
              <button
                type="submit"
                :disabled="loading"
                class="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-xl transition-all hover:shadow-lg active:scale-95 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <span v-if="!loading">Зарегистрироваться</span>
                <span v-else>Регистрация...</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";

interface Props {
  isOpen: boolean;
}

interface Emits {
  (e: "close"): void;
  (e: "submit", formData: ClientFormData): void;
}

interface ClientFormData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  region: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const loading = ref(false);
const errorMessage = ref("");

const formData = ref<ClientFormData>({
  fullName: "",
  email: "",
  phone: "",
  country: "",
  region: "",
  password: "",
  confirmPassword: "",
  agreeToTerms: false,
});

// Password validation
const passwordError = computed(() => {
  if (!formData.value.password || !formData.value.confirmPassword) {
    return "";
  }
  if (formData.value.password !== formData.value.confirmPassword) {
    return "Пароли не совпадают";
  }
  return "";
});

// Reset form when modal opens
watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      formData.value = {
        fullName: "",
        email: "",
        phone: "",
        country: "",
        region: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false,
      };
      errorMessage.value = "";
    }
  }
);

function closeModal() {
  emit("close");
}

function handleSubmit() {
  if (passwordError.value) {
    errorMessage.value = passwordError.value;
    return;
  }

  if (!formData.value.agreeToTerms) {
    errorMessage.value = "Необходимо согласиться с условиями использования";
    return;
  }

  emit("submit", { ...formData.value });
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
