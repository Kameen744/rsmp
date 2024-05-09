<template>
  <template class="min-[3rem]: flex justify-start">
    <div class="dropdown dropdown-bottom">
      <div tabindex="0" role="button" class="inline-flex justify-between shadow-sm p-3 m-1 pl-3 text-lg rounded border-2 border-rsmp-sec min-w-36">
        <div class="inline-flex max-w-28 overflow-hidden">
          <div class="text-nowrap" v-if="selectedSupports[view].length <= 0">
            Support Type
          </div>
          <div v-else class="text-nowrap" v-for="support in selectedSupports[view].slice(-2)">
            {{ support }}
          </div>
        </div>
        <b class="ml-4 w-8 h-8 rounded-full bg-blue-200 text-center text-xs text-blue-900">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mt-1 ml-1 w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </b>
      </div>
      <ul tabindex="0" class="dropdown-content z-[99999] menu p-2 shadow-lg bg-base-100 rounded-none max-h-[70vh] grid overflow-x-auto border-2 border-rsmp-sec">
        <li class="rounded-none border-b-2 border-blue-50" v-for="support in supportTypes" :class="store.selected(selectedSupports[view], support.name) ? 'bg-blue-300': ''">
          <a href="" @click.prevent="SelectSupport(support)" class="hover:rounded-none text-lg inline-flex justify-between">
            <span>{{ support.name }}</span>
            <b class="w-8 h-8 rounded-full pr-1 bg-blue-200 text-center text-xs text-blue-900">
              <svg v-if="selectedSupports[view].includes(support.name)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mt-1 ml-1 w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mt-1 ml-1 w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </b>
          </a>
        </li>
      </ul>
    </div>
  </template>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useMainStore } from "./../storage/store";
import { storeToRefs } from 'pinia';
const store = useMainStore();

const SelectSupport = (support) => {
  let sspt = selectedSupports.value[view.value];
  if(!sspt.includes(support.name)) {
    selectedSupports.value[view.value].push(support.name);
  } else {
    selectedSupports.value[view.value] = sspt.filter(item => item !== support.name);
  }
  
  store.updateApp();
}

const {
  selectedSupports, view, supportTypes, selected
} =  storeToRefs(store);
</script>