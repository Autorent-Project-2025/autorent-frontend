<script setup lang="ts">
import Button from "@/shared/ui/Button.vue";
import { ref } from "vue";
import type { Ref } from "vue";
import { Icon } from "@iconify/vue";
import { useBodyLock } from "@/shared/composables/useBodyLock";

const requests: {
  title: string;
  icon: string;
  type: requestType;
}[] = [
  {
    title: "Вывод средств",
    icon: "tabler:car",
    type: "output",
  },
  {
    title: "Регистрация авто",
    icon: "tabler:car",
    type: "registration",
  },
  {
    title: "Удаление авто",
    icon: "tabler:car",
    type: "delete",
  },
];
type requestType = "output" | "registration" | "delete";
const selectedType = ref<requestType | null>(null);

const select = (type: requestType) => {
  selectedType.value = type;
};
const modelValue = defineModel<boolean>() as Ref<boolean>;
const close = () => {
  modelValue.value = false;
};

useBodyLock(modelValue);
</script>

<template>
  <Teleport to="#app">
    <Transition name="fade-up" appear>
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
            <h2 class="text-white">Выберите тип заявки</h2>
            <p class="text-white"></p>
            <Icon
              icon="tabler:x"
              class="absolute text-white right-4 top-4 w-8 h-8 rounded-full p-1 cursor-pointer transition duration-200 hover:text-primary hover:bg-bg"
              @click="close"
            />
          </div>

          <div class="flex flex-col gap-6 card rounded-t-none">
            <div
              v-for="request in requests"
              @click="select(request.type)"
              class="border-2 flex items-center gap-4 card bg-bg-light transition-all duration-200 cursor-pointer"
              :class="{
                'border-blue-500 bg-blue-500/20 scale-102':
                  selectedType === request.type,
              }"
            >
              <Icon
                :icon="request.icon"
                class="w-16 h-16 p-3 border-3 border-blue-500 rounded-xl text-blue-500 transition-all duration-200"
                :class="{
                  'bg-blue-500 shadow-(--shadow-s) text-white':
                    selectedType === request.type,
                }"
              />
              <h3>{{ request.title }}</h3>
            </div>
            <Button>Далее</Button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
