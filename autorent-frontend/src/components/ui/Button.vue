<script setup lang="ts">
import { computed } from "vue";

type Variant = "primary" | "secondary" | "outline" | "text" | "underline" | "disabled";
const props = withDefaults(
  defineProps<{
    href?: string;
    variant?: Variant;
    active?: boolean;
  }>(),
  {
    variant: "primary",
  }
)

const emit = defineEmits<{
  (e: "update:active", value: boolean): void;
}>();

const onClick = () => {
  if (props.variant === "text") {
    emit("update:active", true);
  }
};

const variantClasses: Record<Variant, string> = {
  primary:
    "px-6 py-3 font-semibold rounded-2xl text-white bg-linear-to-b from-blue-500 to-blue-600 shadow-(--shadow-s) hover:from-blue-700 hover:to-blue-800 hover:shadow-(--glow-l) active:bg-blue-900",
  secondary:
    "px-6 py-3 font-semibold rounded-2xl text-neutral-100 bg-gray-500 shadow-(--shadow-s) hover:bg-gray-600 active:bg-gray-800",
  disabled:
    "px-6 py-3 font-semibold rounded-2xl text-white bg-slate-500 shadow-(--shadow-s) hover:bg-slate-600 hover:shadow-(--shadow-m) active:bg-slate-800",
  outline:
    "px-6 py-3 font-semibold rounded-2xl border-3 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white hover:shadow-(--glow-l) active:border-blue-900 active:bg-blue-900",
  text: "hover:text-primary",
  underline: "border-b-1 border-transparent hover:text-primary hover:border-primary text-[1rem] font-normal",
};

const buttonClass = computed(() => [
  "cursor-pointer transition duration-300 flex items-center justify-center group/button",
  variantClasses[props.variant],
  props.variant === "text" ? (props.active ? "text-primary" : "text-text") : "",
]);
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :class="buttonClass"
    :type="href ? undefined : 'button'"
    @click="onClick"
    :href="href"
    class=""
  >
    <slot />
  </component>
</template>
