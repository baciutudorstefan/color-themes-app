<template>
    <section :style="{ backgroundColor: colorSettings.primary }" class="text-white text-center py-20">
      <div class="container mx-auto">
        <h1 class="text-4xl font-bold mb-4">Test your UI colors</h1>
        <p class="text-lg mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <button :style="{ backgroundColor: colorSettings.secondary, color: colorSettings.primary }" class="py-2 px-4 rounded-lg mr-2">Primary Action</button>
        <button :style="{ backgroundColor: colorSettings.accent, color: '#fff' }" class="py-2 px-4 rounded-lg">Secondary Action</button>
      </div>
    </section>
  </template>
  
  <script lang="ts" setup>
  import { defineProps } from 'vue';
  import type { ColorSettings } from '../interfaces/ColorSettings';
  
  const props = defineProps<{ colorSettings: ColorSettings }>();
  </script>
  