<template>
  <transition name="fade-blur">
    <div
      v-if="visible"
      class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-95 backdrop-blur-md"
    >
      <div
        class="bg-white/[0.08] p-6 w-[100%] h-[100%] flex flex-col justify-center items-center backdrop-blur-sm select-none"
        @click.self="close"
      >
        <div class="grid grid-cols-4 gap-4 mt-4">
          <div v-for="app in apps" :key="app.name" class="flex justify-center">
            <button @click="handleAppClick(app)" class="p-2">
              <img
                :src="app.icon"
                :alt="app.name"
                class="w-16 h-16 transition-all duration-100 ease-in-out transform active:scale-95 active:brightness-75 hover:brightness-80 select-none outline-none"
                draggable="false"
              />
            </button>
          </div>
        </div>
      </div></div
  ></transition>
</template>

<script setup lang="ts">
import type { App } from "~/appLibrary";
import apps from "~/appLibrary";

const props = defineProps<{ visible: boolean }>();
const emit = defineEmits(["close", "changeApp"]);

const close = () => {
  emit("close");
};

const handleAppClick = (app: App) => {
  openApp(app);
  close();
};

const openApp = (app: App) => {
  if (app.url) {
    window.open(app.url, "_blank");
  } else {
    emit("changeApp", app);
  }
};
</script>

<style scoped>
.fade-blur-enter-active, .fade-blur-leave-active {
  transition: opacity 0.23s, filter 0.23s;
}
.fade-blur-enter-from, .fade-blur-leave-to {
  opacity: 0;
  filter: blur(7px);
}
</style>
