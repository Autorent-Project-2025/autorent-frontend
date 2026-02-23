<script setup lang="ts">
    import { computed } from "vue";

    type Type = "green" | "blue" | "red";

    const props = withDefaults(
        defineProps<{
            type: Type;
        }>(),
        {
            type: "blue",
        },
    )

    const typeVariants: Record<Type, string> = {
        green: "bg-green-500/40 text-green-800 dark:text-green-200 dark:bg-green-600/40",
        blue: "bg-blue-400/40 text-blue-800 dark:bg-blue-800/40 dark:text-blue-200",
        red: "bg-red-500",
    }

    const typeClass = computed(() => [
        "rounded-full px-3 py-1 text-sm font-semibold",
        typeVariants[props.type],
    ]  );

</script>

<template>
    <div :class="typeClass">
        <slot></slot>
    </div>
</template>