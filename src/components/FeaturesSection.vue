Copy code
<template>
  <section class="text-center">
    <!-- Title in the middle -->
    <h2 class="text-3xl font-bold mb-8" :style="{ color: colorSettings.text }">What is this?</h2>
    
    <!-- Second row with 3 sections -->
    <div class="flex justify-around gap-4">
      <!-- First section -->
      <div class="flex flex-col text-left w-[357px] h-[340px] rounded-md border border-slate-100 p-4">
        <div class="w-8 h-8 bg-gray-400 rounded-lg mb-4" :style="{ backgroundColor: colorSettings.primary }" ></div>
        <h3 class="mb-6 mt-6 text-2xl leading-8 font-normal" :style="{ color: colorSettings.text }">What is this?</h3>
        <p class="text-lg font-normal leading-7"  :style="{ color: colorSettings.text }">Lorem ipsum dolor sit amet consectetur. Et hac donec sapien adipiscing duis pulvinar consectetur blandit. In aliquam tempus parturient justo cursus.</p>
      </div>
       
      <!-- Second section -->
      <div class="flex flex-col text-left w-[357px] h-[340px] rounded-md border-1 border border-slate-100 p-4	" >
        <div class="w-8 h-8 bg-gray-400 rounded-lg mb-4" :style="{ backgroundColor: colorSettings.secondary }"></div>
        <h3 class="mb-6 mt-6 text-2xl leading-8 font-normal" :style="{ color: colorSettings.text }">What is this?</h3>
        <p class="text-lg font-normal leading-7"  :style="{ color: colorSettings.text }">Lorem ipsum dolor sit amet consectetur. Et hac donec sapien adipiscing duis pulvinar consectetur blandit. In aliquam tempus parturient justo cursus.</p>
      </div>
       
      <!-- Third section -->
      <div class="flex flex-col text-left w-[357px] h-[340px] rounded-md border-1 border border-slate-100 p-4	" :class="colorSettings.background">
        <div class="w-8 h-8 bg-gray-400 rounded-lg mb-4" :style="{ backgroundColor: colorSettings.accent }"></div>
        <h3 class="mb-6 mt-6 text-2xl leading-8 font-normal" :style="{ color: colorSettings.text }">What is this?</h3>
        <p class="text-lg font-normal leading-7"  :style="{ color: colorSettings.text }">Lorem ipsum dolor sit amet consectetur. Et hac donec sapien adipiscing duis pulvinar consectetur blandit. In aliquam tempus parturient justo cursus.</p>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import type { ColorSettings } from '../interfaces/ColorSettings';

const props = defineProps<{ colorSettings: ColorSettings }>();
</script>
