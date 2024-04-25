<template>
  <div class="" >
    <div ref="mapContainerRef" class=" min-h-[77vh] flex justify-between">
    </div>
    
  </div>
  <MarkerPopup v-if="selectedLgaMarker || selectedMarker"></MarkerPopup>
</template>

<script setup>
import { useMainStore } from "./../storage/store";
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import MarkerPopup from './MarkerPopup.vue'

const store = useMainStore();
const {
  mapContainerRef, mapData, states, lgas,
  partners, programAreas, supportTypes,
  selectedLgaMarker, selectedMarker
} =  storeToRefs(store);

onMounted(async () => {
  // await store.fetchMapData();
  // console.log(mapData.value);
  await store.launchAapp();
  await store.loadGeoData();
  store.createMap();
  store.createDataPoints();
});
</script>

<style scoped>
  .map-container {
    width: 100%;
    height: 100%;
    z-index: 10000;
    background: red;
  }
  .facilities-marker div {
    position: absolute;
    top: 40%;
    left: 5%;
    border-radius: 50%;
    width: 8px;
    height: 8px;
  }
</style>