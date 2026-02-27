<script setup lang="ts">
import Button from "@/shared/ui/Button.vue";
import NavLink from "@/shared/ui/NavLink.vue";
import ToggleButton from "@/shared/ui/ToggleButton.vue";
import { auth } from "@/modules/auth/stores/auth";
import { useRouter } from "vue-router";
import { ref, computed, onMounted, onUnmounted } from "vue";
import { Icon } from "@iconify/vue";
import { useBodyLock } from "@/shared/composables/useBodyLock";

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

const router = useRouter();
const isAuthenticated = computed(() => {
  // Проверяем валидность токена
  if (auth.token) {
    return auth.checkTokenValidity();
  }
  return false;
});
const scrolled = ref(false);

function logout() {
  auth.logout();
  router.push("/login");
}

// Track scroll position
const handleScroll = () => {
  scrolled.value = window.scrollY > 20;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);

  // Проверяем токен при монтировании компонента
  auth.checkTokenValidity();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <header
    class="z-99 flex items-center justify-between px-[5%] py-4 bg-bg/60 backdrop-blur-md"
  >
    <div class="flex gap-8 items-center">
      <span class="logo primary-text">AutoRent</span>
      <nav class="items-center gap-8 hidden lg:flex">
        <NavLink
          v-for="link in nav_links"
          :link="link.link"
        >{{ link.name }}</NavLink>
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
              :link="link.link"
              variant="mobile"
              >{{ link.name }}</NavLink
            >
          </nav>
        </Transition>
      </Teleport>
    </div>

    <div class="flex gap-4 items-center">
      <ToggleButton />
      <Button v-if="!isAuthenticated" @click="router.push('/auth/login')"
        ><span class="grid place-items-center w-full"
          ><span
            class="col-[1/2] row-[1/2] transition-opacity duration-200 hidden md:inline md:group-hover/button:opacity-0"
            >Войти</span
          ><Icon
            class="col-[1/2] row-[1/2] text-2xl transition-opacity opacity-100 md:opacity-0 duration-300 md:group-hover/button:opacity-100"
            icon="tabler:login-2" /></span
      ></Button>
      <Button v-else variant="text" @click="logout"
        ><span class="grid place-items-center w-full"
          ><span
            class="col-[1/2] row-[1/2] transition-opacity duration-200 hidden md:inline md:group-hover/button:opacity-0"
            >Выйти</span
          ><Icon
            class="col-[1/2] row-[1/2] text-2xl transition-opacity opacity-100 md:opacity-0 duration-300 md:group-hover/button:opacity-100"
            icon="tabler:login-2" /></span
      ></Button>

      <button class="w-6 cursor-pointer lg:hidden" @click="isOpen = !isOpen">
        <span
          v-for="i in 3"
          :key="i"
          :class="[barClass, getBarClass(i)]"
        ></span>
      </button>
    </div>
  </header>
</template>
