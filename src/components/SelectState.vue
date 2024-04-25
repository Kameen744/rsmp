<template>
  <template class="min-[3rem]: flex justify-start">
    <div class="dropdown dropdown-bottom" @click="toggleDroped">
      <div tabindex="0" role="button" class="inline-flex justify-between shadow-sm p-3 m-1 pl-3 text-lg rounded border-2 border-rsmp-sec min-w-36">
        <div class="inline-flex max-w-28 overflow-hidden">
        {{selectedState? selectedState: 'State'}} 
        </div>
        <b class="ml-4 w-8 h-8 rounded-full bg-blue-200 text-center text-xs text-blue-900">
          <svg v-if="dropped" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mt-1 ml-1 w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mt-1 ml-1 w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </b>
      </div>
      <ul tabindex="0" class="dropdown-content z-[99999] menu p-2 shadow-lg bg-base-100 rounded-none max-h-[70vh] grid overflow-x-auto border-2 border-rsmp-sec" v-if="dropped">
        <!-- <li class="rounded-none border-b-2 border-blue-50">
          <a href="" @click.prevent="SelectState(null)" class="hover:rounded-none text-lg">
            State
          </a>
        </li> -->
        <li class="rounded-none border-b-2 border-blue-50" v-for="state in states">
          <a href="" @click.prevent="SelectState(state)" class="hover:rounded-none text-lg">
            {{ state.state }}
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
const dropped = ref(false);
const toggleDroped = () => {
  dropped.value = !dropped.value;
}
const SelectState = (state) => {
  selectedState.value = state.state;
  toggleDroped();
}
const {
  selectedState, states
} =  storeToRefs(store);
</script>