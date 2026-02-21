<script setup lang="ts">
import Button from '../ui/Button.vue';

const emit = defineEmits<{(e: "select-role", role: "client" | "partner"): void}>();
const select = (role : "client" | "partner") => emit("select-role", role);
</script>

<template>
    <div>
        
    </div>
</template>