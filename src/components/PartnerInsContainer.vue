<template>
  <!-- <div class="container max-w-[89%] mx-auto px-0 mt-3">
    <h1 class="">PT Insight</h1>
  </div> -->

  <div v-show="view == 'ptins'" class="relative">
    <div class="min-h-[77vh] max-h-[77vh] overflow-hidden">
      <h1>P. Ins</h1>
    </div>
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