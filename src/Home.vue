<template>
  <TopNavBar></TopNavBar>
  <FiltersContainer></FiltersContainer>  
  <div class="bg-slate-100 pt-8 min-h-[80vh] overflow-hidden overflow-y-auto">
    <StatusContainer></StatusContainer>
    <MapContainer></MapContainer>
  </div>
</template>

<script setup>
import TopNavBar from './components/TopNavBar.vue';
import FiltersContainer from './components/FiltersContainer.vue';
import StatusContainer from './components/StatusContainer.vue';
import MapContainer from './components/MapContainer.vue';
</script>