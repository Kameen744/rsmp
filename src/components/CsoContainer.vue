<template>
  <div class="container max-w-[89%] mx-auto px-0 mt-3" ref="chartMainContainerCSORef">
    <!-- <div class="bg-white p-4 mb-3" v-for="spt in chartDataKeys"> -->
      <!-- <h3 class="text-lg pb-3 font-bold">{{ spt }}</h3> -->
      <!-- :options="store.getChartJsOptions(mapData[view]['data'][spt]['lgas_supported'])" -->
      <!-- <PartnerChart 
        v-if="mapData[view]['data'][spt] && mapData[view]['data'][spt]" 
        :chart-data="store.createChartData(mapData[view]['data'][spt])" 
        :options="store.getChartJsOptions(mapData[view]['data'][spt]['lgas_supported'])">
      </PartnerChart> -->
    <!-- </div> -->
  </div>
</template>

<script setup>
import { useMainStore } from "./../storage/store";
import { storeToRefs } from 'pinia';
import PartnerChart from "./PartnerChart.vue";
const store = useMainStore();

const {
  createChartData, getChartJsOptions, chartDataKeys,
  chartMainContainerRef, mapData, view, cso
} =  storeToRefs(store);
</script>

<style scoped>
</style>