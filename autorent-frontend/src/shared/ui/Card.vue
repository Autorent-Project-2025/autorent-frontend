<script setup lang="ts">
import { computed } from "vue";
import { Icon } from "@iconify/vue";

type Variant = "list" | "list-reverse" | "card";

const props = withDefaults(
  defineProps<{
    title?: string;
    description?: string;
    icon: string;
    variant?: Variant;
  }>(),
  {
    variant: "list",
  },
)

const containerClasses = computed(() => [
  "flex gap-2",
  props.variant === "card"
    ? "flex-col card"
    : [
        "items-center",
        props.variant === "list-reverse" ? "flex-row-reverse" : "flex-row",
      ],
]);

const iconClasses = computed(() => [
  "text-primary",
  props.variant === "card" ?
    "text-4xl"
    : "w-8 h-8 p-1 rounded-full bg-bg-light/40 shadow-(--shadow-s)",
]);
</script>

<template>
  <div :class="containerClasses">
    <Icon :icon="icon" :class="iconClasses" />
    <h3 v-if="title">
      {{ title }}
    </h3>
    <p v-if="description">
      {{ description }}
    </p>
  </div>
</template>
