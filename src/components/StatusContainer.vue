<template>
  <div class="container max-w-[89%] mx-auto px-0" ref="statusContRef">
    <div class="flex justify-between pr-0 bg-white p-4 py-0 pt-2">
        <div class="">
          <h3 class="font-bold">SUPPORT TYPES</h3>
        </div>
        <!-- <div class="mr-4">
          <h3 class=" font-bold">Status</h3>
        </div> -->
    </div>
    <div class="flex justify-between pr-0 bg-white p-4">
        <!-- v-if="chartCleanedData.length > 0" -->
        <!-- v-for="(val, key) in verifySpList()" -->
        <div class="flex justify-start overflow-x-auto c-scroll" v-if="currentSupports[view]">
          <label 
            class="p-3 py-2 text-cyan-50 m-2" 
            v-for="(val, key) in currentSupports[view]" :style="`background: ${val.bg};`">
            {{ key }}
          </label>
        </div>

        <div class="flex justify-end mr-4">
          <!-- <label class="p-2 py-1 bg-indigo-300 text-cyan-50">
            Nutrition
          </label> -->
        </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, onUnmounted, ref} from 'vue';
import { useMainStore } from "./../storage/store";
import { storeToRefs } from 'pinia';
const store = useMainStore();
// const listOfSuports = ref(new Set());
// const verifySpList = () => {
//   if(chartCleanedData.value) {
//     chartCleanedData.value.forEach((sp) => {
//       listOfSuports.value.add(sp.support);
//     });
//   } 
//   return listOfSuports.value;
// }

// const getSpBg = (spName) => {
//   let sp = store.getValFromData(supportTypes.value, 'name', spName);
//   return sp.bg;
// }

const {
  supportTypes, currentSupports, view, statusContRef
} =  storeToRefs(store);
</script>