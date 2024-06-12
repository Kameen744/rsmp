<template>
  <div v-show="view == 'ptins'" class="relative">
    <div class="min-h-[77vh] max-h-[77vh] p-8">
      
      <div class="bg-white rounded-none relative w-full h-fit p-4 mt-8 pt-11 shadow-md" 
      v-for="prog in Object.keys(partnerSummaryData)" :key="prog">
        <div class="absolute w-full text-center top-0 text-2xl font-bold left-0 py-1 shadow px-3 bg-rsmp-sec text-white">
          {{ prog }}
        </div>
        <div class="bg-slate-100 rounded-none relative w-full h-fit p-4 mt-8 pt-11 shadow-md" v-for="part in Object.keys(partnerSummaryData[prog])">
          <div class="absolute top-0 text-lg left-0 py-1 shadow px-3 bg-blue-900 text-white">
            {{ part }}
          </div>
          <div v-for="(spt, key) in partnerSummaryData[prog][part]">
            <div class="bg-slate-200 z-10 hover:bg-slate-300 shadow-sm p-4 py-1 flex justify-between my-3 mb-0 relative cursor-pointer" 
            :class="expandedKey == `${key + prog + part}` ? 'bg-slate-300': ''" @click="expand(`${key + prog + part}`)">
              <div>
                <p class="font-bold text-lg">{{ spt.type_of_support }}</p>
                <small>{{ getDate(spt.start_date) }} - {{ getDate(spt.end_date) }}</small>
              </div>
              <div class="self-center flex gap-3">  
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6" 
                  :class="getStatusColor(spt.status)">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                  </svg>
                </div>

                <p>{{ spt.status }}</p>
                
                <div v-if="expandedKey == `${key + prog + part}`">
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
            </div>
            <Transition class="z-0">
              <div v-if="expandedKey == `${key + prog + part}`" class="bg-blue-950 z-0 rounded-b-lg text-white shadow p-4 mt-0 max-w-[95%] ml-auto mr-auto">
                {{ spt.summary_of_support }}
              </div>
            </Transition>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { useMainStore } from "./../storage/store";
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import moment from 'moment';

const store = useMainStore();
let expandedKey = ref('');

const expand = (key) => {
  if(expandedKey.value == key) {
    expandedKey.value = ''
  } else {
    expandedKey.value = key
  }
}

const getStatusColor = (status) => {
  let cls = '';
  if(status == 'Ongoing') {
    cls = 'text-rsmp-sec';
  } else if(status == 'Completed') {
    cls = 'text-success';
  }

  return cls;
}

const getDate = (dt) => {
  return moment(dt, 'YYYYMMDD').format('MMMM Do YYYY');
}

const {
  createChartData, getChartJsOptions, chartDataKeys,
  chartMainContainerRef, mapData, view, cso, partnerSummaryData
} =  storeToRefs(store);

</script>
