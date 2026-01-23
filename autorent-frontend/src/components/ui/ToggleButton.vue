<script setup lang="ts">
import { useTheme } from "@/composables/useTheme";
import { Icon } from "@iconify/vue";
import { computed } from "vue";

const { isDark, toggle } = useTheme();

const iconClass = computed(() => [
  "w-8 h-8 p-1 bg-white rounded-full shadow-(--shadow-s) transition-transform duration-300",
  isDark.value ? "translate-x-8 text-primary" : "translate-x-0 text-amber-500",
])
</script>

<template>
  <button
    @click="toggle()"
    class="cursor-pointer hover:bg-blue-600/50 transition-colors w-18 rounded-full bg-blue-500/50 p-1 shadow-(--shadow-s-in)"
    aria-label="Toggle theme"
  >
    <Icon :icon="isDark ? 'tabler:moon' : 'tabler:sun'" :class="iconClass" />
  </button>
</template>
