<template>
  <div tabindex="0" role="button" class="inline-flex justify-between shadow-sm m-1 text-lg rounded border-2 border-rsmp-sec min-w-36">
    <input type="date" v-model="selectedEndDate" @change="store.updateApp">
  </div>
</template>

<script setup>
import { useMainStore } from "./../storage/store";
import { storeToRefs } from 'pinia';
const store = useMainStore();
const {
  selectedEndDate
} =  storeToRefs(store);
</script>