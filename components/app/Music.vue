<template>
  <div class="h-full overflow-auto">
    <div class="flex flex-col mt-24 items-center justify-center mb-36">
      <div class="flex-1 text text-white select-none">
        <div
          :style="{
            backgroundImage: `url(${playingSong.pic})`,
            backgroundColor: 'rgba(255, 255, 255, 0.16)',
            transform: isPlaying ? 'scale(1)' : 'scale(0.85)',
          }"
          class="rounded-[24px] w-[330px] h-[330px] max-w-none max-h-none transition-transform duration-300 ease-in-out bg-cover bg-center"
          draggable="false"
        ></div>
        <div class="text-2xl font-medium pt-6">{{ playingSong.title }}</div>
        <div class="text-1xl text-[#9E9E9E] pt-1 pb-4">{{ playingSong.author }}</div>
        <UiProgress
          :initialDuration="duration"
          :initialCurrentTime="currentTime"
          @update:currentTime="seekAudio"
        />
        <audio
          ref="audio"
          :src="playingSong.url"
          @timeupdate="updateTime"
          @loadedmetadata="updateDuration"
          @ended="skipNxt"
        ></audio>
        <div class="mt-4 flex items-center justify-center gap-4 ml-auto mr-auto">
          <button @click="skipPre" class="relative group">
            <img
              :src="'/icon/skipPre.svg'"
              alt="skip-pre"
              class="w-8 h-8 relative z-10 group-active:scale-90 transition-transform duration-300"
              draggable="false"
            />
          </button>
          <button @click="togglePlayPause" class="relative group">
            <img
              :src="isPlaying ? '/icon/pause.svg' : '/icon/play.svg'"
              alt="Play/Pause"
              class="w-8 h-8 ml-8 mr-8 relative z-10 group-active:scale-90 transition-transform duration-300"
              draggable="false"
            />
          </button>
          <button @click="skipNxt" class="relative group">
            <img
              :src="'/icon/skipNxt.svg'"
              alt="skip-next"
              class="w-8 h-8 relative z-10 group-active:scale-90 transition-transform duration-300"
              draggable="false"
            />
          </button>
        </div>
      </div>
      <div class="flex-1"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const playlistId = 12217075508;
const playlist = ref([]);
const playingSong = ref({
  title: "",
  author: "",
  pic: "",
  url: "",
  lrc: "",
});
const audio = ref(null);
const currentTime = ref(0);
const duration = ref(0);
const isPlaying = ref(false);
const playingIndex = ref(0);

const playMusic = () => {
  if (audio.value && useOpenedMusic().value) {
    audio.value.play();
    isPlaying.value = true;
  }
};

const pauseMusic = () => {
  if (audio.value) {
    audio.value.pause();
    isPlaying.value = false;
  }
};

const fetchPlaylist = async () => {
  const res = await fetch(
    `https://music-api.cucus.site/api?server=netease&type=playlist&id=${playlistId}`
  );
  const data = await res.json();
  playlist.value = data;
  if (playlist.value.length > 0) {
    playingSong.value = playlist.value[0];
    playingIndex.value = 0;
    playMusic();
  }
};

const updateTime = () => {
  if (audio.value) {
    currentTime.value = audio.value.currentTime;
  }
};

const updateDuration = () => {
  if (audio.value) {
    duration.value = audio.value.duration;
  }
};

const seekAudio = (time) => {
  if (audio.value) {
    audio.value.currentTime = time;
  }
};

const togglePlayPause = () => {
  if (audio.value) {
    if (audio.value.paused) {
      playMusic();
    } else {
      pauseMusic();
      isPlaying.value = false;
    }
  }
};

const skipPre = () => {
  if (playlist.value.length > 0) {
    playingIndex.value--;
    playingIndex.value =
      (playingIndex.value + playlist.value.length) % playlist.value.length;
    playingSong.value = playlist.value[playingIndex.value];
  }
};

const skipNxt = () => {
  if (playlist.value.length > 0) {
    playingIndex.value++;
    playingIndex.value = playingIndex.value % playlist.value.length;
    playingSong.value = playlist.value[playingIndex.value];
    playMusic();
  }
};

onMounted(() => {
  fetchPlaylist();
  if (audio.value) {
    audio.value.addEventListener("timeupdate", updateTime);
    audio.value.addEventListener("loadedmetadata", updateDuration);
    audio.value.addEventListener("loadedmetadata", playMusic);
  }
});
</script>
