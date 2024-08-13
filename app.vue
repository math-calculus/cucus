<template>
  <body class="bg-black flex items-center justify-center min-h-screen flex-col">
    <main class="flex-grow flex items-center justify-center pb-[100px] w-full easeIn">
      <transition name="appEaseIn" mode="out-in">
        <component :is="usingApp" :key="usingApp.name" @changeApp="changeApp" @openAppLibrary="" />
      </transition>
    </main>
    <Dock @changeApp="changeApp" />
  </body>
</template>

<script setup>
import { ref } from "vue";
import Logo from "./components/Logo.vue";
import Dock from "./components/Dock.vue";

const usingApp = ref(Logo);

function changeApp(app) {
  usingApp.value = app.component || Logo;
}
</script>

<style scoped>

@keyframes scale-up-center {
  0% {
    -webkit-transform: scale(0.85);
    transform: scale(0.85);
    opacity: 0.6;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
.appEaseIn-enter-active {
  -webkit-animation: scale-up-center 0.35s cubic-bezier(0.785, 0.135, 0.15, 0.86) 0.05s both;
  animation: scale-up-center 0.35s cubic-bezier(0.785, 0.135, 0.15, 0.86) 0.05s both;
}
.appEaseIn-enter {
  transform: scale(0.8);
}
</style>
