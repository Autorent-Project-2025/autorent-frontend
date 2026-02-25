<script setup lang="ts">
import KPIGrid from "../components/KPIGrid.vue";
import IncomeChart from "../components/IncomeChart.vue";
import CarsTable from "../components/CarsTable.vue";
import ActiveRequests from "../components/ActiveRequests.vue";
</script>

<template>
  <section class="section p-8">
    <h2>Панель управления</h2>

    <KPIGrid />
    <div class="grid grid-cols-3 gap-4">
      <IncomeChart class="col-span-2" />
      <ActiveRequests />
    </div>
    <CarsTable />
  </section>
</template>
