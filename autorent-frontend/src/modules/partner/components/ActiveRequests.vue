<script setup lang="ts">
import Features from '@/shared/ui/Features.vue';

</script>

<template>
  <div class="card shadow-(--shadow-s-in)">
    <h3 class="mb-3">Активные заявки</h3>

    <div class="flex flex-col gap-2">
      <div class="flex justify-between">
        <span>Регистрация авто</span>
        <Features type="blue">В работе</Features>
      </div>

      <div class="flex justify-between">
        <span>Вывод средств</span>
        <Features type="green">Одобрено</Features>
      </div>

      <div class="flex justify-between">
        <span>Изменения данных</span>
        <Features type="red">Отказано</Features>
      </div>
    </div>
  </div>
</template>
