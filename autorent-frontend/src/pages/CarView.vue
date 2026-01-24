<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute, RouterLink } from "vue-router";

import Button from "@/components/ui/Button.vue";
import BookingModal from "@/components/modals/BookingModal.vue";

import { Icon } from "@iconify/vue";
import type { CarDetails } from "../types/Car";
import { useCarsStore } from "../stores/carStore";
import type { BookingDraft } from "../types/Booking";
import { mapCarToBookingDraft } from "../utils/bookingMapper";

const activeImageIndex = ref(0);
const route = useRoute();
const carsStore = useCarsStore();

const setActiveImage = (index: number) => {
  activeImageIndex.value = index;
};

const featureSchema = [
  { key: "bodyType", title: "Тип", icon: "tabler:car", suffix: "" },
  { key: "engine", title: "Двигатель", icon: "tabler:engine", suffix: "" },
  { key: "seats", title: "Мест", icon: "tabler:user", suffix: "" },
  { key: "fuelType", title: "Топливо", icon: "tabler:gas-station", suffix: "" },  
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

const bookingDraft = ref<BookingDraft | null>(null);
const isModalOpen = ref(false);
const openBooking = () => {
  if (!car.value) return;
  bookingDraft.value = mapCarToBookingDraft(car.value);
  isModalOpen.value = true;
};

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
    <BookingModal
      v-model="isModalOpen"
      v-if="bookingDraft"
      :booking="bookingDraft"
    />

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

      <div class="title">
        <h2>{{ car.brand }} {{ car.model }}</h2>
      <p>{{  car.year }} года выпуска</p>
      </div>
      <span class="card shadow-(--shadow-s-in)"
        ><span class="price font-bold text-4xl text-primary"
          >{{ car.priceHour }}$</span
        >
        / час или {{ car.priceDay }}$ / день</span
      >

      <div class="card shadow-(--shadow-s-in) features">
        <h3 class="mb-3">Характеристики</h3>
        <ul class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <li
            v-for="specification in specifications"
            :key="specification.title"
            class="flex items-center gap-2"
          >
            <Icon
              :icon="specification.icon"
              class="text-primary bg-bg-light w-10 h-10 rounded-xl p-2 hidden md:block"
            />
            <span class="w-full flex flex-row justify-between md:flex-col">
              <span>{{ specification.title }}</span>
              <span class="font-medium">{{ specification.value }}</span>
            </span>
          </li>
        </ul>
      </div>

      <Button class="button" @click="openBooking"
        ><span class="grid items-center w-90">
          <span class="col-[1/2] row-[1/2]">Забронировать автомобиль</span>
          <Icon
            class="opacity-0 transition duration-200 -translate-x-10 col-[1/2] row-[1/2] justify-self-end text-2xl group-hover/button:opacity-100 group-hover/button:translate-x-0"
            icon="tabler:arrow-right"
          /> </span
      ></Button>

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
