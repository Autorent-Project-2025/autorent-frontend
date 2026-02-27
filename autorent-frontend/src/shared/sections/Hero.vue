<script setup lang="ts">
import Card from "../ui/Card.vue";
import Button from "../ui/Button.vue";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";

const router = useRouter();

</script>

<template>
  <section
    class="section h-[min(100dvh,50rem)] pt-20 justify-center items-start relative bg-[url('./images/home-bg.jpg')] bg-cover bg-center bg-no-repeat"
  >
    <div
      class="absolute inset-0 bg-linear-to-r from-overlay to-overlay/10 backdrop-blur-sm lg:backdrop-blur-none"
    ></div>

    <h1 class="z-10">
      Свобода передвижения <br />
      <span class="primary-text">без лишних забот</span>
    </h1>
    <p class="z-10">
      Бесшовная, полностью цифровая аренда с проверенным автопарком
      внедорожников,<br />
      премиальных и бизнес-автомобилей. Арендуйте от 1 до 365 дней — <br />без
      хлопот, максимум комфорта.
    </p>

    <div class="flex flex-wrap shrink-0 gap-3 z-10">
      <Card
        variant="list"
        title="Гибкие условия аренды"
        icon="tabler:circle-arrow-right"
      />
      <Card variant="list" title="Полная страховка" icon="tabler:shield" />
      <Card variant="list" title="Без залога" icon="tabler:coin" />
    </div>

    <Button class="z-10" @click="router.push('/auth/register')">
      <span class="inline-flex items-center gap-2"
        >Начать поездку<Icon
          class="text-2xl"
          icon="tabler:circle-arrow-right-filled" /></span
    ></Button>
  </section>
</template>
