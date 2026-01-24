<script setup lang="ts">
import { Icon } from "@iconify/vue";

defineProps<{
  label: string;
  icon?: string;
  placeholder: string;
  type: string;
}>();
</script>

<template>
  <div class="flex flex-col gap-2">
    <label class="font-medium">{{ label }}</label>
    <span class="grid items-center text-text">
      <input
        class="peer row-[1/2] col-[1/2] w-full px-6 py-3 rounded-2xl shadow-(--shadow-s-in) bg-bg-light border border-border"
        :type="type"
        :placeholder="placeholder"
        required
      />
      <Icon v-if="icon"
        :icon="icon"
        class="row-[1/2] col-[1/2] mx-4 text-2xl z-1 justify-self-end transition-colors duration-200 peer-focus:text-primary peer-[:not(:placeholder-shown)]:text-primary"
      />
    </span>
  </div>
</template>
