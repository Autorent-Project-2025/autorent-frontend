<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useCarsStore } from "@/app/stores/carStore";
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import KPIGrid from "../components/KPIGrid.vue";
import IncomeChart from "../components/IncomeChart.vue";
import ReviewList from "../components/ReviewList.vue";
import CarDetailCard from "../components/CarDetailCard.vue";

const kpi_cards = [
  {
    icon: "tabler:moneybag",
    title: "Доход за месяц",
    value: "10.000",
    prefix: "$",
  },
  {
    icon: "tabler:car",
    title: "Количество аренд",
    value: "56",
  },
  {
    icon: "tabler:currency-dollar",
    title: "Средний чек",
    value: "120",
    prefix: "$",
  },
  {
    icon: "tabler:star-filled",
    title: "Средняя оценка",
    value: "4.5",
  },
];

const route = useRoute();
const carsStore = useCarsStore();
const car = computed(() => carsStore.carDetails);

onMounted(() => {
  carsStore.loadCarDetails(Number(route.params.id));
});
</script>
<template>
  <section class="section p-8">
    <RouterLink to="/partner-cars">
      <span
        class="w-fit flex items-center gap-2 text-2xl text-text-muted transition duration-300 hover:text-text hover:-translate-x-2 hover:font-medium"
        ><Icon icon="tabler:arrow-left" />Автомобили</span
      >
    </RouterLink>
    <CarDetailCard v-if="car" :car="car" />
    <KPIGrid :kpi_cards="kpi_cards" />
    <IncomeChart />
    <ReviewList />
  </section>
</template>
