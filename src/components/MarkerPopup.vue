<template>
  <div class="z-[999] fixed bottom-3 right-3 grid grid-cols-4 gap-1 shadow bg-transparent">
    <div class="grid col-span-3 bg-white p-2 max-h-[400px] overflow-y-auto c-scroll">
        <div class=" border-blue-600 border-solid border-2">
          <h1 class="text-2xl text-center font-bold" v-if="selectedMarker">{{ selectedMarker.lga }} LGA</h1>
          <h1 class="text-2xl text-center font-bold" v-if="selectedLgaMarker">{{ selectedLgaMarker.LGA }} LGA</h1>
        </div>
        <table class="w-full border-collapse">
            <thead>
                <tr class=" bg-blue-600">
                    <th class="py-2 px-4 text-white font-thin">Support Type</th>
                    <th class="py-2 px-4 text-white font-thin">Partner</th>
                    <th class="py-2 px-4 text-white font-thin">Start Date</th>
                    <th class="py-2 px-4 text-white font-thin">End Date</th>
                    <th class="py-2 px-4 text-white font-thin">Status</th>
                </tr>
            </thead>
            <tbody>
              <template v-if="selectedMarker">
                <tr class="bg-blue-50">
                    <td class="py-2 px-4 border-y-2 border-gray-300">
                      <span class="inline-block w-3 h-3 rounded-full mr-1" :style="`background: ${getSpBg(selectedMarker.type_of_support)} `"></span>
                      {{ selectedMarker.type_of_support }}
                    </td>
                    <td class="py-2 px-4 border-b border-gray-300">{{ selectedMarker.partner }}</td>
                    <td class="py-2 px-4 border-b border-gray-300">{{ selectedMarker.start_date }}</td>
                    <td class="py-2 px-4 border-b border-gray-300">{{ selectedMarker.end_date }}</td>
                    <td class="py-2 px-4 border-b border-gray-300">{{ selectedMarker.status }}</td>
                </tr>
              </template>
              <template v-if="selectedLgaMarker">
                <tr class="bg-blue-100 border-2 border-white" v-for="(val, key) in selectedLgaMarker.supports" :key="key">
                    <td class="py-2 px-4 border-b border-gray-300">
                      <span class="inline-block w-3 h-3 rounded-full mr-1" :style="`background: ${getSpBg(val.type_of_support)} `"></span>
                      {{ val.type_of_support }}
                    </td>
                    <td class="py-2 px-4 border-b border-gray-300">{{ val.partner }}</td>
                    <td class="py-2 px-4 border-b border-gray-300">{{ val.start_date }}</td>
                    <td class="py-2 px-4 border-b border-gray-300">{{ val.end_date }}</td>
                    <td class="py-2 px-4 border-b border-gray-300">{{ val.status }}</td>
                </tr>
              </template>
            </tbody>
        </table>
    </div>
    <div class=" bg-white px-2 max-h-[400px] overflow-hidden">
      <b @click="store.closePopup" class="cursor-pointer absolute top-1 right-1 ml-4 w-8 h-8 rounded-full bg-blue-200 text-center text-xs text-blue-900">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mt-1 ml-1 w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </b>
      <h2 class="text-lg font-semibold">Keys</h2>
      <ul class="">
        <template v-if="selectedLgaMarker" v-for="(val, key) in verifySpList()">
          <li class="flex items-center mb-2">
              <span class="w-4 h-4 mr-2" :style="`background: ${getSpBg(val)};`"></span>
              {{ val }}
          </li>
        </template> 
        <template v-if="selectedMarker">
          <li class="flex items-center mb-2">
              <span class="w-4 h-4 mr-2" :style="`background: ${getSpBg(selectedMarker.type_of_support)};`"></span>
              {{ selectedMarker.type_of_support }}
          </li>
        </template> 
      </ul>
    </div>
  </div>
</template>
<script setup>
  import { onMounted, ref } from 'vue';
  import { useMainStore } from "./../storage/store";
  import { storeToRefs } from 'pinia';
  const store = useMainStore();
  const listOfSuports = ref(new Set());
  const verifySpList = (spName) => {
    if(selectedLgaMarker.value.supports) {
      selectedLgaMarker.value.supports.forEach((sp) => {
        listOfSuports.value.add(sp.type_of_support);
      });
    } 
    return listOfSuports.value;
  }
  const getSpBg = (spName) => {
    let sp = store.getValFromData(supportTypes.value, 'name', spName);
    return sp.bg;
  }
  const {
    selectedMarker, selectedLgaMarker, supportTypes
  } =  storeToRefs(store);

</script>