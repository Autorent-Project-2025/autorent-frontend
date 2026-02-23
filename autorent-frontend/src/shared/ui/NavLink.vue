<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";
import { computed } from "vue";

type Variant = "desktop" | "mobile";

const props = withDefaults(
  defineProps<{
    link: string;
    variant?: Variant;
  }>(),
  {
    variant: "desktop",
  },
);
const route = useRoute();

const isActive = computed(() => {
  // Точное совпадение (для Главной)
  if (route.path === props.link) return true;
  // Совпадение для подкатегорий (для /cars и /cars/1)
  if (props.link !== "/" && route.path.startsWith(props.link)) return true;

  return false;
});

const variantClasses: Record<Variant, string> = {
  desktop: "relative after:absolute after:content-[''] after:-bottom-0.5 after:left-0 after:w-full after:scale-x-0 after:h-0.5 after:bg-primary after:origin-right after:transition after:duration-300 hover:text-primary hover:after:scale-x-100 hover:after:origin-left",

  
  mobile: "hover:bg-bg/60 px-5 py-2 rounded-xl",
}

const linkClass = computed(() => [
  "transition duration-200 font-medium",
  isActive.value ? "text-primary" : "text-text",
  variantClasses[props.variant],
]);
</script>

<template>
  <RouterLink :to="link" :class="linkClass"><slot/></RouterLink>
</template>
