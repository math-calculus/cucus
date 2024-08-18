<template>
  <div class="flex flex-col items-center w-full text">
    <div
      class="w-full h-2 bg-white/[0.08] rounded-full relative cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-y-150"
      @mousedown="startDrag"
      ref="progressBar"
    >
      <div
        class="h-full bg-white/[0.7] rounded-full rounded-r-none"
        :style="{ width: progress + '%' }"
      ></div>
    </div>
    <div class="flex justify-between w-full mt-2 text-white/[0.4] text-sm">
      <span>{{ formatTime(currentTime) }}</span>
      <span>{{ formatTime(duration) }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { toRefs } from "vue";

const props = defineProps({
  initialCurrentTime: {
    type: Number,
    default: 0,
  },
  initialDuration: {
    type: Number,
    default: 1,
  },
});

const emit = defineEmits(["update:currentTime"]);

const { initialCurrentTime, initialDuration } = toRefs(props);

const progress = ref(0);
const currentTime = ref(initialCurrentTime.value);
const duration = ref(initialDuration.value);

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const updateProgress = (e, progressBar) => {
  const rect = progressBar.getBoundingClientRect();
  const offsetX = e.clientX - rect.left;
  const newProgress = Math.min(Math.max(offsetX / rect.width, 0), 1) * 100;
  progress.value = newProgress;
  currentTime.value = (newProgress / 100) * duration.value;
  emit("update:currentTime", currentTime.value);
};

const startDrag = (event) => {
  const progressBar = event.currentTarget;
  updateProgress(event, progressBar);

  const onMouseMove = (e) => updateProgress(e, progressBar);
  const onMouseUp = () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
};

watch(initialCurrentTime, (newVal) => {
  currentTime.value = newVal;
  progress.value = (newVal / duration.value) * 100;
});

watch(initialDuration, (newVal) => {
  duration.value = newVal;
  progress.value = (currentTime.value / newVal) * 100;
});

watch(currentTime, (newVal) => {
  progress.value = (newVal / duration.value) * 100;
});

onMounted(() => {
  progress.value = (currentTime.value / duration.value) * 100;
});
</script>
