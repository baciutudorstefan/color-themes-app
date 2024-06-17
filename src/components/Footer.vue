<template>
  <section class="p-44 flex flex-col gap-x-7 items-center">
    <p class="text-4xl leading-10 font-semibold" :style="{ color: shades.text && shades.text[8] ? shades.text[8].color : colorSettings.text}" >Stay up to date with everything we do!</p>
    <button :style="{ backgroundColor: shades.primary && shades.primary[5] ? shades.primary[5].color : colorSettings.primary, color: shades.secondary && shades.secondary[1] ? shades.secondary[1].color : colorSettings.secondary}" class="mt-6 py-2 px-6 rounded-lg mb-2 text-left flex flex-row items-center text-sm leading-5 font-medium">
      Learn more
      </button>
  </section>
  <span class="w-full border " :style="{ borderColor: shades.accent && shades.accent[3] ? shades.accent[3].color : colorSettings.accent}"></span>
  <p class="text-xs leading-4 font-normal text-center py-8" :style="{ color: shades.secondary && shades.secondary[6] ? shades.secondary[6].color : colorSettings.secondary}">✨ Designed by Vlad Grama & Developed by Tudor Baciu</p>
</template>

<script lang="ts" setup>
import { defineProps, onMounted } from 'vue';
import type { ColorSettings } from '../interfaces/ColorSettings';

interface Shade {
  name: string;
  color: string;
}

const props = defineProps<{ colorSettings: ColorSettings; shades: { [key: string]: Shade[] } }>();
</script>
