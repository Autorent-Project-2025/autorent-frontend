<script setup lang="ts">
import PartnerNavbar from "./PartnerNavbar.vue";
import Sidebar from "./Sidebar.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <div class="container">
    <PartnerNavbar class="navbar" />
    <Sidebar class="sidebar" />
    <main class="main">
        <router-view v-slot="{ Component, route }">
        <Transition mode="out-in" name="fade-up">
          <component :is="Component" :key="route.path" />
        </Transition>
      </router-view>
    </main>
  </div>
</template>

<style scoped>
.container {
  min-height: 100vh;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "sidebar navbar"
    "sidebar main";
}

.main {
  grid-area: main;
}

.sidebar {
  z-index: 11;
  grid-area: sidebar;
  position: sticky;
  align-self: self-start;
  top: 0;
  height: 100vh;
}

.navbar {
  z-index: 10;
  grid-area: navbar;
  position: sticky;
  top: 0;
}
</style>
