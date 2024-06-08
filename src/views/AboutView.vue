<template>
  <div :style="{ backgroundColor: colorSettings.background }" class="min-h-screen flex flex-col">
    <Header :colorSettings="colorSettings" />
    <HeroSection :colorSettings="colorSettings" />
    <FeaturesSection :colorSettings="colorSettings" />
    <ExamplesSection />
    <ButtonsSection :colorSettings="colorSettings" />
    <div class="container mx-auto py-8">
      <h2 class="text-2xl font-bold mb-4">About View</h2>
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
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import Header from '../components/Header.vue';
import HeroSection from '../components/HeroSection.vue';
import FeaturesSection from '../components/FeaturesSection.vue';
import ExamplesSection from '../components/ExamplesSection.vue';
import ButtonsSection from '../components/ButtonsSection.vue';
import Footer from '../components/Footer.vue';
import ColorInput from '@/components/ColorInput.vue';
import type { ColorSettings } from '../interfaces/ColorSettings';

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
</script>

<style>
body {
  font-family: 'Inter', sans-serif;
}
</style>