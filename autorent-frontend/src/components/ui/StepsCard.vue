<script setup lang="ts">
import { computed } from "vue";

type Variant = "left" | "right";

const props = withDefaults(
  defineProps<{
    title: string;
    text: string;
    variant?: Variant;
    order: number;
  }>(),
  {
    variant: "left",
  }
)

const containerClass = computed(() => [
  "card flex gap-4 items-center",
  props.variant === "left" ? "" : "text-right flex-row-reverse",
]);
</script>

<template>
  <div :class="containerClass">
    <span class="primary-text font-bold text-6xl">
      {{ order }}
    </span>
    <div>
      <h3>{{ title }}</h3>
    <p>{{ text }}</p>
    </div>
  </div>
</template>
