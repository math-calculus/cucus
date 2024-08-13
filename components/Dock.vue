<template>
  <div class="dock fixed bottom-[25px] left-0 right-0 p-4 flex justify-center">
    <div
      class="bg-[#fff]/[.08] p-2 rounded-[18px] flex pl-2 space-x-2 items-center"
      :class="dockWidthClass"
    >
      <template v-for="(obj, index) in visibleDock" :key="obj.name">
        <button
          v-if="obj.type == 'app'"
          href="#"
          class="app-icon flex items-center justify-center w-18 h-18 transition-all duration-100 ease-in-out transform active:scale-95 active:brightness-75 hover:brightness-80 select-none outline-none"
          @click="openApp(obj)"
        >
          <img :src="obj.icon" :alt="obj.name" class="w-16 h-16" draggable="false" />
        </button>
        <div
          v-else-if="obj.type == 'divider'"
          class="w-[2px] h-14 bg-white/10 mx-2"
        ></div>
      </template>
      <div class="w-[2px] h-14 bg-white/10 mx-2"></div>
      <!-- 固定分隔线 -->
      <button
        class="app-icon flex items-center justify-center w-18 h-18 transition-all duration-100 ease-in-out transform active:scale-95 active:brightness-75 hover:brightness-80 select-none outline-none"
        @click="emit('openAppLibrary')"
      >
        <img :src="appLibrary.icon" :alt="'App Library'" class="w-16 h-16 select-none" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from "vue";

import apps from "~/appLibrary";
apps.map((app) => {
  app.type = "app";
  return app;
});

const emit = defineEmits(["changeApp", "openAppLibrary"]);

const maxVisibleApps = 7;
const visibleDock = ref([]);

const calculateVisibleDock = () => {
  const appCount = apps.filter((item) => item.type === "app").length;
  const screenWidth = window.innerWidth;
  const maxAppsByWidth = Math.floor((screenWidth - 32 - 80) / 80);
  const visibleAppCount = Math.min(appCount, maxVisibleApps, maxAppsByWidth);
  visibleDock.value = apps.slice(0, visibleAppCount);
};

const dockWidthClass = computed(() => {
  const appCount = visibleDock.value.filter((item) => item.type === "app").length;
  const totalWidth = appCount * 72 + (appCount - 1) * 8 + 2 + 80; // 总宽度，包含分隔线
  return `max-w-[${totalWidth}px]`;
});

function openApp(app: any) {
  if (app.url) {
    window.open(app.url, "_blank");
  } else {
    emit("changeApp", app);
  }
}

const appLibrary = {
  type: "appLibrary",
  icon: "/appIcon/Library.svg",
};

onMounted(() => {
  calculateVisibleDock();
  window.addEventListener("resize", calculateVisibleDock);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", calculateVisibleDock); // 清理事件监听器
});
</script>

<style scoped>
.dock {
  z-index: 1000;
}
</style>
