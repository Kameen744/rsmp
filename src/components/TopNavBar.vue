<template>
  <div class="navbar h-[5rem] mt-0 bg-rsmp-sec">
    <div class="container mx-auto max-w-[90%]">
      <div class="flex-1">
        <a class="p-0 cursor-pointer">
          <img :src="logo" alt="Logo" class="max-h-[5rem]">
        </a>
      </div>
  
      <div class="flex-none gap-2">
        <ul class="menu menu-horizontal px-1">

          <li class="mr-[2rem]" v-for="link in links">
            <a href="" @click.prevent="changeView(link.name)" 
                class="text-white text-xl font-extrabold rounded-none" :class="view==link.name?'active':''">
              {{ link.title }}
            </a>
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
import logo from './../assets/logo.jpg';

const store = useMainStore();
const router = useRouter();
const logginOut = ref(false);

const links = [
  {name: 'map', title: 'Map View'},
  // {name: 'ptins', title: 'Parnter Insight'},
  {name: 'chart', title: 'Partner Dashboard'},
  // {name: 'cso', title: 'CSO Dashboard'},
]

const changeView = async (v) => {
  view.value = v;
  selectedState.value[v] = 'Niger';
  selectedLga.value[v] = ''
  selectedPartners.value[v] = [];
  selectedSupports.value[v] = [];
  selectedStatus.value[v] = ['Ongoing'];

  if(v == 'map') {
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