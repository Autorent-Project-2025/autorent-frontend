<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref, computed, onMounted } from "vue";
import Button from "@/components/ui/Button.vue";
import { useRoute, RouterLink } from "vue-router";
import type { CarDetails } from "../types/Car";
import { useCarsStore } from "../stores/carStore";

const activeImageIndex = ref(0);
const route = useRoute();
const carsStore = useCarsStore();

const setActiveImage = (index: number) => {
  activeImageIndex.value = index;
};

const featureSchema = [
  { key: "bodyType", title: "Тип", icon: "tabler:car", suffix: "" },
  { key: "engine", title: "Двигатель", icon: "tabler:engine", suffix: " л." },
  { key: "seats", title: "Мест", icon: "tabler:user", suffix: "" },
  { key: "fuelType", title: "Топливо", icon: "tabler:gas-station", suffix: "" },
  { key: "year", title: "Год", icon: "tabler:calendar", suffix: " г." },
  {
    key: "transmission",
    title: "Трансмиссия",
    icon: "tabler:settings",
    suffix: "",
  },
  { key: "color", title: "Цвет", icon: "tabler:palette", suffix: "" },
  { key: "mileage", title: "Пробег", icon: "tabler:road", suffix: " км." },
];

const specifications = computed(() => {
  const car = carsStore.carDetails as CarDetails;
  return featureSchema.map((item) => ({
    title: item.title,
    icon: item.icon,
    value:
      (car.specifications?.[item.key as keyof typeof car.specifications] ||
        "—") + item.suffix,
  }));
});
const car = computed(() => carsStore.carDetails);

onMounted(() => {
  carsStore.loadCarDetails(Number(route.params.id));
});
</script>
<template>
  <section class="section pt-25">
    <RouterLink to="/cars">
      <span
        class="w-fit flex items-center gap-2 text-2xl text-text-muted transition duration-300 hover:text-text hover:-translate-x-2 hover:font-medium"
        ><Icon icon="tabler:arrow-left" />Автомобили</span
      >
    </RouterLink>

    <div v-if="car" class="container">
      <div class="image">
        <img
          :key="activeImageIndex"
          :src="car.images?.[activeImageIndex]"
          :alt="car.brand"
          class="photo animate-fade"
        />
      </div>

      <div class="grid grid-cols-4 items-center gap-3 thumbs">
        <img
          loading="lazy"
          v-for="(image, index) in car.images"
          :key="index"
          :src="image"
          :alt="car.brand"
          :class="[
            'photo cursor-pointer transition-all duration-300',
            activeImageIndex === index
              ? 'ring-2 ring-blue-500 opacity-100 scale-105 shadow-(--shadow-l)'
              : 'opacity-60 hover:opacity-100 hover:scale-105',
          ]"
          @click="setActiveImage(index)"
        />
      </div>

      <h2 class="title">{{ car.brand }} {{ car.model }}</h2>
      <span class="card shadow-(--shadow-s-in)"
        ><span class="price font-bold text-4xl text-primary"
          >{{ car.priceHour }}$</span
        > / час или {{ car.priceDay }}$ / день</span
      >

      <div class="card shadow-(--shadow-s-in) features">
        <h3 class="mb-3">Характеристики</h3>
        <ul class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <li
            v-for="specification in specifications"
            :key="specification.title"
            class="flex items-center gap-2"
          >
            <Icon :icon="specification.icon" class="text-primary bg-bg-light w-10 h-10 rounded-xl p-2 hidden md:block" />
            <span class="w-full flex flex-row justify-between md:flex-col">
              <span class="font-medium">{{ specification.title }}</span>
              <span>{{ specification.value }}</span>
            </span>
          </li>
        </ul>
      </div>

      <Button class="button">Забронировать автомобиль</Button>

      <div class="card shadow-(--shadow-s-in) description">
        <h3 class="mb-3">Описание</h3>
        <p>{{ car.description }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.container {
  display: grid;
  grid-auto-columns: 1fr;
  gap: 1.25rem;
  grid-template-areas:
    "title"
    "image"
    "thumbs"
    "price"
    "features"
    "button"
    "description";
}

.image {
  grid-area: image;
}

.thumbs {
  grid-area: thumbs;
}

.title {
  grid-area: title;
}

.price {
  grid-area: price;
}

.features {
  grid-area: features;
}

.button {
  grid-area: button;
}

.description {
  grid-area: description;
}

@media (width >= 80rem) {
  .container {
    grid-template-rows: auto auto 1fr auto auto auto;
    grid-template-areas:
      "image title"
      "image price"
      "image features"
      "thumbs features"
      "thumbs button"
      "description description";
  }
}
</style>
