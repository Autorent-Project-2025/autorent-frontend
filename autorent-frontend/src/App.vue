<script setup lang="ts">
import PartnerLayout from "./app/layout/PartnerLayout.vue";
import DefaultLayout from "./app/layout/DefaultLayout.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const layoutComponent = computed(() => {
  return route.meta.layout === "partner"
    ? PartnerLayout
    : DefaultLayout;
});
</script>

<template>
  <component :is="layoutComponent" />
</template>
