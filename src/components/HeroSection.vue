<template>
  <section  class="text-white text-center flex-auto flex justify-between ">
    <!-- First Section -->
    <div class="text-left w-1/2">
      <h1 class="font-bold mb-4 text-7xl text-slate-800" :style="{ color: colorSettings.text }">Test your UI colors</h1>
      <p class="text-base mb-8 mt-5 text-slate-800" :style="{  color: colorSettings.text }">Lorem ipsum dolor sit amet consectetur. Et hac donec <br> sapien adipiscing duis pulvinar consectetur blandit. In <br>aliquam tempus parturient justo cursus.</p>
      <button :style="{ backgroundColor: colorSettings.secondary, color: colorSettings.accent }" class="py-2 px-4 rounded-lg mr-2 text-sm bg-blue-100">Learn more</button>
      <button :style="{ backgroundColor: colorSettings.accent, color: colorSettings.secondary}" class="py-2 px-4 rounded-lg text-sm	bg-blue-500">Learn more</button>
    </div>

    <!-- Second Section -->
    <div class="mx-auto w-1/4 flex flex-col items-center">
  <!-- First row -->
  <div class="w-40 h-40 bg-blue-100 rounded-lg mb-6 ml-20" :style="{ backgroundColor: colorSettings.secondary}"></div> <!-- Add margin bottom to separate it from the next row -->

  <!-- Second row -->
  <span class="flex"> 
    <div class="w-40 h-40 bg-gray-400 rounded-lg mr-4 -mt-4" :style="{ backgroundColor: colorSettings.accent}"></div> <!-- Add margin right to separate it from the next div -->
    <div class="w-64 h-64 bg-blue-500 rounded-lg" ></div>
  </span>
</div>
  </section>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import type { ColorSettings } from '../interfaces/ColorSettings';

const props = defineProps<{ colorSettings: ColorSettings }>();
</script>
