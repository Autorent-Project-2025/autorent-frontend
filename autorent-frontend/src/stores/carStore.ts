// stores/cars.ts
import { defineStore } from "pinia";
import type { CarPreview } from "@/types/Car";
import type { CarDetails } from "@/types/Car";
import { cars_list } from "@/data/MockData";
import { mapToCarPreview, mapToCarDetails } from "@/mappers/carMapper";

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

      const car =  cars_list.find(c => c.id === id);
      this.carDetails = car ? mapToCarDetails(car) : null;

    },
  },
});
