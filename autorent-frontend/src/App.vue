<script setup lang="ts">
import PartnerLayout from "./app/layout/PartnerLayout.vue";
import DefaultLayout from "./app/layout/DefaultLayout.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const isPartnerLayout = computed(() => route.meta.layout === "partner");
</script>

<template>
  <PartnerLayout v-if="isPartnerLayout" />
  <DefaultLayout v-else />
</template>
