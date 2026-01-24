<script setup lang="ts">
import Button from "../ui/Button.vue";
import { Icon } from "@iconify/vue";
import type { CarPreview } from "@/types/Car";
import Features from "./Features.vue";

const props = defineProps<{ car: CarPreview }>();
const emit = defineEmits<{ (e: "book", car: CarPreview): void; }>(); 
const bookCar = () => { emit("book", props.car); };
</script>

<template>
  <div
    @click="$router.push(`/cars/${car.id}`)"
    class="card card-hover p-0 relative group cursor-pointer max-w-xl"
  >
    <div class="overflow-hidden rounded-t-2xl grid">
      <img
        :src="car.imageUrl"
        :alt="car.brand"
        class="col-[1/2] row-[1/2] w-full aspect-video object-cover transition-transform duration-500 ease-out md:group-hover:scale-110"
      />

      <div
        class="col-[1/2] row-[1/2] z-1 grid justify-items-center items-end p-4 inset-0 bg-linear-to-t from-black/80 to-black/10 transition-opacity duration-500 opacity-0 md:group-hover:opacity-100"
      >
        <span
          class="col-span-full row-span-full text-neutral-50 text-xl font-medium"
          >Подробнее</span
        >
      </div>
    </div>

    <div
      class="absolute top-4 left-4 right-4 flex justify-between items-center"
    >
      <span class="overlay-text flex items-center gap-1 text-xl font-bold"
        ><Icon icon="tabler:star-filled" class="text-amber-300" />{{
          car.rating
        }}</span
      >

      <span class="overlay-text">
        <span class="font-bold text-2xl">{{ car.priceHour }}$</span> /час
      </span>
    </div>

    <div class="grid gap-5 p-6 z-10">
      <span class="flex flex-col gap-2">
        <h3
          class="md:transition-colors md:duration-500 md:group-hover:text-primary"
        >
          {{ car.brand }} {{ car.model }}
        </h3>
        <p>{{ car.year }} года выпуска</p>
      </span>

      <div class="flex gap-3">
        <Features type="blue">
          <span class="">{{ car.category }}</span>
        </Features>

        <Features type="green">
          <span class="">Доступен</span>
        </Features>
      </div>

      <Button @click.stop="bookCar"
        ><span class="grid items-center w-60">
          <span class="col-[1/2] row-[1/2]">Забронировать</span>
          <Icon
            class="opacity-0 transition duration-200 -translate-x-10 col-[1/2] row-[1/2] justify-self-end text-2xl group-hover/button:opacity-100 group-hover/button:translate-x-0"
            icon="tabler:arrow-right"
          /> </span
      ></Button>
    </div>
  </div>
</template>
