<template>
  <div class="navbar h-[5rem] mt-0 bg-rsmp-sec">
    <div class="container flex justify-between mx-auto max-w-[90%]">
      
      <div class="flex">
        <div class="p-0 cursor-pointer">
          <img :src="logo" alt="Logo" class="max-h-[5rem]">
        </div>
        <!-- <div class="p-0 cursor-pointer">
          <img :src="niger" alt="Logo" class="max-h-[5rem]">
        </div> -->
      </div>
  
      <div class="flex-none gap-1">
        <ul class="menu menu-horizontal px-1">

          <li class="mr-[1rem]" v-for="link in links">
            <button @click.prevent="changeView(link.name)" 
                class="text-white btn text-xl font-extrabold rounded-none" :class="view==link.name?'btn-info':'btn-ghost'">
              {{ link.title }}
            </button>
          </li>
         
          <li class="flex-wrap">
            <button class="relative btn btn-md bg-white text-lg rounded-none" @click="logout">
              <b class="">Logout</b> 
              <span v-show="logginOut" class="loading loading-spinner text-info absolute top-[25%] right-[10%]"></span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMainStore } from "./../storage/store";
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { onMounted, ref} from 'vue';
import logo from './../assets/logo.svg';
// import niger from './../assets/niger.png';

const store = useMainStore();
const router = useRouter();
const logginOut = ref(false);

const links = [
  {name: 'map', title: 'Map View'},
  {name: 'ptins', title: 'Support Summary'},
  {name: 'chart', title: 'Dashboard'},
  // {name: 'cso', title: 'CSO Dashboard'},
]

const changeView = async (v) => {
  view.value = v;
  selectedState.value[v] = 'Niger';
  selectedLga.value[v] = ''
  selectedPartners.value[v] = [];
  selectedSupports.value[v] = [];
  selectedStatus.value[v] = ['Ongoing'];

  if(v == 'map' || v == 'ptins') {
    selectedPrograms.value[v] = ['Routine Immunization'];
  } else {
    if(v=='cso') {
      cso.value = 'only';
    } else {
      cso.value = 'non';
    }
    selectedPrograms.value[v] = [];
  }
  store.closePopup();
  await store.updateApp();
}

const logout = async () => {
  logginOut.value = true;
  await store.logout();
  router.push({ name: 'login' });
  logginOut.value = !logginOut.value
}

const {
  selectedState, selectedLga, selectedPrograms, selectedStatus,
  selectedPartners, selectedSupports, mapData, view, cso
} =  storeToRefs(store);
</script>