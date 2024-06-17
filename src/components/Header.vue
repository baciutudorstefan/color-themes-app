<template>
  <header class="mb-8">
    <nav class="mx-auto flex justify-between items-center ">
      <div class="flex items-center">
        
      </div>
      <div class="relative" ref="dropdownRef">
        <button @click="toggleDropdown" class="text-white bg-blue-500 px-4 py-2 rounded">
          Templates ▾
        </button>
        <div v-show="dropdownOpen" class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
          <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-gray-100">Template 1</a>
          <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-gray-100">Template 2</a>
  </div>
</div>
    </nav>
  </header>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { defineProps } from 'vue';
import type { ColorSettings } from '../interfaces/ColorSettings';

const props = defineProps<{ colorSettings: ColorSettings }>();
const dropdownOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value;
  console.log("Dropdown state: ", dropdownOpen.value);  // Debugging log
}

function handleClickOutside(event: Event) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    dropdownOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
/* Add any custom styles here if needed */
</style>
