<template>
  <template v-if="ready">
    <Loader></Loader>
    <TopNavBar></TopNavBar>
    <FiltersContainer></FiltersContainer>  
    <div class="bg-slate-100 max-h-[77vh] overflow-hidden overflow-y-auto" :class="view=='map'?'':'pt-2'">
      <StatusContainer :key="chartCleanedData" v-if="view == 'chart'"></StatusContainer>
      <MapContainer v-show="view == 'map'"></MapContainer>
      <PartnerContainer v-if="view == 'chart'"></PartnerContainer>
    </div>
  </template>
</template>

<script setup>
import { useMainStore } from "./storage/store";
import { storeToRefs } from 'pinia';
import {onMounted, ref} from 'vue';
import TopNavBar from './components/TopNavBar.vue';
import FiltersContainer from './components/FiltersContainer.vue';
import StatusContainer from './components/StatusContainer.vue';
import MapContainer from './components/MapContainer.vue';
import PartnerContainer from './components/PartnerContainer.vue';
import Loader from "./components/Loader.vue";
const store = useMainStore();
const ready = ref(false);

onMounted(() => {
  selectedState.value[view.value] = 'Niger';
  selectedLga.value[view.value] = '' 
  selectedPrograms.value[view.value] = ['NiCare'];
  selectedPartners.value[view.value] = []; 
  selectedSupports.value[view.value] = [];

  ready.value = true;
})

const {
  selectedState, selectedPrograms, selectedLga, 
  selectedPartners, selectedSupports, chartCleanedData, view
} =  storeToRefs(store);
</script>