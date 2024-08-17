<template>
  <div
    v-if="loading"
    class="p-6 w-[100%] h-[100%] flex flex-col justify-center items-center backdrop-blur-sm select-none text text-white"
  >
    <div v-if="failed">
      <h1 class="text-4xl">获取天气数据失败</h1>
      <p class="text-2xl">请坐和放宽，检查网络连接，或者联系MathCalculus。</p>
    </div>
    <div v-else>
      <h1 class="text-4xl">获取天气数据中...</h1>
    </div>
  </div>
  <div v-else class="flex flex-col lg:flex-row h-full w-full p-4 text text-white">
    <div class="flex-1 lg:ml-64 text-center lg:text-left mb-12">
      <h1 class="text-5xl">{{ city }}</h1>
      <h2 class="text-8xl font-medium">
        {{ currentTemperature }}<span class="text-4xl align-super">℃</span>
      </h2>
      <p class="text-5xl">{{ currentCondition }}</p>
      <div class="hidden lg:flex justify-center lg:justify-start space-x-4 mt-4 lg:mt-24">
        <button class="p-3 rounded">
          <img
            src="/icon/setting.svg"
            alt="Setting"
            class="w-8 h-8 select-none"
            draggable="false"
          />
        </button>
        <button class="p-1 rounded">
          <img
            src="/icon/info.svg"
            alt="Info"
            class="w-8 h-8 select-none"
            draggable="false"
          />
        </button>
      </div>
    </div>
    <div class="flex-1 lg:mr-64 px-8 lg:px-0">
      <div class="mb-12">
        <div class="bg-white/[0.08] rounded-[18px] p-4 mb-4">
          <div class="columns-2">
            <p class="text-4xl">
              {{ maxTemperature }}<span class="text-2xl align-super">℃</span>
            </p>
            <p class="text-2xl align-middle">最高</p>
          </div>
          <div class="columns-2">
            <p class="text-4xl">
              {{ minTemperature }}<span class="text-2xl align-super">℃</span>
            </p>
            <p class="text-2xl align-middle">最低</p>
          </div>
        </div>
        <div class="bg-white/[0.08] rounded-[18px] p-4">
          <p class="text-2xl">AQI</p>
          <p class="text-4xl align-middle">{{ aqi }} - {{ aqiQualityLevel }}</p>
        </div>
      </div>
      <div class="flex lg:hidden justify-center lg:justify-start space-x-4 mt-4 lg:mt-24">
        <button class="p-3 rounded">
          <img
            src="/icon/setting.svg"
            alt="Setting"
            class="w-8 h-8 select-none"
            draggable="false"
          />
        </button>
        <button class="p-1 rounded">
          <img
            src="/icon/info.svg"
            alt="Info"
            class="w-8 h-8 select-none"
            draggable="false"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

const city = ref("济宁市");
const currentTemperature = ref(0);
const currentCondition = ref(0);
const maxTemperature = ref(0);
const minTemperature = ref(0);
const aqi = ref(0);
const aqiQualityLevel = ref("");
const loading = ref(true);
const failed = ref(false);

const fetchWeatherData = async () => {
  const url = `https://api.oioweb.cn/api/weather/weather?city_name=${city.value}`;
  try {
    const response = await axios.get(url);
    const data = response.data.result;
    console.log(data);
    currentTemperature.value = data.current_temperature;
    currentCondition.value = data.current_condition;
    maxTemperature.value = data.high_temperature;
    aqi.value = data.aqi;
    aqiQualityLevel.value = data.quality_level;
    minTemperature.value = data.low_temperature;
    loading.value = false;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    failed.value = true;
    loading.value = false;
  }
};

onMounted(() => {
  fetchWeatherData();
});
</script>
