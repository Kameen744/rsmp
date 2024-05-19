<template>
  <template class="min-[3rem]: flex justify-start">
    <div class="dropdown dropdown-bottom">
      <SelectBadge title="Status" v-if="selectedStatus[view].length > 0"></SelectBadge>
      <div tabindex="0" role="button" class="inline-flex justify-between shadow-sm p-3 m-1 pl-3 text-lg rounded border-2 border-rsmp-sec min-w-36">
        <div class="inline-flex max-w-28 overflow-hidden">
          <div v-if="selectedStatus[view].length <= 0" class="text-nowrap">
            Status
          </div>
          <div v-else class="text-nowrap" v-for="status in selectedStatus[view].slice(-2)">
            {{ status }}
          </div>
        </div>
        <b class="ml-4 w-8 h-8 rounded-full bg-blue-200 text-center text-xs text-blue-900">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mt-1 ml-1 w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </b>
      </div>
      <ul tabindex="0" class="dropdown-content z-[99999] menu p-2 shadow-lg bg-base-100 rounded-none max-h-[70vh] grid overflow-x-auto border-2 border-rsmp-sec">
        <li class="rounded-none border-b-2 border-blue-50" v-for="status in statusOptions" :class="store.selected(selectedStatus[view], status) ? 'bg-blue-300': ''">
          <a href="" @click.prevent="Selectstatus(status)" class="hover:rounded-none text-lg inline-flex justify-between">
            <span>{{ status }}</span>
            <b class="w-8 h-8 rounded-full pr-1 bg-blue-200 text-center text-xs text-blue-900">
              <svg v-if="selectedStatus[view] && selectedStatus[view].includes(status)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mt-1 ml-1 w-6 h-6">
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
import SelectBadge from './SelectBadge.vue';
const store = useMainStore();
const statusOptions = ["Pending","Ongoing","Completed"];

const Selectstatus = (status) => {
  let spt = selectedStatus.value[view.value];
  if(!spt.includes(status)) {
    selectedStatus.value[view.value].push(status);
  } else {
    selectedStatus.value[view.value] = spt.filter(item => item !== status);
  }

  store.updateApp();
}

const {
  selectedStatus, view, selected
} =  storeToRefs(store);
</script>