<script setup lang="ts">
import Card from "@/shared/ui/Card.vue";
import StepsCard from "@/shared/ui/StepsCard.vue";
import { ref, computed } from "vue";
import Button from "@/shared/ui/Button.vue";

const stepsPairs = [
  {
    index: 1,
    left: {
      title: "Регистрация",
      text: "Создайте аккаунт на сайте за несколько минут.",
    },
    right: {
      title: "Установка приложения",
      text: "Скачайте приложение и быстро зарегистрируйтесь.",
    },
  },
  {
    index: 2,
    left: {
      title: "Выбор автомобиля",
      text: "Подберите автомобиль из доступных вариантов.",
    },
    right: {
      title: "Поиск автомобиля",
      text: "Найдите свободный автомобиль рядом с вами на карте.",
    },
  },
  {
    index: 3,
    left: {
      title: "Онлайн-бронирование",
      text: "Забронируйте автомобиль и оплатите аренду онлайн.",
    },
    right: {
      title: "Бронирование в один клик",
      text: "Забронируйте автомобиль прямо в приложении.",
    },
  },
  {
    index: 4,
    left: {
      title: "Начало поездки",
      text: "Заберите автомобиль и отправляйтесь в путь.",
    },
    right: {
      title: "Начало поездки",
      text: "Откройте автомобиль и начните поездку.",
    },
  },
];

const activeMode = ref("site"); // site | app
const direction = ref("left");

function switchMode(mode: string) {
  if (mode === activeMode.value) return;

  direction.value = mode === "site" ? "left" : "right";
  activeMode.value = mode;
}

const enterFrom = computed(() =>
  direction.value === "left"
    ? "translate-x-4 opacity-0"
    : "-translate-x-4 opacity-0",
);

const leaveTo = computed(() =>
  direction.value === "left"
    ? "-translate-x-4 opacity-0"
    : "translate-x-4 opacity-0",
);

const mobileSteps = computed(() =>
  stepsPairs.map((step) => ({
    index: step.index,
    ...(activeMode.value === "site" ? step.left : step.right),
  })),
);

const gridLayoutStyles = computed(() => {
  const stepsCount = stepsPairs?.length || 0;

  return {
    gridTemplateRows: `auto repeat(${stepsCount}, 1fr)`,
    gridAutoFlow: "column",
  };
});
</script>

<template>
  <section class="section">
    <h2 class="text-center">Как это работает</h2>

    <!-- MOBILE: переключатель -->
    <div class="relative grid grid-cols-2 gap-4 md:hidden">
      <Button
        variant="text"
        :active="activeMode === 'site'"
        @click="switchMode('site')"
      >
        Через сайт
      </Button>

      <Button
        variant="text"
        :active="activeMode === 'app'"
        @click="switchMode('app')"
      >
        Через приложение
      </Button>
    </div>

    <!-- MOBILE: шаги -->
    <Transition
      mode="out-in"
      name="slide"
      :enter-from-class="enterFrom"
      :leave-to-class="leaveTo"
    >
      <div :key="activeMode" class="md:hidden grid gap-4">
        <StepsCard
          v-for="step in mobileSteps"
          :key="step.index"
          v-bind="step"
          :order="step.index"
        />
      </div>
    </Transition>

    <!-- DESKTOP: шаги -->
    <div class="hidden md:grid gap-4" :style="gridLayoutStyles">
      <Card
        variant="list"
        title="Через сайт"
        icon="tabler:device-desktop"
      />

      <StepsCard
        variant="left"
        v-for="step in stepsPairs"
        v-bind="step.left"
        :order="step.index"
      />

      <Card
        variant="list-reverse"
        title="Через приложение"
        icon="tabler:device-mobile"
      />
      <StepsCard
        variant="right"
        v-for="step in stepsPairs"
        v-bind="step.right"
        :order="step.index"
      />
    </div>
  </section>
</template>
