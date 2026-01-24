<script setup lang="ts">
import Input from '../ui/Input.vue';
import Button from '../ui/Button.vue';
import type { Ref } from 'vue';
import { Icon } from "@iconify/vue";
import type { BookingDraft } from '@/types/Booking';
import { useBodyLock } from '@/composables/useBodyLock';

const props = defineProps<{
  booking: BookingDraft;
}>();

const modelValue = defineModel<boolean>() as Ref<boolean>;;

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
            <h2 class="text-white">
              Выберите даты
            </h2>
            <p class="text-white">
              {{ booking.carTitle }}
            </p>
            <Icon
              icon="tabler:x"
              class="absolute text-white right-4 top-4 w-8 h-8 rounded-full p-1 cursor-pointer transition duration-200 hover:text-primary hover:bg-bg"
              @click="close"
            />
          </div>
          
          <form class="flex flex-col gap-4 px-10 card rounded-none">
            <Input label="Дата начала" type="datetime-local" placeholder="Дата начала" />
            <Input label="Дата окончания" type="datetime-local" placeholder="Дата окончания" />
          </form>

          <div class="flex gap-3 bg-bg-light p-4 justify-center rounded-b-3xl">
            <Button variant="secondary">Отменить</Button>
            <Button>Забронировать</Button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
