<template>
  <div class="bg-login sm:grid md:flex items-center justify-center h-screen bg-blue-700 p-4">
    <div class="space-y-6 p-8 min-w-[350px] bg-blue-700">
        <h2 class=" text-3xl text-white">Login</h2>
        <div>
          <label for="email" class="block mb-2 text-sm font-medium text-white">Email Address</label>
          <input type="email" id="email" placeholder="name@mail.com" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" v-model="email">
        </div>
        <div>
          <label for="password" class="block mb-2 text-sm font-medium text-white">Password</label>
          <input type="password" id="password" placeholder="********" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" v-model="password">
        </div>
        <button type="submit" class="relative btn btn-primary bg-blue-950 w-full" :class="loginProcess ? 'disabled': ''" @click.prevent="login">
          <b class="">Login</b> 
          <span v-show="loginProcess" class="loading loading-spinner text-info absolute top-[25%] right-[10%]"></span>
        </button>
    </div>
    <div class="bg-white p-8 py-4 rounded-lg shadow-xl min-h-[400px] max-w-[800px]">
      <div>
        <img :src="logo" alt="logo" class="max-h-[100px]">
      </div>
      <div class="flext justify-between items-center mt-4">
          <h1 class="text-2xl font-bold mb-4">
            Healthcare Support Dashboard
          </h1>
          <p class=" text-lg mb-4">
            The US-CDC, in collaboration with Sydani Group, aims to enhance the visibility of health care support by different implementing partners in Niger state. 
          </p>
          <p class=" text-lg mb-4">
            This support seeks to facilitate the strategic and optimal allocation of technical and financial partner resources to program areas within the state. 
          </p>
          <p class=" text-lg">  
            Through this partner mapping dashboard, stakeholders can gain insights into existing partnerships, streamline collaboration efforts, and ensure optimal resource utilization for improved healthcare delivery.
          </p>
      </div>
      <div class=" divider"></div>
      <div class="flex justify-center gap-8">
        <img class="max-h-[50px]" :src="nphcda">
        <img class="max-h-[50px]" :src="sydani">
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMainStore } from "./storage/store";
import { ref } from "vue";
import { useRouter } from 'vue-router';
import logo from './assets/logo2.svg';
import sydani from './assets/sydani.png';
import nphcda from './assets/nphcda.png';
import bgImg from './assets/bg-img.svg';
const router = useRouter();
const store = useMainStore();
const email = ref('');
const password = ref('');
const authError = ref(false);
const loginProcess = ref(false);

const login = async () => {
  loginProcess.value = true;
  if (email.value && password.value) {
    store.login(email.value, password.value).then(async (res) => {
      if (res.data.message.api_key) {
        await localStorage.setItem('authUser', JSON.stringify(res.data.message));
        loginProcess.value = false;
        authError.value = false;
        router.push({ name: 'home' });
      } else {
        authError.value = true;
        loginProcess.value = false;
      }
    });
  }
}

</script>

<style scoped>
.bg-login {
  background-image: url('./assets/bg-img.svg');
  /* background-position: 50%; */
  background-repeat: no-repeat;
  background-size: cover;
}
</style>