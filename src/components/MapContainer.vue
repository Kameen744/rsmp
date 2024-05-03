<template>
  <div v-show="view == 'map'" class="relative">
    <div ref="mapContainerRef" class="min-h-[77vh] max-h-[77vh] overflow-hidden">
    </div>
    <div class=" absolute top-[10px] left-[80px] z-[991] bg-transparent">
        <div v-if="currentSupports[view]" class="font-bold text-[15px] p-2 shadow bg-white rounded cursor-pointer max-w-[45px]" @click="showSupportTypes=!showSupportTypes">
          <h6 class="p-0 m-0">KEY</h6>
        </div>
        <div v-if="showSupportTypes" class="bg-white font-bold text-[15px] shadow max-w-[75vw] overflow-auto mt-2">
          <h3 class="p-2">TYPE OF SUPPORT</h3>
          <div class="flex justify-start pr-4 mr-4">
            <div 
                class="p-3 py-2 text-cyan-50 m-2" 
                v-for="(val, key) in currentSupports[view]" :style="`background: ${val.bg};`">
                {{ key }}
            </div>
          </div>
          <hr>
          <h3 class="p-2">STATUS</h3>
          <div class="flex justify-start p-2">
            <div class="mr-3">
              <div class="mx-auto shadow-sm w-8 h-8 rounded-full bg-blue-600"></div>
              <b>Ongoing</b>
            </div>
            <div class="mr-3">
              <div class="mx-auto shadow-sm w-8 h-8 bg-blue-600"></div>
              <b>Completed</b>
            </div>
            <div class="mr-3">
              <div class="mx-auto w-0 h-0 border-l-[20px] border-l-transparent
                border-b-[32px] border-b-blue-600
                border-r-[20px] border-r-transparent">
              </div>
              <b>Pending</b>
            </div>
          </div>
        </div>
    </div>
    <MarkerPopup v-if="selectedLgaMarker || selectedMarker"></MarkerPopup>
  </div>
</template>

<script setup>
import { useMainStore } from "./../storage/store";
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import MarkerPopup from './MarkerPopup.vue';
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
  mapContainerRefMain.value = mapContainerRef.value;
  await store.launchAapp();
});

const {
  mapContainerRef, selectedLgaMarker, currentSupports, mapData,
  selectedMarker, mapContainerRefMain, view
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
    background: balck;
    font-size: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    z-index: 9;
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
    width: 8px;
    height: 8px;
  }
</style>