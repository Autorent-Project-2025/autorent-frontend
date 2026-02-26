import { defineStore } from "pinia";
import type { CarPreview } from "@/shared/types/Car";
import type { CarDetails } from "@/shared/types/Car";
import { cars_list } from "@/app/data/MockData";
import { mapToCarPreview, mapToCarDetails } from "@/shared/utils/carMapper";

export const useCarsStore = defineStore("cars", {
  state: () => ({
    cars: [] as CarPreview[],
    carDetails: null as CarDetails | null,
  }),

  actions: {
    loadCars() {
      this.cars = cars_list.map(mapToCarPreview);
    },

    loadCarDetails(id: number) {
      const car = cars_list.find((c) => c.id === id);
      this.carDetails = car ? mapToCarDetails(car) : null;
    },
  },
});
