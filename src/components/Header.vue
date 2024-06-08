<template>
    <header :style="{ backgroundColor: colorSettings.primary }" class="shadow-md">
      <nav class="container mx-auto p-4 flex justify-between items-center">
        <!-- <a href="#" class="text-xl font-bold text-white">ColorTheme</a> -->
        <div>
          <a href="#" class="text-sm text-white hover:text-secondary mr-4">Features</a>
          <a href="#" class="text-sm text-white hover:text-secondary">Examples</a>
        </div>
      </nav>
    </header>
  </template>
  
  <script lang="ts" setup>
  import { defineProps } from 'vue';
  import type { ColorSettings } from '../interfaces/ColorSettings';
  
  const props = defineProps<{ colorSettings: ColorSettings }>();
  </script>
  