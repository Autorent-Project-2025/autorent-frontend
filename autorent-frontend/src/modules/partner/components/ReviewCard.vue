<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>
<template>
    <div class="card bg-bg-light">
            <div class="flex justify-between items-center mb-2">
              <div>
                <span class="font-semibold text-lg">Алексей</span>
                <p class="text-gray-400 text-sm">12 января 2026</p>
              </div>
              <span class="text-yellow-500 inline-flex gap-1"><Icon v-for="i in 5" icon="tabler:star-filled" /></span>
            </div>
            <p>
              Машина в отличном состоянии, всё понравилось.
            </p>
          </div>
</template>