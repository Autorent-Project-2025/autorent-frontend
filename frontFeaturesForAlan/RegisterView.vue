<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300"
  >
    <div class="w-full max-w-md">
      <!-- Direct Registration Option -->
      <div class="text-center space-y-8 animate-slide-up">
        <div class="space-y-2">
          <h2 class="text-4xl font-extrabold text-gray-900 dark:text-white">
            Регистрация
          </h2>
          <p class="text-gray-600 dark:text-gray-400">
            Создайте аккаунт для доступа к платформе
          </p>
        </div>

        <!-- Quick Action Button -->
        <button
          @click="openRoleSelection"
          class="w-full btn-premium py-4 text-lg animate-slide-up"
          style="animation-delay: 0.1s"
        >
          <span>Начать регистрацию</span>
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

        <!-- Divider -->
        <div class="relative animate-slide-up" style="animation-delay: 0.2s">
          <div class="absolute inset-0 flex items-center">
            <div
              class="w-full border-t border-gray-200 dark:border-gray-700"
            ></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span
              class="px-4 bg-gray-50 dark:bg-gray-950 text-gray-500 dark:text-gray-400"
            >
              Уже есть аккаунт?
            </span>
          </div>
        </div>

        <!-- Login Link -->
        <div class="animate-slide-up" style="animation-delay: 0.3s">
          <router-link
            to="/login"
            class="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold transition-colors inline-flex items-center gap-1 group"
          >
            <svg
              class="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 17l-5-5m0 0l5-5m-5 5h12"
              />
            </svg>
            <span>Войти</span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Role Selection Modal -->
    <RoleSelectionModal
      :is-open="isRoleSelectionOpen"
      @close="closeRoleSelection"
      @select="handleRoleSelect"
    />

    <!-- Client Registration Form -->
    <ClientRegistrationForm
      :is-open="isClientFormOpen"
      @close="closeClientForm"
      @submit="handleClientSubmit"
    />

    <!-- Landlord Registration Form -->
    <LandlordRegistrationForm
      :is-open="isLandlordFormOpen"
      @close="closeLandlordForm"
      @submit="handleLandlordSubmit"
    />

    <!-- Payment Card Modal (after successful registration) -->
    <PaymentCardModal
      :is-open="isPaymentCardOpen"
      @close="closePaymentCard"
      @submit="handlePaymentCardSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "../composables/useToast";
import RoleSelectionModal from "../components/RoleSelectionModal.vue";
import ClientRegistrationForm from "../components/ClientRegistrationForm.vue";
import LandlordRegistrationForm from "../components/LandlordRegistrationForm.vue";
import PaymentCardModal from "../components/PaymentCardModal.vue";

const router = useRouter();
const { success, error } = useToast();

// Modal states
const isRoleSelectionOpen = ref(false);
const isClientFormOpen = ref(false);
const isLandlordFormOpen = ref(false);
const isPaymentCardOpen = ref(false);

// Selected role
const selectedRole = ref<"client" | "landlord" | null>(null);

// Registration data storage
const registrationData = ref<any>(null);

// Role Selection
function openRoleSelection() {
  isRoleSelectionOpen.value = true;
}

function closeRoleSelection() {
  isRoleSelectionOpen.value = false;
}

function handleRoleSelect(role: "client" | "landlord") {
  selectedRole.value = role;
  closeRoleSelection();

  // Open appropriate form after short delay
  setTimeout(() => {
    if (role === "client") {
      isClientFormOpen.value = true;
    } else {
      isLandlordFormOpen.value = true;
    }
  }, 300);
}

// Client Form
function closeClientForm() {
  isClientFormOpen.value = false;
}

async function handleClientSubmit(formData: any) {
  try {
    // TODO: Send to backend API
    console.log("Client registration data:", formData);

    // Store data temporarily
    registrationData.value = {
      role: "client",
      ...formData,
    };

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    success("Регистрация прошла успешно!");
    closeClientForm();

    // Open payment card modal after short delay
    setTimeout(() => {
      isPaymentCardOpen.value = true;
    }, 500);
  } catch (err) {
    error("Ошибка регистрации. Попробуйте снова.");
  }
}

// Landlord Form
function closeLandlordForm() {
  isLandlordFormOpen.value = false;
}

async function handleLandlordSubmit(formData: any) {
  try {
    // TODO: Send to backend API
    console.log("Landlord registration data:", formData);

    // Store data temporarily
    registrationData.value = {
      role: "landlord",
      ...formData,
    };

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    success("Регистрация прошла успешно!");
    closeLandlordForm();

    // Open payment card modal after short delay
    setTimeout(() => {
      isPaymentCardOpen.value = true;
    }, 500);
  } catch (err) {
    error("Ошибка регистрации. Попробуйте снова.");
  }
}

// Payment Card
function closePaymentCard() {
  isPaymentCardOpen.value = false;
  // Redirect to main page or login
  router.push("/login");
}

async function handlePaymentCardSubmit(formData: any) {
  try {
    // TODO: Send payment data to backend API
    console.log("Payment card data:", formData);
    console.log("Full registration:", registrationData.value);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    success("Карта успешно привязана!");
    closePaymentCard();

    // Redirect to login
    setTimeout(() => {
      router.push("/login");
    }, 500);
  } catch (err) {
    error("Ошибка привязки карты. Попробуйте снова.");
  }
}
</script>
