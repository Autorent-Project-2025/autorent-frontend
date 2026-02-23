<script setup lang="ts">
import Sidebar from "./Sidebar.vue";
import Footer from "./Footer.vue";
import { RouterView } from "vue-router";

</script>

<template>
  <Sidebar />
  <main>
    <router-view v-slot="{ Component, route }">
      <Transition mode="out-in" name="fade-up">
        <component :is="Component" :key="route.path" />
      </Transition>
    </router-view>
  </main>
  <Footer />
</template>
