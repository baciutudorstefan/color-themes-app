<template>
  <section class="mt-8 flex flex-row gap-x-7">
    <div class="container mx-auto text-center p-4 pt-6 pl-6 border border-1 rounded-md border-slate-100 w-[739px]">
      <h2 class="text-3xl font-bold mb-1 text-left text-gray-800">Buttons</h2>
      <div class="flex flex-row">
        <div class="flex flex-wrap justify-center w-[333px]">
          <button :style="{ backgroundColor: shades.primary && shades.primary[5] ? shades.primary[5].color : colorSettings.primary, color: '#fff' }" class="w-[333px] py-2 px-4 rounded-lg mb-2 mr-2">Primary</button>
          <button :style="{ backgroundColor: shades.primary && shades.primary[6] ? shades.primary[6].color : colorSettings.primary, color: '#fff' }" class="w-[333px] py-2 px-4 rounded-lg mb-2 mr-2">Secondary</button>
          <button :style="{ backgroundColor: shades.primary && shades.primary[6] ? shades.primary[6].color : colorSettings.primary, color: '#fff' }" class="w-[333px] py-2 px-4 rounded-lg mb-2 mr-2">Accent</button>
          <button :style="{ backgroundColor: shades.primary && shades.primary[1] ? shades.primary[1].color : colorSettings.primary, color: shades.primary && shades.primary[4] ? shades.primary[4].color : colorSettings.primary }" class="w-[333px] py-2 px-4 rounded-lg mb-2 mr-2">Accent</button>
        </div>
        <div class="flex flex-wrap justify-center w-[333px]">
          <button :style="{ borderColor: shades.primary && shades.primary[5] ? shades.primary[5].color : colorSettings.primary, color: shades.primary && shades.primary[5] ? shades.primary[5].color : colorSettings.primary }" class="w-[333px] py-2 px-4 rounded-lg mb-2 border">Primary</button>
          <button :style="{ borderColor: shades.primary && shades.primary[6] ? shades.primary[6].color : colorSettings.primary, color: shades.primary && shades.primary[6] ? shades.primary[6].color : colorSettings.primary }" class="w-[333px] py-2 px-4 rounded-lg mb-2 border">Secondary</button>
          <button :style="{ borderColor: shades.primary && shades.primary[7] ? shades.primary[7].color : colorSettings.primary, color: shades.primary && shades.primary[7] ? shades.primary[7].color : colorSettings.primary }" class="w-[333px] py-2 px-4 rounded-lg mb-2 border">Accent</button>
          <button :style="{ borderColor: shades.primary && shades.primary[2] ? shades.primary[2].color : colorSettings.primary, color: shades.primary && shades.primary[2] ? shades.primary[2].color : colorSettings.primary }" class="w-[333px] py-2 px-4 rounded-lg mb-2 border">Accent</button>
        </div>
      </div>
    </div>
    <div class="relative">
      <img class="object-cover object-center scale-1 h-[288px] w-[357px] border border-1 rounded-md" src="../assets/overlay-image.jpeg" alt="">
      <div class="absolute inset-0 flex items-center justify-center rounded-md" :style="{ backgroundColor: (shades.primary && shades.primary[6] ? shades.primary[6].color : colorSettings.primary) + '90' }">
        <p class="text-white text-lg"></p>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { defineProps, onMounted } from 'vue';
import type { ColorSettings } from '../interfaces/ColorSettings';

interface Shade {
  name: string;
  color: string;
}

const props = defineProps<{ colorSettings: ColorSettings; shades: { [key: string]: Shade[] } }>();

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

onMounted(() => {
  console.log(props.shades.primary);
});
</script>
