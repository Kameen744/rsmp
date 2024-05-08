<template>
  <div class="flex items-center justify-end h-screen bg-blue-700">
    <div class="space-y-6 mr-10">
        <h2 class="text-lg font-semibold text-white">Login</h2>
        <div>
          <label for="email" class="block mb-2 text-sm font-medium text-white">Email Address</label>
          <input type="email" id="email" placeholder="name@domain.com" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300">
        </div>
        <div>
          <label for="password" class="block mb-2 text-sm font-medium text-white">Password</label>
          <input type="password" id="password" placeholder="********" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300">
        </div>
        <button type="submit" class="px-6 py-3 bg-blue-950 text-white rounded-md hover:bg-blue-700 focus:outline-none">Login</button>
    </div>
    <div class="bg-slate-200 p-10 rounded-lg shadow-lg min-h-[400px] min-w-[500px] mr-[100px]">
      <div>
        <img src="./assets/rsmp-logo2.svg" alt="logo" class="h-[60px]">
      </div>
      <div class="flext justify-between items-center mt-8">
        <div class=" w-[50%] h-[60px] bg-white rounded"></div>
      </div>
    </div>
  </div>
</template>