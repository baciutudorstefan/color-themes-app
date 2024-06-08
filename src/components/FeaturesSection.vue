<template>
    <section class="py-20">
      <div class="container mx-auto text-center">
        <h2 class="text-3xl font-bold mb-8">What is this?</h2>
        <div class="flex flex-wrap justify-center">
          <div class="max-w-xs bg-white shadow-md rounded-lg p-4 m-4">
            <div :style="{ backgroundColor: colorSettings.primary }" class="text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">✔</div>
            <h3 class="text-xl font-bold mb-2">Feature 1</h3>
            <p class="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div class="max-w-xs bg-white shadow-md rounded-lg p-4 m-4">
            <div :style="{ backgroundColor: colorSettings.secondary }" class="text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">✔</div>
            <h3 class="text-xl font-bold mb-2">Feature 2</h3>
            <p class="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div class="max-w-xs bg-white shadow-md rounded-lg p-4 m-4">
            <div :style="{ backgroundColor: colorSettings.accent }" class="text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">✔</div>
            <h3 class="text-xl font-bold mb-2">Feature 3</h3>
            <p class="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script lang="ts" setup>
  import { defineProps } from 'vue';
  import type { ColorSettings } from '../interfaces/ColorSettings';
  
  const props = defineProps<{ colorSettings: ColorSettings }>();
  </script>
  