<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";
import { computed } from "vue";

type Variant = "navbar" | "sidebar" | "mobile";

const props = withDefaults(
  defineProps<{
    link: string;
    variant?: Variant;
  }>(),
  {
    variant: "navbar",
  },
);
const route = useRoute();

const isActive = computed(() => {
  // Точное совпадение (для Главной)
  if (route.path === props.link) return true;
  // Совпадение для подкатегорий (для /cars и /cars/1)
  if (props.link !== "/" && route.path.startsWith(props.link + "/")) return true;
  return false;
});

const variantClasses: Record<Variant, string> = {
  navbar:
    "relative after:absolute after:content-[''] after:-bottom-0.5 after:left-0 after:w-full after:scale-x-0 after:h-0.5 after:bg-primary after:origin-right after:transition after:duration-300 hover:text-primary hover:after:scale-x-100 hover:after:origin-left",

  sidebar: "p-3 rounded-xl hover:bg-primary/30",

  mobile: "px-5 py-2 rounded-xl hover:bg-primary/30",
};

const linkClass = computed(() => [
  "flex gap-4 items-center transition-all duration-200 font-medium",
  variantClasses[props.variant],
  props.variant === "navbar"
    ? isActive.value
      ? "text-primary after:scale-x-100"
      : "text-text"
    : "",
  props.variant === "sidebar" ? (isActive.value ? "bg-primary/20" : "text-text") : "",
  props.variant === "mobile" ? (isActive.value ? "text-primary" : "text-text") : "",
]);
</script>

<template>
  <RouterLink :to="link" :class="linkClass"><slot /></RouterLink>
</template>
