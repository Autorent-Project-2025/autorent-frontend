<script setup lang="ts">
import NavLink from "@/shared/ui/NavLink.vue";
import { Icon } from "@iconify/vue";
import { ref } from "vue";

const sidebar_links = [
  {
    name: "Дэшборд",
    icon: "tabler:dashboard",
    link: "/partner",
  },
  {
    name: "Мои машины",
    icon: "tabler:car",
    link: "/partner/cars",
  },
  {
    name: "Брронирования",
    icon: "tabler:calendar",
    link: "/partner/bookings",
  },
  {
    name: "Доходы",
    icon: "tabler:currency-dollar",
    link: "/partner/finance",
  },
  {
    name: "Настройки",
    icon: "tabler:settings",
    link: "/partner/settings",
  },
];

const isOpen = ref(true);
</script>

<template>
  <div
    :class="[
      'sticky top-0 p-8 flex flex-col gap-6 bg-bg transition-all duration-300 overflow-hidden',
      isOpen ? 'w-75 items-start' : 'w-25 items-center',
    ]"
  >
    <div class="flex items-center justify-between w-full">
      <RouterLink v-if="isOpen" to="/">
        <span class="logo primary-text">AutoRent</span>
      </RouterLink>

      <Icon
        @click="isOpen = !isOpen"
        icon="tabler:chevrons-left"
        class="w-9 h-9 hover:bg-slate-400 rounded-full p-1 transition duration-300"
        :class="{ 'rotate-180': !isOpen }"
      />
    </div>
    <nav class="flex flex-col gap-4 items-start">
      <NavLink v-for="link in sidebar_links" :link="link.link"
        ><span class="inline-flex gap-2 items-center"
          ><Icon class="text-2xl" :icon="link.icon" /><span
            v-if="isOpen"
            class="whitespace-nowrap"
          >
            {{ link.name }}
          </span></span
        ></NavLink
      >
    </nav>
  </div>
</template>
