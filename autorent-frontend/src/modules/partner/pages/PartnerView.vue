<script setup lang="ts">
import KPIGrid from "../components/KPIGrid.vue";
import IncomeChart from "../components/IncomeChart.vue";
import CarsTable from "../components/CarsTable.vue";
import ActiveRequests from "../components/ActiveRequests.vue";

const kpi_cards = [
  {
    icon: "tabler:currency-dollar",
    title: "Доход за месяц",
    value: "10.000",
    prefix: "$",
  },
  {
    icon: "tabler:moneybag",
    title: "Общий доход",
    value: "300.000",
    prefix: "$",
  },
  {
    icon: "tabler:file",
    title: "Активные заявки",
    value: "10",
  },
  {
    icon: "tabler:car",
    title: "Машины в аренде",
    value: "10",
    prefix: "шт.",
  },
];
</script>

<template>
  <section class="section p-8">
    <h2>Панель управления</h2>

    <KPIGrid :kpi_cards="kpi_cards" />
    <div class="grid grid-cols-3 gap-4">
      <IncomeChart class="col-span-2" />
      <ActiveRequests />
    </div>
    <CarsTable />
    </section>
</template>
