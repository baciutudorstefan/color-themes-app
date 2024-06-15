<template>
    <section >
      <div class="container mx-auto ">
        <h2 class="text-3xl font-bold mb-8 text-gray-800">What is this?</h2>
        <div class="flex flex-wrap justify-between space-x-4">
          <!-- Card 1 -->
          <div class="bg-blue-500 text-white p-1 h-[400px] max-w-[357px] p-4 rounded-md">
            <h3 class="text-2xl font-bold">What is this?</h3>
            <p class="mt-4">Lorem ipsum dolor sit amet consectetur. Et hac donec sapien adipiscing duis pulvinar consectetur blandit. In aliquam tempus parturient justo cursus.</p>
          </div>
          <!-- Card 2 -->
          <div class="bg-blue-100 text-blue-700 border border-blue-500 p-1 h-[400px] max-w-[357px] p-4 rounded-md">
            <h3 class="text-2xl font-bold">What is this?</h3>
            <p class="mt-4">Lorem ipsum dolor sit amet consectetur. Et hac donec sapien adipiscing duis pulvinar consectetur blandit. In aliquam tempus parturient justo cursus.</p>
          </div>
          <!-- Card 3 -->
          <div class="bg-gray-500 text-white p-1 h-[400px] max-w-[357px] p-4 rounded-md">
            <h3 class="text-2xl font-bold">What is this?</h3>
            <p class="mt-4">Lorem ipsum dolor sit amet consectetur. Et hac donec sapien adipiscing duis pulvinar consectetur blandit. In aliquam tempus parturient justo cursus.</p>
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
  