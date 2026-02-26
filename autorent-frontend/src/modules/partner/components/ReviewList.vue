<script setup lang="ts">
import { Icon } from "@iconify/vue";
import ReviewCard from "./ReviewCard.vue";
</script>
<template>
    <div class="card bg-bg">
        <h3 class="text-lg font-semibold ">Отзывы</h3>
        <div class="flex items-center gap-3 my-2">
          <span class="text-3xl font-semibold">4.5</span>
          <span class="text-yellow-500 inline-flex gap-1"
            ><Icon v-for="i in 5" icon="tabler:star-filled"
          /></span>
          <span class="text-gray-400 text-sm">128 отзывов</span>
        </div>
        <div>
          <ReviewCard />
        </div>
    </div>
</template>