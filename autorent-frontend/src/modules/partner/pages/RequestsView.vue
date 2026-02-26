<script setup lang="ts">
import { ref } from "vue";
import Button from "@/shared/ui/Button.vue";
import { Icon } from "@iconify/vue";
import NewRequestModal from "../components/NewRequestModal.vue";

const isModalOpen = ref(false);
const openModal = () => (isModalOpen.value = true);
</script>
<template>
  <section class="section p-8">
    <NewRequestModal v-model="isModalOpen" />
    <h2>Заявки</h2>
    <div class="flex gap-3">
      <button class="bg-bg px-5 py-2 card">Активные</button>
      <button class="bg-bg px-5 py-2 card">Неактивные</button>
    </div>
    <div class="flex flex-col gap-2 justify-center items-center">
      <Icon
        icon="tabler:box"
        class="w-20 h-20 bg-bg p-2 rounded-full border-2 border-border shadow-(--shadow-s)"
      />
      <p>У вас пока нет заявок</p>
      <Button @click="openModal">Создать заявку</Button>
    </div>
  </section>
</template>
