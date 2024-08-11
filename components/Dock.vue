<template>
  <div class="fixed bottom-[30px] left-0 right-0 p-4 flex justify-center">
    <div
      class="bg-[#141414] p-2 rounded-[18px] flex pl-2 space-x-2 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
    >
      <a
        v-for="app in apps"
        :key="app.name"
        href="#"
        class="flex items-center justify-center w-18 h-18"
      >
        <img :src="app.icon" :alt="app.name" class="w-16 h-16" />
      </a>
    </div>
  </div>
</template>

<script setup>
const apps = [
  {
    name: "Blog",
    icon: "/appIcon/Blog.svg",
  },
  {
    name: "Lus",
    icon: "/appIcon/Lus.svg",
  },
];
</script>

<style scoped></style>