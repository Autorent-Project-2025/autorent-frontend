<script setup lang="ts">
import Navbar from "./Navbar.vue";
import Footer from "./Footer.vue";
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
