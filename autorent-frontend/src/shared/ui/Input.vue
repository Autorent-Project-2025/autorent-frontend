<script setup lang="ts">
import { Icon } from "@iconify/vue";

defineProps<{
  label?: string;
  icon?: string;
  placeholder: string;
  type: string;
}>();
</script>

<template>
  <div class="flex flex-col gap-2">
    <label v-if="label" class="font-medium">{{ label }}</label>
    <span class="grid items-center text-text">
      <input
        class="peer row-[1/2] col-[1/2] w-full pl-10 pr-4 py-2 rounded-2xl bg-bg-light border-2 border-border"
        :type="type"
        :placeholder="placeholder"
        required
      />
      <Icon v-if="icon"
        :icon="icon"
        class="row-[1/2] col-[1/2] ml-2 text-2xl z-1 transition-colors duration-200 peer-focus:text-primary peer-[:not(:placeholder-shown)]:text-primary"
      />
    </span>
  </div>
</template>
