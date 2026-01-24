<script setup lang="ts">
import CarsCard from "@/components/ui/CarsCard.vue";
import { useCarsStore } from "@/stores/carStore";
import type { CarDetails, CarPreview } from "@/types/Car";
import BookingModal from "@/components/modals/BookingModal.vue";
import type { BookingDraft } from "@/types/Booking";
import { mapCarToBookingDraft } from "@/utils/bookingMapper";
import { ref } from "vue";

const carsStore = useCarsStore();
carsStore.loadCars();

const isModalOpen = ref(false);
const bookingDraft = ref<BookingDraft | null>(null);

const openBooking = (car: CarPreview) => {
  bookingDraft.value = mapCarToBookingDraft(car);
  isModalOpen.value = true;
};
</script>

<template>
  <section class="section pt-25">
    <h2>Наш автопарк</h2>

    <div>
      <div class="grid grid-cols-[repeat(auto-fit,minmax(25rem,1fr))] gap-6">
        <CarsCard
          v-for="car in carsStore.cars"
          :key="car.id"
          :car="car"
          @book="openBooking"
        />
        <BookingModal
          v-model="isModalOpen"
          v-if="bookingDraft"
          :booking="bookingDraft"
        />
      </div>
    </div>
  </section>
</template>
