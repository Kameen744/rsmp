<template>
  <LoaderContainer></LoaderContainer>
  <router-view></router-view>
</template>

<script setup>
import Login from './Login.vue';
import Home from './Home.vue';
import LoaderContainer from './components/LoaderContainer.vue';
import { useMainStore } from "./storage/store";
import { storeToRefs } from 'pinia';
const store = useMainStore();

const {
  laoding
} =  storeToRefs(store);
</script>

<style scoped></style>