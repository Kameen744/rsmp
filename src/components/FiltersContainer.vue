<template>
  <div class="bg-white">
    <div class="container max-w-[89%] mx-auto px-0">
      <ul class="menu menu-horizontal flex p-0 py-2 justify-center">
        <SelectState></SelectState>
        <SelectLga></SelectLga>
        <SelectProgram></SelectProgram>
        <SelectPartner></SelectPartner>
        <SelectSupport></SelectSupport>
        <SelectStatus></SelectStatus>
        <!-- <selectStartDate></selectStartDate>
        <selectEndDate></selectEndDate> -->
      </ul>
    </div>
  </div>
</template>

<script setup>
import SelectState from './SelectState.vue';
import SelectLga from './SelectLga.vue';
import SelectProgram from './SelectProgram.vue';
import SelectPartner from './SelectPartner.vue';
import SelectSupport from './SelectSupport.vue';
import SelectStatus from './SelectStatus.vue';
// import selectStartDate from './selectStartDate.vue';
// import selectEndDate from './selectEndDate.vue';

import { useMainStore } from "./../storage/store";
import { storeToRefs } from 'pinia';
const store = useMainStore();
const {view} =  storeToRefs(store);
</script>
