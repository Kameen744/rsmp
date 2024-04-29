<template>
  <div class="navbar h-[5rem] mt-0 bg-rsmp-sec">
    <div class="container mx-auto max-w-[90%]">
      <div class="flex-1">
        <a class="p-0 cursor-pointer">
          <img src="./../assets/rsmp-logo.png" alt="Logo" class="h-[3.9rem]">
        </a>
      </div>
  
      <div class="flex-none gap-2">
        <ul class="menu menu-horizontal px-1">
          <li class="mr-[2rem]">
            <a href="" @click.prevent="changeView('map')" 
                class="text-white text-xl font-extrabold rounded-none" :class="view=='map'?'active':''">
              Map View
            </a>
          </li>
          <li class="mr-[2rem]">
            <a href="" @click.prevent="changeView('chart')" 
                class="text-white text-xl rounded-none" :class="view=='chart'?'active':''">
              Partner Dashboard
            </a> 
          </li>
          <li class="mr-[5rem]">
            <a href="#" @click.prevent="changeView('cso')"
                class=" text-white text-xl rounded-none">
              CSO Dashboard</a>
          </li>
          <li>
            <button class="btn btn-md bg-white text-lg rounded-none">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMainStore } from "./../storage/store";
import { storeToRefs } from 'pinia';
import { onMounted, ref} from 'vue';

const store = useMainStore();

const changeView = async (v) => {
  store.closePopup();
  selectedState.value[v] = 'Niger';
  selectedLga.value[v] = ''
  if(view == 'map') {
    selectedPrograms.value[v] = ['NiCare'];
  } else {
    selectedPrograms.value[v] = ['Routine Immunization'];
  }
  selectedPartners.value[v] = [];
  selectedSupports.value[v] = [];
  view.value = v;
  await store.updateApp();
}

const {
  selectedState, selectedLga, selectedPrograms, 
  selectedPartners, selectedSupports, mapData, view
} =  storeToRefs(store);
</script>