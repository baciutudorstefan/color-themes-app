<template>
    <section >
      <div class="container mx-auto ">
        <h2 class="text-3xl font-bold mb-8 text-gray-800" >What is this?</h2>
        <div class="flex flex-wrap justify-between space-x-4">
          <!-- Card 1 -->
          <div class="text-white h-[400px] w-[357px] p-4 rounded-md" :style="{color: shades.primary && shades.accent[1] ? shades.accent[1].color : colorSettings.accent,backgroundColor: shades.primary && shades.primary[5] ? shades.primary[5].color : colorSettings.primary}">
            <h3 class="text-5xl leading-none font-light " :style="{color: shades.primary && shades.accent[1] ? shades.accent[1].color : colorSettings.accent}">What is<br> this?</h3>
            <p class="mt-4 text-base leading-6 font-normal w-[224px]">Lorem ipsum dolor sit amet consectetur. Et hac donec sapien adipiscing duis pulvinar consectetur blandit. In aliquam tempus parturient justo cursus.</p>
          </div>
          <!-- Card 2 -->
          <div class="border h-[400px] w-[357px] p-4 rounded-md" :style="{color: shades.primary && shades.primary[7] ? shades.primary[7].color : colorSettings.primary, backgroundColor: shades.primary && shades.primary[1] ? shades.primary[1].color : colorSettings.primary, borderColor: shades.primary && shades.primary[5] ? shades.primary[5].color : colorSettings.primary}">
            <h3 class="text-5xl leading-none font-light">What is<br> this?</h3>
            <p class="mt-4 text-base leading-6 font-normal w-[224px]">Lorem ipsum dolor sit amet consectetur. Et hac donec sapien adipiscing duis pulvinar consectetur blandit. In aliquam tempus parturient justo cursus.</p>
          </div>
          <!-- Card 3 -->
          <div class="border h-[400px] w-[357px] p-4 rounded-md" :style="{color: shades.accent && shades.accent[1] ? shades.accent[1].color : colorSettings.accent, backgroundColor: shades.accent && shades.accent[4] ? shades.accent[4].color : colorSettings.accent}">
            <h3 class="text-5xl leading-none font-light">What is<br> this?</h3>
            <p class="mt-4 text-base leading-6 font-normal w-[224px]">Lorem ipsum dolor sit amet consectetur. Et hac donec sapien adipiscing duis pulvinar consectetur blandit. In aliquam tempus parturient justo cursus.</p>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  
  <script lang="ts" setup>
  import { defineProps } from 'vue';
  import type { ColorSettings } from '../interfaces/ColorSettings';
  


  interface Shade {
  name: string;
  color: string;
}

const props = defineProps<{ colorSettings: ColorSettings; shades: { [key: string]: Shade[] } }>();
</script>
  