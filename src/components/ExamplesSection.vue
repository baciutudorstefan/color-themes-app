<template>
  <section class="py-12">
    <div class="container mx-auto text-center">
      <h2 class="text-3xl font-bold mb-8" :style="{ color: colorSettings.text }">Examples</h2>
      <div class="flex flex-wrap justify-center">
        <!-- Example card -->
        <div class="border border-slate-100 rounded-lg shadow-md flex w-[100%] p-5 justify-between	">
          <!-- Text section -->
          <div class="p-6 w-[320px] z-10 text-left" >
            <h3 class="text-2xl leading-8 font-normal mb-4" :style="{ color: colorSettings.text }">What is this?</h3>
            <p class="text-base leading-6 font-normal text-gray-700 mb-4 " :style="{ color: colorSettings.text }">
              Lorem ipsum dolor sit amet consectetur. Et hac donec sapien adipiscing duis pulvinar consectetur blandit. In aliquam tempus parturient justo cursus.
            </p>
            <button class="px-4 py-2 rounded text-sm leading-5 font-medium" :style="{ backgroundColor: shades.secondary && shades.secondary[1] ? shades.secondary[1].color : colorSettings.secondary, color: shades.primary && shades.primary[8] ? shades.primary[8].color : colorSettings.primary}">Learn more</button>
          </div>

          <!-- Image section -->
          <div class="relative w-[720px] h-[320px] rounded-r-lg overflow-hidden">
            <img src="https://images.unsplash.com/photo-1628210726948-4979adb3d9d0?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Example Image" class="object-cover object-center scale-1 h-full w-full">
            <svg width="161" class="absolute top-0 left-0 w-full h-full" height="320" viewBox="0 0 686 320" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M35.1634 0C12.8231 48.9279 0.415039 103.061 0.415039 160C0.415039 216.939 12.8231 271.072 35.1634 320H160.347C128.883 274.172 110.55 219.16 110.55 160C110.55 100.84 128.883 45.8276 160.347 0H35.1634Z" :fill="shades.primary && shades.primary[4] ? shades.primary[4].color : colorSettings.primary"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { defineProps,ref,onMounted,watch } from 'vue';
import type { ColorSettings } from '../interfaces/ColorSettings';


interface Shade {
  name: string;
  color: string;
}

const props = defineProps<{ colorSettings: ColorSettings, shades: { [key: string]: Shade[] } }>();

</script>