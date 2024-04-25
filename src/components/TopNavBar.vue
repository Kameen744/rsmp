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
            <a href="#" class="text-white text-xl font-extrabold rounded-none">Map View</a>
          </li>
          <li class="mr-[2rem]">
            <a href="#" class="text-white text-xl rounded-none">Partner Dashboard</a>
          </li>
          <li class="mr-[5rem]">
            <a href="#" class=" text-white text-xl rounded-none">CSO Dashboard</a>
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
  import {ref, onMounted} from 'vue'
  
  const value = ref(null)
</script>