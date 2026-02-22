<script setup lang="ts">
import Navbar from "./components/layout/Navbar.vue";
import Footer from "./components/layout/Footer.vue";
import { RouterView, useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();

const isAuthLayout = computed(() => route.meta.layout === "auth");
</script>

<template>
    <Navbar v-if="!isAuthLayout" />

  <main>
    <router-view v-slot="{ Component, route }">
      <Transition mode="out-in" name="fade-up">
        <component :is="Component" :key="route.path" />
      </Transition>
    </router-view>
  </main>

  <Footer v-if="!isAuthLayout" />
</template>
