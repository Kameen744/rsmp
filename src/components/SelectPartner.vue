<template>
  <template class="min-[3rem]: flex justify-start">
    <div class="dropdown dropdown-bottom">
      <div tabindex="0" role="button" class="inline-flex justify-between shadow-sm p-3 m-1 pl-3 text-lg rounded border-2 border-rsmp-sec min-w-36">
        <div class="inline-flex max-w-28 overflow-hidden">
          <div v-if="selectedPartners[view].length <= 0" class="text-nowrap">
            Partners
          </div>
          <div v-else class="text-nowrap" v-for="partner in selectedPartners[view].slice(-2)">
            {{ partner }}
          </div>
        </div>
        <b class="ml-4 w-8 h-8 rounded-full bg-blue-200 text-center text-xs text-blue-900">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mt-1 ml-1 w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </b>
      </div>
      <ul tabindex="0" class="dropdown-content z-[99999] menu p-2 shadow-lg bg-base-100 rounded-none max-h-[70vh] grid overflow-x-auto border-2 border-rsmp-sec">
        <template v-for="partner in partners">
          <li class="rounded-none border-b-2 border-blue-50" v-if="filterPartners(partner)">
            <a href="" @click.prevent="SelectPartner(partner)" class="hover:rounded-none text-lg inline-flex justify-between">
              <span>{{ partner.short_name }}</span>
              <b class="w-8 h-8 rounded-full pr-1 bg-blue-200 text-center text-xs text-blue-900">
                <svg v-if="selectedPartners[view] && store.selected(selectedPartners[view], partner.partner)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mt-1 ml-1 w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mt-1 ml-1 w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </b>
            </a>
          </li>
        </template>
      </ul>
    </div>
  </template>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useMainStore } from "./../storage/store";
import { storeToRefs } from 'pinia';
const store = useMainStore();

const filterPartners = (pt) => {
  if(view.value == 'chart' && pt.cso_partner == '1') {
    return false;
  }
  return true;
}

const SelectPartner = (partner) => {
  let spt = selectedPartners.value[view.value];
  if(!spt.includes(partner.partner)) {
    selectedPartners.value[view.value].push(partner.partner);
  } else {
    selectedPartners.value[view.value] = spt.filter(item => item !== partner.partner);
  }

  store.updateApp();
}

const {
  selectedPartners, view, partners, selected
} =  storeToRefs(store);
</script>