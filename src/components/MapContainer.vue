<template>
  <div v-show="view == 'map'">
    <div ref="mapContainerRef" class="min-h-[77vh] max-h-[77vh] overflow-hidden">
    </div>
    <MarkerPopup v-if="selectedLgaMarker || selectedMarker"></MarkerPopup>
  </div>
</template>

<script setup>
import { useMainStore } from "./../storage/store";
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import MarkerPopup from './MarkerPopup.vue'

const store = useMainStore();
onMounted(async () => {
  await store.launchAapp();
  await store.loadGeoData();
  store.createMap();
  store.createDataPoints();
});

const {
  mapContainerRef, selectedLgaMarker, selectedMarker, view
} =  storeToRefs(store);
</script>

<style>
  div.leaflet-marker-icon {
    border:0px;
    background: transparent;
  }
  #layer-name-label {
    margin-left: 2px;
    margin-right: 2px;
    padding: 1px;
    padding-top: 0px;
    color: rgb(251, 251, 251);
    font-size: 9px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    /* background-color: rgb(12, 47, 47); */
  }
  .facilities-marker div {
    /* position: absolute;
    top: 40%;
    left: 5%; */
    /* border-radius: 50%; */
    width: 8px;
    height: 8px;
  }
</style>