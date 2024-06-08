<template>
    <section class="py-20">
      <div class="container mx-auto text-center">
        <h2 class="text-3xl font-bold mb-8">Buttons</h2>
        <div class="flex flex-wrap justify-center">
          <button :style="{ backgroundColor: colorSettings.primary, color: '#fff' }" class="py-2 px-4 rounded-lg m-2">Primary</button>
          <button :style="{ backgroundColor: colorSettings.secondary, color: colorSettings.primary }" class="py-2 px-4 rounded-lg m-2">Secondary</button>
          <button :style="{ backgroundColor: colorSettings.accent, color: '#fff' }" class="py-2 px-4 rounded-lg m-2">Accent</button>
        </div>
      </div>
    </section>
  </template>
  
  <script lang="ts" setup>
  import { defineProps } from 'vue';
  import type { ColorSettings } from '../interfaces/ColorSettings';
  
  const props = defineProps<{ colorSettings: ColorSettings }>();
  </script>
  