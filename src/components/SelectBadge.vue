<template>
  <span class="absolute text-nowrap top-[-5px] left-1/2 -translate-x-1/2 bg-blue-600 rounded text-white border-0 text-xs px-2 pb-1">
    {{ title }}
  </span>
</template>

<script setup>
  defineProps({
    title: String
  });
</script>