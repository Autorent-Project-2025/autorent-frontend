<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        @click.self="closeModal"
      >
        <div
          class="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden transform transition-all"
          @click.stop
        >
          <!-- Header -->
          <div
            class="relative bg-gradient-to-br from-green-600 to-emerald-600 px-8 py-6 text-white"
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
              <h2 class="text-3xl font-bold">Привязка карты</h2>
              <p class="text-green-100">
                Для оплаты бронирований и автоматического списания
              </p>
            </div>
          </div>

          <!-- Content -->
          <div class="p-8 space-y-6">
            <!-- Payment Method Selection -->
            <div class="space-y-3">
              <label
                class="block text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                Способ оплаты <span class="text-red-500">*</span>
              </label>

              <div class="grid grid-cols-2 gap-3">
                <!-- Kaspi -->
                <button
                  type="button"
                  @click="formData.paymentMethod = 'kaspi'"
                  :class="[
                    'p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2',
                    formData.paymentMethod === 'kaspi'
                      ? 'bg-red-50 dark:bg-red-900/20 border-red-500'
                      : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-red-400',
                  ]"
                >
                  <div class="text-2xl font-bold text-red-600">Kaspi</div>
                  <span class="text-xs text-gray-600 dark:text-gray-400">
                    Kaspi Gold
                  </span>
                </button>

                <!-- Apple Pay -->
                <button
                  type="button"
                  @click="formData.paymentMethod = 'apple_pay'"
                  :class="[
                    'p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2',
                    formData.paymentMethod === 'apple_pay'
                      ? 'bg-gray-100 dark:bg-gray-700 border-gray-900 dark:border-white'
                      : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-900',
                  ]"
                >
                  <svg
                    class="w-8 h-8"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"
                    />
                  </svg>
                  <span class="text-xs text-gray-600 dark:text-gray-400">
                    Apple Pay
                  </span>
                </button>

                <!-- Visa -->
                <button
                  type="button"
                  @click="formData.paymentMethod = 'visa'"
                  :class="[
                    'p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2',
                    formData.paymentMethod === 'visa'
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-600'
                      : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-600',
                  ]"
                >
                  <div class="text-2xl font-bold text-blue-600">VISA</div>
                  <span class="text-xs text-gray-600 dark:text-gray-400">
                    Visa карта
                  </span>
                </button>

                <!-- Mastercard -->
                <button
                  type="button"
                  @click="formData.paymentMethod = 'mastercard'"
                  :class="[
                    'p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2',
                    formData.paymentMethod === 'mastercard'
                      ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-600'
                      : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-orange-600',
                  ]"
                >
                  <div
                    class="text-xl font-bold text-orange-600 flex items-center gap-0.5"
                  >
                    <div
                      class="w-5 h-5 rounded-full bg-red-600 opacity-75"
                    ></div>
                    <div
                      class="w-5 h-5 rounded-full bg-yellow-500 opacity-75 -ml-3"
                    ></div>
                  </div>
                  <span class="text-xs text-gray-600 dark:text-gray-400">
                    Mastercard
                  </span>
                </button>
              </div>
            </div>

            <!-- Card Details Form -->
            <form
              v-if="formData.paymentMethod && formData.paymentMethod !== 'apple_pay'"
              @submit.prevent="handleSubmit"
              class="space-y-4"
            >
              <!-- Card Number -->
              <div class="space-y-2">
                <label
                  for="cardNumber"
                  class="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Номер карты <span class="text-red-500">*</span>
                </label>
                <input
                  id="cardNumber"
                  v-model="formData.cardNumber"
                  type="text"
                  required
                  placeholder="0000 0000 0000 0000"
                  maxlength="19"
                  @input="formatCardNumber"
                  class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-green-500 dark:focus:border-green-400 focus:ring-4 focus:ring-green-500/10 transition-all font-mono text-lg tracking-wider"
                />
              </div>

              <!-- Card Holder Name -->
              <div class="space-y-2">
                <label
                  for="cardHolder"
                  class="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Имя владельца <span class="text-red-500">*</span>
                </label>
                <input
                  id="cardHolder"
                  v-model="formData.cardHolder"
                  type="text"
                  required
                  placeholder="IVAN IVANOV"
                  class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-green-500 dark:focus:border-green-400 focus:ring-4 focus:ring-green-500/10 transition-all uppercase"
                  style="text-transform: uppercase"
                />
              </div>

              <!-- Expiry & CVV -->
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label
                    for="expiry"
                    class="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                  >
                    Срок действия <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="expiry"
                    v-model="formData.expiry"
                    type="text"
                    required
                    placeholder="MM/YY"
                    maxlength="5"
                    @input="formatExpiry"
                    class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-green-500 dark:focus:border-green-400 focus:ring-4 focus:ring-green-500/10 transition-all font-mono"
                  />
                </div>

                <div class="space-y-2">
                  <label
                    for="cvv"
                    class="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                  >
                    CVV <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="cvv"
                    v-model="formData.cvv"
                    type="text"
                    required
                    placeholder="123"
                    maxlength="3"
                    pattern="[0-9]{3}"
                    class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-green-500 dark:focus:border-green-400 focus:ring-4 focus:ring-green-500/10 transition-all font-mono text-center"
                  />
                </div>
              </div>

              <!-- Save Card Checkbox -->
              <div class="flex items-start gap-3 pt-2">
                <input
                  id="saveCard"
                  v-model="formData.saveCard"
                  type="checkbox"
                  class="mt-1 w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                />
                <label
                  for="saveCard"
                  class="text-sm text-gray-700 dark:text-gray-300"
                >
                  Сохранить карту для будущих платежей
                </label>
              </div>

              <!-- Security Notice -->
              <div
                class="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl"
              >
                <svg
                  class="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <p class="text-xs text-blue-900 dark:text-blue-100">
                  Ваши платежные данные защищены и передаются по защищенному
                  соединению. Мы не храним полный номер вашей карты.
                </p>
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
                  class="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold rounded-xl transition-all hover:shadow-lg active:scale-95 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <span v-if="!loading">Привязать карту</span>
                  <span v-else>Проверка...</span>
                </button>
              </div>
            </form>

            <!-- Apple Pay Button -->
            <div v-else-if="formData.paymentMethod === 'apple_pay'" class="space-y-4">
              <div
                class="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
              >
                <svg
                  class="w-5 h-5 text-gray-600 dark:text-gray-400 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p class="text-sm text-gray-700 dark:text-gray-300">
                  Для использования Apple Pay нажмите кнопку ниже и следуйте
                  инструкциям на экране.
                </p>
              </div>

              <button
                @click="handleApplePay"
                :disabled="loading"
                class="w-full px-6 py-4 bg-black hover:bg-gray-900 disabled:bg-gray-400 text-white font-semibold rounded-xl transition-all hover:shadow-lg active:scale-95 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                <svg
                  class="w-8 h-8"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"
                  />
                </svg>
                <span>{{ loading ? "Подключение..." : "Настроить Apple Pay" }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

interface Props {
  isOpen: boolean;
}

interface Emits {
  (e: "close"): void;
  (e: "submit", formData: PaymentFormData): void;
}

interface PaymentFormData {
  paymentMethod: "kaspi" | "apple_pay" | "visa" | "mastercard" | null;
  cardNumber: string;
  cardHolder: string;
  expiry: string;
  cvv: string;
  saveCard: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const loading = ref(false);
const errorMessage = ref("");

const formData = ref<PaymentFormData>({
  paymentMethod: null,
  cardNumber: "",
  cardHolder: "",
  expiry: "",
  cvv: "",
  saveCard: true,
});

// Format card number (add spaces)
function formatCardNumber(event: Event) {
  const input = event.target as HTMLInputElement;
  let value = input.value.replace(/\s/g, "");
  let formatted = value.match(/.{1,4}/g)?.join(" ") || value;
  formData.value.cardNumber = formatted;
}

// Format expiry date (MM/YY)
function formatExpiry(event: Event) {
  const input = event.target as HTMLInputElement;
  let value = input.value.replace(/\D/g, "");
  if (value.length >= 2) {
    value = value.slice(0, 2) + "/" + value.slice(2, 4);
  }
  formData.value.expiry = value;
}

// Reset form when modal opens
watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      formData.value = {
        paymentMethod: null,
        cardNumber: "",
        cardHolder: "",
        expiry: "",
        cvv: "",
        saveCard: true,
      };
      errorMessage.value = "";
    }
  }
);

function closeModal() {
  emit("close");
}

function handleSubmit() {
  // Basic validation
  if (formData.value.cardNumber.replace(/\s/g, "").length !== 16) {
    errorMessage.value = "Некорректный номер карты";
    return;
  }

  if (!/^\d{2}\/\d{2}$/.test(formData.value.expiry)) {
    errorMessage.value = "Некорректный срок действия";
    return;
  }

  if (!/^\d{3}$/.test(formData.value.cvv)) {
    errorMessage.value = "Некорректный CVV";
    return;
  }

  emit("submit", { ...formData.value });
}

function handleApplePay() {
  // Simulate Apple Pay flow
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    emit("submit", { ...formData.value });
  }, 2000);
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
