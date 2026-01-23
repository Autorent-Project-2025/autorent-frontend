<script setup lang="ts">
import Navbar from "./components/layout/Navbar.vue";
import Footer from "./components/layout/Footer.vue";
import { RouterView } from "vue-router";
import BookingModal from "./components/modals/BookingModal.vue";
</script>

<template>
  <Navbar />
  <BookingModal :model-value="true" />
  <main>
    <router-view v-slot="{ Component, route }">
      <Transition mode="out-in" name="fade-up">
        <component :is="Component" :key="route.path" />
      </Transition>
    </router-view>
  </main>

  <Footer />
</template>
