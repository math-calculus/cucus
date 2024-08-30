<template>
  <div class="flex flex-col text text-white w-full space-y-4 ml-48 mr-48 min-w-[80%] max-w-[900px]">
    <div class="flex-row space-x-4">
      <div class="card p-6 pl-7 pr-7">
        <p class="text-lg">你好</p>
        <p class="text-4xl">
          我是<span class="name font-medium ml-2">MathCalculus</span>
        </p>
      </div>
    </div>
    <div class="flex-row space-x-4">
      <div class="card p-6 pl-7 pr-7">
        <p class="text-lg">在这里联系我吧~</p>
        <div class="flex flex-row space-x-4 fill-white mt-3">
          <font-awesome-icon :icon="['fab', 'github-alt']" class="w-6 h-6" onclick="window.open('https://github.com/math-calculus')" />
          <font-awesome-icon :icon="['fab', 'bilibili']" class="w-6 h-6" onclick="window.open('https://space.bilibili.com/546847728')" />
          <font-awesome-icon :icon="['fab', 'qq']" class="w-6 h-6" onclick="alert('QQ号：2504556268')" />
          <font-awesome-icon :icon="['fas', 'envelope']" class="w-6 h-6" onclick="window.open('mailto:mcalusak@gmail.com')" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.card {
  @apply bg-white/[0.08] rounded-[24px];
}
.name {
  background: linear-gradient(
      257deg,
      rgba(249, 0, 255, 0.4) 11%,
      rgba(0, 219, 222, 0.4) 94%
    ),
    #ffffff;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
