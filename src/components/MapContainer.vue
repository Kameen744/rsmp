<template>
  <div v-show="view == 'map'">
    <div ref="mapContainerRef" class="min-h-[77vh] max-h-[77vh] overflow-hidden">
      <div v-if="currentSupports[view]" class="absolute top-[10px] left-[100px] z-[991] font-bold text-[15px] p-2 shadow bg-white rounded cursor-pointer" @click="showSupportTypes=!showSupportTypes">
        <h6 class="p-0 m-0">KEY</h6>
      </div>
      <div v-if="showSupportTypes" class="bg-white font-bold text-[15px] z-[991] shadow flex justify-start absolute top-[60px] left-[100px] max-w-[70vw] overflow-auto">
          <h4 
            class="p-3 py-2 text-cyan-50 m-2" 
            v-for="(val, key) in currentSupports[view]" :style="`background: ${val.bg};`">
            {{ key }}
        </h4>
      </div>
    </div>
    <MarkerPopup v-if="selectedLgaMarker || selectedMarker"></MarkerPopup>
  </div>
</template>

<script setup>
import { useMainStore } from "./../storage/store";
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import MarkerPopup from './MarkerPopup.vue'
const store = useMainStore();
const showSupportTypes = ref(false)
// const listOfSuports = ref(new Set());

// const verifySpList = () => {
//   if(mapData.value[view.value]) {
//     console.log(mapData.value[view.value]);
//     mapData.value[view.value].forEach((sp) => {
//       // listOfSuports.value.add(sp.support);
//       console.log(sp);
//     });
//   } 
//   return listOfSuports.value;
// }

onMounted(async () => {
  await store.launchAapp();
  await store.loadGeoData();
  store.createMap();
  store.createDataPoints();
});

const {
  mapContainerRef, selectedLgaMarker, currentSupports, mapData,
  selectedMarker, view
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
  .info {
    position: absolute;
    z-index: 991;
    font: 14px/16px Arial, Helvetica, sans-serif;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    margin: 0 0 5px;
    max-width: 200px;
  }

  .r-info {
    top: 10px;
    left: 100px;
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