<template>
  <div tabindex="0" role="button" class="inline-flex justify-between shadow-sm m-1 text-lg rounded border-2 border-rsmp-sec max-w-32">
    <input type="date" v-model="selectedStartDate" @change="store.updateApp">
  </div>
</template>

<script setup>
import { useMainStore } from "./../storage/store";
import { storeToRefs } from 'pinia';
const store = useMainStore();
const {
  selectedStartDate
} =  storeToRefs(store);
</script>