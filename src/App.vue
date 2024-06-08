<template>
  <div :style="{ backgroundColor: colorSettings.background }" class="min-h-screen flex flex-col w-screen">
    <Header :colorSettings="colorSettings" />
    <HeroSection :colorSettings="colorSettings" />
    <FeaturesSection :colorSettings="colorSettings" />
    <ExamplesSection />
    <ButtonsSection :colorSettings="colorSettings" />
    <div class="container mx-auto py-8">
      <h2 class="text-2xl font-bold mb-4">Customize Colors</h2>
      <!-- Toggle button for the navigation section -->
      <div class="fixed top-0 left-0 z-50">
        <button @click="toggleNavigation" class="text-black mb-4">Toggle Colors Navigation</button>
      </div>      <!-- Navigation section -->
      <div :class="{ 'navigation-section': true, 'active': showNavigation }">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <ColorInput
            v-for="(color, key) in colorSettings"
            :key="key"
            :label="capitalize(key)"
            :id="key"
            :color="color"
            @update:color="updateColor(key, $event)"
          />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import Header from './components/Header.vue';
import HeroSection from './components/HeroSection.vue';
import FeaturesSection from './components/FeaturesSection.vue';
import ExamplesSection from './components/ExamplesSection.vue';
import ButtonsSection from './components/ButtonsSection.vue';
import Footer from './components/Footer.vue';
import ColorInput from './components/ColorInput.vue';
import type { ColorSettings } from './interfaces/ColorSettings';

const colorSettings = reactive<ColorSettings>({
  primary: '#3490dc',
  secondary: '#ffed4a',
  accent: '#e3342f',
  background: '#ffffff',
});

const updateColor = (key: keyof ColorSettings, value: string) => {
  colorSettings[key] = value;
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// Data property to control the visibility of the navigation section
const showNavigation = ref(false);

// Method to toggle the visibility of the navigation section
const toggleNavigation = () => {
  showNavigation.value = !showNavigation.value;
};
</script>

<style>
body {
  font-family: 'Inter', sans-serif;
}

.navigation-section {
  width: 350px; /* Adjust the width as needed */
  background-color: #f3f4f6;
  padding: 20px;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  overflow-y: auto;
  transition: transform 0.3s ease-in-out;
  transform: translateX(-100%);
}

.navigation-section.active {
  transform: translateX(0);
}
</style>
