<template>
  <div class="z-[9999] fixed bottom-3 right-3 flex shadow bg-transparent">
    <!-- <div class="grid col-span-3 bg-white p-2 max-h-[400px] overflow-y-auto c-scroll">
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
    </div> -->

    <div class="grid bg-white shadow-md p-2 max-h-[400px] w-[74vw] overflow-y-auto c-scroll">
      <b @click="store.closePopup" class="z-[99] cursor-pointer absolute top-[-10px] right-[-10px] shadow-lg hover:bg-slate-200 ml-4 w-8 h-8 rounded-full bg-blue-200 text-center text-xs text-blue-900">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mt-1 ml-1 w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </b>
      
      <div class="border-blue-600 border-solid border-2 static">
        <h1 class="text-2xl text-center font-bold" v-if="selectedMarker">{{ selectedMarker.lga }} LGA</h1>
        <h1 class="text-2xl text-center font-bold" v-if="selectedLgaMarker">{{ selectedLgaMarker.LGA }} LGA</h1>
      </div>
      
      <div class="flex text-left bg-blue-500 text-white font-semibold">
        <div class="py-2 px-2 min-w-[250px] text-left font-bold text-lg pl-3">Support Type</div>
        <div class="py-2 px-2 min-w-[200px] text-left font-bold text-lg pl-3">Program Area</div>
        <div class="py-2 px-2 min-w-[300px] text-left font-bold text-lg pl-3">Partner</div>
        <div class="py-2 px-2 min-w-[110px] text-left font-bold text-lg pl-3">Start Date</div>
        <div class="py-2 px-2 min-w-[110px] text-left font-bold text-lg pl-3">End Date</div>
        <div class="py-2 px-2 min-w-[100px] text-left font-bold text-lg pl-3">Status</div>
       
      </div>
      
      <template v-if="selectedMarker">
        <div class="flex flex-wrap rounded-none bg-blue-100 text-left hover:bg-blue-50 cursor-pointer" 
        :key="Math.round(Math.random() * 10001)" @click="expand(key)" :class="collapseKey==key?'bg-blue-50':'bg-blue-100'">
          <div class="overflow-hidden border-y py-1 w-[250px] border-white px-3 flex justify-start">
              <span class="inline-block w-3 h-3 m-0 rounded-full mr-1 mt-2" :style="`background: ${getSpBg(selectedMarker.type_of_support)} `"></span>
              {{ selectedMarker.type_of_support }} 
          </div>
          <div class="overflow-hidden border-y py-1 border-white px-3 w-[200px]">{{ selectedMarker.program_area }}</div>
          <div class="overflow-hidden border-y py-1 border-white px-3 w-[300px]">{{ selectedMarker.partner }}</div>
          <div class="overflow-hidden border-y py-1 border-white px-3 w-[110px]">{{ selectedMarker.start_date }}</div>
          <div class="overflow-hidden border-y py-1 border-white px-3 w-[110px]">{{ selectedMarker.end_date }}</div>
          <div class="overflow-hidden border-y py-1 border-white px-3 w-[110px] flex gap-2">
            <div>{{ selectedMarker.status }}</div>
            <div v-if="collapseKey==key">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
              </svg>
            </div>
            <div v-else>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          </div>
          
          <br>
          <Transition>
            <div class="flex-full py-2 px-4" v-if="collapseKey==key">
              <h1 class=" block font-bold text-lg">Support Summary</h1>
              <p>{{ selectedMarker.summary_of_support }}</p>
            </div>
          </Transition>
        </div>
      </template>

      <template v-if="selectedLgaMarker">
        <div class="flex flex-wrap rounded-none relative bg-blue-100 text-left hover:bg-blue-50 cursor-pointer" 
          v-for="(val, key) in selectedLgaMarker.supports" :key="key+1" @click="expand(key+1)" :class="collapseKey==key?'bg-blue-50':'bg-blue-100'">
          <div class="overflow-hidden border-y py-1 w-[250px] border-white px-3 flex justify-start">
              <span class="inline-block w-3 h-3 m-0 rounded-full mr-1 mt-2" :style="`background: ${getSpBg(val.type_of_support)} `"></span>
              {{ val.type_of_support }} 
          </div>
          <div class="overflow-hidden border-y py-1 border-white px-3 w-[200px]">{{ val.program_area }}</div>
          <div class="overflow-hidden border-y py-1 border-white px-3 w-[300px]">{{ val.partner }}</div>
          <div class="overflow-hidden border-y py-1 border-white px-3 w-[110px]">{{ val.start_date }}</div>
          <div class="overflow-hidden border-y py-1 border-white px-3 w-[110px]">{{ val.end_date }}</div>
          <div class="overflow-hidden border-y py-1 border-white px-3 w-[110px] flex gap-2">
            <div>{{ val.status }}</div>
            <div v-if="collapseKey==key+1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
              </svg>
            </div>
            <div v-else>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          </div>
          
          <br>
          <Transition>
            <div class="flex-full py-5 shadow-xl px-8" v-if="collapseKey==key+1">
              <h1 class="block font-bold text-lg mb-2">Support Summary</h1>
              <p class="">{{ val.summary_of_support }}</p>
            </div>
          </Transition>
        </div>
      </template>
    </div>

    <!-- <div class=" bg-white px-2 max-h-[400px] overflow-hidden">
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
    </div> -->
  
  </div>
</template>
<script setup>
  import { onMounted, ref } from 'vue';
  import { useMainStore } from "./../storage/store";
  import { storeToRefs } from 'pinia';
  const store = useMainStore();
  const listOfSuports = ref(new Set());
  const collapseKey = ref(null);
  const expand = (key) => {
    if(collapseKey.value) {
      collapseKey.value = null;
    } else {
      collapseKey.value = key;
    }
  }
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

<style scoped>
  .flex-full {flex: 0 0 100%;} 
</style>