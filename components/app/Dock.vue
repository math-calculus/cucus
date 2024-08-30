<template>
  <div class="dock fixed bottom-[25px] left-0 right-0 p-4 flex justify-center">
    <div
      class="bg-[#fff]/[.08] p-2 rounded-[18px] flex pl-2 space-x-2 items-center backdrop-blur-sm border border-black/[.08] border-[1]"
      :class="dockWidthClass"
    >
      <template v-for="obj in visibleDock" :key="obj.name">
        <button
          v-if="isApp(obj)"
          class="app-icon flex items-center justify-center w-18 h-18 transition-all duration-100 ease-in-out transform active:scale-95 active:brightness-75 hover:brightness-80 select-none outline-none"
          @click="openApp(obj)"
        >
          <img :src="obj.icon" :alt="obj.name" class="w-16 h-16" draggable="false" />
        </button>
        <div v-else-if="isDivider(obj)" class="w-[2px] h-14 bg-white/10 mx-2"></div>
      </template>
      <div class="w-[2px] h-14 bg-white/10 mx-2"></div>
      <button
        class="app-icon flex items-center justify-center w-18 h-18 transition-all duration-100 ease-in-out transform active:scale-95 active:brightness-75 hover:brightness-80 select-none outline-none"
        @click="showAppLibraryModal = true"
      >
        <img :src="appLibrary.icon" :alt="'App Library'" class="w-16 h-16 select-none" draggable="false" />
      </button>
    </div>

    <AppLibrary
      :visible="showAppLibraryModal"
      @close="showAppLibraryModal = false"
      @changeApp="openApp"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
import type { App } from "~/appLibrary";
import apps from "~/appLibrary";
interface DockItem extends App {
  type: "app" | "divider";
}

const emit = defineEmits(["changeApp", "openAppLibrary"]);

const maxVisibleApps = 7;
const visibleDock = ref<DockItem[]>([]);
const showAppLibraryModal = ref(false);

const calculateVisibleDock = () => {
  const appCount = apps.length;
  const screenWidth = window.innerWidth;
  const maxAppsByWidth = Math.floor((screenWidth - 32 - 80) / 80);
  const visibleAppCount = Math.min(appCount, maxVisibleApps, maxAppsByWidth);
  visibleDock.value = apps
    .slice(0, visibleAppCount)
    .map((app) => ({ ...app, type: "app" } as DockItem));
};

const dockWidthClass = computed(() => {
  const appCount = visibleDock.value.filter((item) => item.type === "app").length;
  const totalWidth = appCount * 72 + (appCount - 1) * 8 + 2 + 80;
  return `max-w-[${totalWidth}px]`;
});

const openApp = (app: App) => {
  if (app.url) {
    window.open(app.url, "_blank");
  } else {
    emit("changeApp", app);
  }
};

const appLibrary: App = {
  name: "App Library",
  icon: "/appIcon/Library.svg",
};

const isApp = (item: DockItem): boolean => item.type === "app";
const isDivider = (item: DockItem): boolean => item.type === "divider";

onMounted(() => {
  calculateVisibleDock();
  window.addEventListener("resize", calculateVisibleDock);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", calculateVisibleDock);
});
</script>

<style scoped>
.dock {
  z-index: 1000;
}
</style>