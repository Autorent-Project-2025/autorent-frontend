<script setup lang="ts">
import Input from '../ui/Input.vue';
const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits(["update:modelValue"]);

const close = () => {
  emit("update:modelValue", false);
};


</script>

<template>
  <Teleport to="#app">
    <Transition name="fade-up"> 
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
              Выберите даты
            </h2>
            <p class="text-white">
              Mercedes
            </p>
            <Icon
              icon="tabler:x"
              class="absolute text-white right-4 top-4 w-8 h-8 rounded-full p-1 cursor-pointer transition duration-200 hover:text-primary hover:bg-bg"
              @click="close"
            />
          </div>
          
          <form class="card rounded-t-none">
            <Input label="Дата начала" type="datetime-local" placeholder="Дата начала" icon="tabler:calendar-event" />
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
