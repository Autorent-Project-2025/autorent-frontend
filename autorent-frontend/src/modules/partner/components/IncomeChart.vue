<script setup lang="ts">
import { ref, computed } from "vue";
import { useTheme } from "@/shared/composables/useTheme";

const { isDark } = useTheme();

const series = ref([
  {
    name: "Доход",
    data: [12000, 18000, 15000, 22000, 19000, 25000, 21000],
  },
]);

const chartOptions = computed(() => ({
  chart: {
    type: "area",
    toolbar: { show: false },
    foreColor: isDark.value ? "#E5E7EB" : "#374151",
  },

  stroke: {
    curve: "smooth",
    width: 3,
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
  },
  tooltip: {
    theme: isDark.value ? "dark" : "light",
    y: {
      formatter: (val: number) => `${val.toLocaleString()} ₸`,
    },
  },
  colors: [isDark.value ? "#818CF8" : "#6366F1"],
}));
</script>

<template>
  <div class="card shadow-(--shadow-s-in) overflow-hidden">
    <h3>Доход за неделю</h3>

    <apexchart
      type="area"
      height="300"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>
