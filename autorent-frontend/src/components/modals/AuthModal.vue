<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref, computed, onMounted, onUnmounted, type Ref } from "vue";
import { useBodyLock } from "@/composables/useBodyLock";
import Button from "../ui/Button.vue";
import LoginForm from "./LoginForm.vue";
import RegisterClientForm from "./RegisterClientForm.vue";
import RegisterRoleSelect from "./RegisterRoleSelect.vue";
import RegisterPartnerForm from "./RegisterPartnerForm.vue";

type AuthStep =
  | "login"
  | "register-role"
  | "register-client"
  | "register-partner";

const props = defineProps<{
  initialStep?: AuthStep;
}>();
const emit = defineEmits(["update:modelValue"]);

const modelValue = defineModel<boolean>() as Ref<boolean>;
const step = ref<AuthStep>(props.initialStep ?? "login");

const close = () => {
  emit("update:modelValue", false);
  step.value = "login";
};

const goToLogin = () => (step.value = "login");
const goToRoleSelect = () => (step.value = "register-role");

const handleRoleSelect = (role: "client" | "partner") => {
  step.value = role === "client" ? "register-client" : "register-partner";
};

const currentComponent = computed(() => {
  switch (step.value) {
    case "login":
      return LoginForm;
    case "register-role":
      return RegisterRoleSelect;
    case "register-client":
      return RegisterClientForm;
    case "register-partner":
      return RegisterPartnerForm;
  }
});

const headerTitle = computed(() => {
  switch (step.value) {
    case "login":
      return "С возвращением";
    case "register-role":
      return "Создание аккаунта";
    case "register-client":
      return "Регистрация клиента";
    case "register-partner":
      return "Регистрация партнёра";
  }
});

const headerSubtitle = computed(() => {
  switch (step.value) {
    case "login":
      return "Войдите чтобы продолжить";
    case "register-role":
      return "Выберите тип аккаунта";
    case "register-client":
      return "Начните свою поездку уже сегодня";
    case "register-partner":
      return "Добавляйте автомобили и управляйте доходом";
  }
});
useBodyLock(modelValue);
</script>

<template>
  <Teleport to="#app">
    <Transition name="fade">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-100 flex items-center justify-center backdrop-blur-md"
      >
        <!-- overlay -->
        <div class="absolute inset-0 bg-black/50" @click="close"></div>

        <!-- modal -->
        <div class="z-110 relative p-0 flex flex-col w-[min(80%,30rem)]">
          <div
            class="p-8 bg-linear-to-r from-blue-500 to-blue-600 rounded-t-3xl shadow-(--shadow-m)"
          >
            <h2 class="text-white">{{ headerTitle }}</h2>
            <p class="text-white">{{ headerSubtitle }}</p>
            <Icon
              icon="tabler:x"
              class="absolute text-white right-4 top-4 w-8 h-8 rounded-full p-1 cursor-pointer transition duration-200 hover:text-primary hover:bg-bg"
              @click="close"
            />
          </div>

          <div class="flex flex-col gap-5 px-10 card rounded-t-none">
            <Transition name="fade" mode="out-in">
              <component
                :is="currentComponent"
                :key="step"
                @select-role="handleRoleSelect"
                @back="goToRoleSelect"
                @success="close"
              />
            </Transition>

            <span
              v-if="step == 'login'"
              class="inline-flex gap-1 justify-center"
              >Нет аккаунта?<Button variant="underline" @click="goToRoleSelect">
                Зарегистрируйтесь
              </Button></span
            >
            <span
              v-else-if="step == 'register-role'"
              class="inline-flex gap-1 justify-center"
              >Уже есть аккаунт?<Button variant="underline" @click="goToLogin">
                Войти
              </Button></span
            >
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
