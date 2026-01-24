<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import type { Ref } from "vue";
import { useBodyLock } from "@/composables/useBodyLock";
import Button from "../ui/Button.vue";
import LoginForm from "./LoginForm.vue";
import RegisterForm from "./RegisterForm.vue";


type AuthMode = "login" | "register";

const props = defineProps<{
  initialMode?: AuthMode;
}>();
const emit = defineEmits(["update:modelValue"]);
const modelValue = defineModel<boolean>() as Ref<boolean>;;
const mode = ref<AuthMode>(props.initialMode ?? "login");
  
const close = () => {
  emit("update:modelValue", false);
};

const toggleMode = () => {
  mode.value = mode.value === "login" ? "register" : "login";
};

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

          <div class="flex flex-col gap-5 px-10 card rounded-t-none">
            <LoginForm v-if="mode === 'login'" />
            <RegisterForm v-else />

            <span class="inline-flex gap-1 justify-center"
              >{{ mode === "register" ? "Уже есть аккаунт?" : "Нет аккаунта?"
              }}<Button variant="underline" @click="toggleMode">
                {{
                  mode === "register" ? "Войти" : "Зарегистрируйтесь"
                }}</Button
              ></span
            >
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
