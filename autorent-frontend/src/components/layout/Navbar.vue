<script setup lang="ts">
import Button from "../ui/Button.vue";
import NavLink from "../ui/NavLink.vue";
import ToggleButton from "../ui/ToggleButton.vue";
import { ref, computed, watch } from "vue";
import { Icon } from "@iconify/vue";
import { useModal } from "@/composables/useModal";
import AuthModal from "../modals/AuthModal.vue";
import { useBodyLock } from "@/composables/useBodyLock";

const nav_links = [
  {
    name: "Главная",
    link: "/",
  },
  {
    name: "Автомобили",
    link: "/cars",
  },
  {
    name: "Мои бронирования",
    link: "/bookings",
  },
];

const isOpen = ref(false);
const authModal = useModal();

const openLogin = () => {
  authModal.open();
};

const barClass = computed(() => [
  "block w-full h-0.75 my-1 rounded-full transition-all duration-300 ease-in-out origin-center",
  isOpen.value ? "bg-primary" : " bg-text",
]);

const getBarClass = (index: number) => {
  if (isOpen.value) {
    if (index === 1) return "rotate-45 translate-y-1.75"; // Верхняя линия
    if (index === 2) return "opacity-0 translate-x-1"; // Средняя (исчезает)ижняя линия
    if (index === 3) return "-rotate-45 -translate-y-1.75"; // Нижняя линия
  }
};

useBodyLock(isOpen);
</script>

<template>
  <header
    class="fixed z-99 top-0 left-0 right-0 flex items-center justify-between px-[5%] py-4 bg-bg/60 backdrop-blur-md"
  >
    <AuthModal v-model="authModal.isOpen.value" initial-mode="login" />
    <div class="flex gap-8 items-center">
      <span class="logo primary-text">AutoRent</span>
      <nav class="items-center gap-8 hidden lg:flex">
        <NavLink
          v-for="link in nav_links"
          :text="link.name"
          :link="link.link"
        />
      </nav>

      <!-- Mobile nav -->
      <Teleport to="#app">
        <Transition name="fade-down">
          <div
            v-if="isOpen"
            @click="isOpen = false"
            class="fixed inset-0 bg-black/40 z-90"
          ></div>
        </Transition>

        <Transition name="fade-down">
          <nav
            v-if="isOpen"
            class="fixed z-99 right-[5%] top-24 flex flex-col gap-4 items-end p-8 bg-bg/60 backdrop-blur-md rounded-xl lg:hidden"
          >
            <NavLink
              @click="isOpen = false"
              v-for="link in nav_links"
              :text="link.name"
              :link="link.link"
              variant="mobile"
            />
          </nav>
        </Transition>
      </Teleport>
    </div>

    <div class="flex gap-4 items-center">
      <ToggleButton />
      <Button @click="openLogin"
        ><span class="grid place-items-center w-full"
          ><span class="col-[1/2] row-[1/2] transition-opacity duration-200 hidden md:inline md:group-hover/button:opacity-0">Войти</span
          ><Icon class="col-[1/2] row-[1/2] text-2xl transition-opacity opacity-100 md:opacity-0 duration-300 
          md:group-hover/button:opacity-100" icon="tabler:login-2" /></span
      ></Button>

      <button class="w-6 cursor-pointer lg:hidden " @click="isOpen = !isOpen">
        <span
          v-for="i in 3"
          :key="i"
          :class="[barClass, getBarClass(i)]"
        ></span>
      </button>
    </div>
  </header>
</template>
