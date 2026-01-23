<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref, watch } from "vue";
import Button from "../ui/Button.vue";
import LoginForm from "./LoginForm.vue";
import RegisterForm from "./RegisterForm.vue";

const props = defineProps<{
  modelValue: boolean;
  initialMode?: AuthMode;
}>();

type AuthMode = "login" | "register";

const mode = ref<AuthMode>(props.initialMode ?? "login");

const emit = defineEmits(["update:modelValue"]);

const close = () => {
  emit("update:modelValue", false);
};

const toggleMode = () => {
  mode.value = mode.value === "login" ? "register" : "login";
};

watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen && props.initialMode) {
      mode.value = props.initialMode;
    }
    document.body.style.overflow = isOpen ? "hidden" : "";
  },
);
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
            class="p-8 bg-blue-500 rounded-t-2xl shadow-(--shadow-m)"
          >
            <h2 class="text-white">
              {{ mode === "register" ? "Добро пожаловать!" : "С возвращением" }}
            </h2>
            <p class="text-white">
              {{
                mode === "register"
                  ? "Начните свой поезду"
                  : "Войдите чтобы продолжить"
              }}
            </p>
            <Icon
              icon="tabler:x"
              class="absolute text-white right-4 top-4 w-8 h-8 rounded-full p-1 cursor-pointer transition duration-200 hover:text-primary hover:bg-bg"
              @click="close"
            />
          </div>
          <form class="flex flex-col gap-4 px-10 card rounded-t-none relative">
            <LoginForm v-if="mode === 'login'" />
            <RegisterForm v-else />
            <Button>{{
              mode == "register" ? "Зарегистрироваться" : "Войти"
            }}</Button>

            <span class="inline-flex gap-1 justify-center"
              >{{ mode === "register" ? "Уже есть аккаунт?" : "Нет аккаунта?"
              }}<Button variant="underline" @click="toggleMode">
                {{
                  mode === "register" ? "Войти" : "Зарегистрируйтесь"
                }}</Button
              ></span
            >
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
