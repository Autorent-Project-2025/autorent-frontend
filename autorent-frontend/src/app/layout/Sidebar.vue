<script setup lang="ts">
import NavLink from "@/shared/ui/NavLink.vue";
import { Icon } from "@iconify/vue";
import { ref } from "vue";

const sidebar_links = [
  {
    name: "Главная",
    icon: "tabler:layout-dashboard",
    link: "/partner",
  },
  {
    name: "Мои машины",
    icon: "tabler:car",
    link: "/partner-cars",
  },
  {
    name: "Заявки",
    icon: "tabler:package",
    link: "/partner-requests",
  },
  {
    name: "Доходы",
    icon: "tabler:currency-dollar",
    link: "/partner-finance",
  },
  {
    name: "Настройки",
    icon: "tabler:settings",
    link: "/partner-settings",
  },
  {
    name: "Профиль",
    icon: "tabler:user",
    link: "/partner-profile",
  },
  {
    name: "Выход",
    icon: "tabler:logout",
    link: "/logout",
  },
];

const isOpen = ref(true);
</script>

<template>
  <div
    :class="[
      'py-4 bg-bg shadow-(--shadow-m) transition-all duration-300 whitespace-nowrap overflow-hidden',
      isOpen ? 'w-72 px-6' : 'w-16 px-2',
    ]"
  >
    <RouterLink
      to="/"
      :class="[
        'transition duration-300',
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
      ]"
    >
      <span class="logo primary-text inline-block mb-5">AutoRent</span>
    </RouterLink>

    <Icon
      @click="isOpen = !isOpen"
      icon="tabler:chevrons-left"
      :class="['absolute top-5 right-6 w-9 h-9 hover:bg-primary/40 rounded-full p-1 transition duration-300', 
        isOpen ? '' : 'rotate-180 translate-x-2'
      ]"
      
    />
      <nav class="flex flex-col gap-2">
      <NavLink
        v-for="link in sidebar_links"
        :link="link.link"
        variant="sidebar"
      >
        <Icon class="w-6 h-6 shrink-0" :icon="link.icon" /><span
          :class="[
            'transition duration-300', isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',]"
        >
          {{ link.name }}
        </span></NavLink
      >
    </nav>
  </div>
</template>
