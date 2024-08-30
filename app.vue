<template>
  <body class="bg-black flex items-center justify-center min-h-screen flex-col">
    <main class="flex-grow flex items-center justify-center pb-[100px] w-full easeIn">
      <transition name="appEaseIn" mode="out-in">
        <component
          :is="usingApp"
          :key="usingAppName"
          @changeApp="changeApp"
          @openAppLibrary=""
          v-if="usingAppName != 'Music'"
        />
      </transition>
      <transition name="appEaseIn" mode="out-in">
        <AppMusic
          v-show="usingAppName == 'Music'"
          class="absolute inset-0 h-full overflow-auto"
        />
      </transition>
    </main>
    <Dock @changeApp="changeApp" />
    <AudioPlayer />
  </body>
</template>

<script setup>
import Logo from "./components/app/Logo.vue";
import Dock from "./components/app/Dock.vue";

const usingApp = shallowRef(Logo);
const usingAppName = shallowRef("Logo");

function changeApp(app) {
  usingAppName.value = app.name || "Logo";
  usingApp.value = app.component || Logo;
  if (app.name === "Music") {
    useOpenedMusic().value = true;
  }
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
  -webkit-animation: scale-up-center 0.25s cubic-bezier(0.785, 0.135, 0.15, 0.86) 0.05s
    both;
  animation: scale-up-center 0.25s cubic-bezier(0.785, 0.135, 0.15, 0.86) 0.05s both;
}
.appEaseIn-enter {
  transform: scale(0.8);
}
</style>
