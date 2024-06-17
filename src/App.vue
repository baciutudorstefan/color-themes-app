<template>
  <div :style="{ backgroundColor: colorSettings.background }" class="w-dvw">
    <div class="min-h-screen flex flex-col w-fixed-custom-container ml-auto	mr-auto	 z-40">
    <div>
      <div class="fixed top-0 left-0 ml-[13.33%] z-50">
        <button @click.stop="toggleNavigation" class="text-black mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
          </svg>
        </button>
      </div>
      <!-- Navigation section -->
      <div ref="navigationSection" :class="{ 'navigation-section': true, 'active': showNavigation }" class="w-96">
        <div class="mt-4">
          <label for="font-family" class="block mb-2">Font Family</label>
          <select id="font-family" v-model="selectedFont" @change="updateFontFamily" class="p-2 border rounded text-grey-900">
            <option v-for="font in fonts" :key="font" :value="font">{{ font }}</option>
          </select>
        </div>
        <div class="mt-4">
          <label for="theme-select" class="block mb-2">Select Theme</label>
          <select id="theme-select" v-model="selectedTheme" @change="applyTheme" class="p-2 border rounded text-grey-900">
            <option v-for="(theme, index) in themes" :key="index" :value="index">{{ theme.name }}</option>
          </select>
        </div>
        <div class="flex flex-col md:flex-cols-2 lg:flex-cols-4 gap-4 mt-4">
          <ColorInput
            v-for="(color, key) in colorSettings"
            :key="key"
            :label="capitalize(key)"
            :id="key"
            :color="color"
            @update:color="updateColor(key, $event)"
            @update:shades="updateShades(key, $event)"
          />
        </div>
      </div>
    </div>
    <Header :colorSettings="colorSettings" />
    <HeroSection :colorSettings="colorSettings" :shades="shades" />
    <FeaturesSection :colorSettings="colorSettings" :shades="shades" />
    <ExamplesSection :colorSettings="colorSettings" :shades="shades" />
    <WhatsThis :colorSettings="colorSettings" :shades="shades" />
    <ButtonsSection :colorSettings="colorSettings" :shades="shades" />
    <AlertSection :colorSettings="colorSettings" :shades="shades" />
    <Footer :colorSettings="colorSettings" :shades="shades" />
  </div>
</div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue';
import Header from './components/Header.vue';
import HeroSection from './components/HeroSection.vue';
import FeaturesSection from './components/FeaturesSection.vue';
import ExamplesSection from './components/ExamplesSection.vue';
import WhatsThis from './components/WhatsThis.vue';
import ButtonsSection from './components/ButtonsSection.vue';
import Footer from './components/Footer.vue';
import ColorInput from './components/ColorInput.vue';
import AlertSection from './components/AlertSection.vue';

import type { ColorSettings } from './interfaces/ColorSettings';

interface Shade {
  name: string;
  color: string;
}

const colorSettings = reactive<ColorSettings>({
  primary: '#60A5FA',
  secondary: '#DBEAFE',
  accent: '#94A3B8',
  background: '#FFFFFF',
  text: '#1E293B'
});

const shades = reactive<{ [key in keyof ColorSettings]?: Shade[] }>({});
const fonts = ref<string[]>(['Inter', 'Roboto', 'Arial', 'Georgia', 'Courier New']);
const selectedFont = ref<string>(fonts.value[1]);
const selectedTheme = ref<number | null>(null);
const showNavigation = ref(false);
const navigationSection = ref<HTMLElement | null>(null);

const themes = [
  {
    name: 'Default',
    settings: {
      primary: '#4B5563',   // More appealing dark gray
      secondary: '#9CA3AF', // Light gray for contrast
      accent: '#D1D5DB',    // Soft gray accent
      background: '#F3F4F6',// Light background
      text: '#111827'       // Dark text for readability
    }
  },
  {
    name: 'Dark Mode',
    settings: {
      primary: '#0F172A',   // Darker primary
      secondary: '#1E293B', // Dark secondary
      accent: '#475569',    // Darker accent
      background: '#0A0E1A',// Dark background
      text: '#E5E7EB'       // Light text for readability
    }
  },
  {
    name: 'Forest',
    settings: {
      primary: '#064E3B',
      secondary: '#10B981',
      accent: '#6EE7B7',
      background: '#D1FAE5',
      text: '#065F46'
    }
  },
  {
    name: 'Sunset',
    settings: {
      primary: '#F97316',
      secondary: '#FDBA74',
      accent: '#FDE68A',
      background: '#FFF7ED',
      text: '#7C2D12'
    }
  },
  {
    name: 'Ocean',
    settings: {
      primary: '#1E3A8A',   // Deeper blue
      secondary: '#3B82F6', // Bright secondary blue
      accent: '#60A5FA',    // Soft blue accent
      background: '#EFF6FF',// Light background
      text: '#1E40AF'       // Dark blue text
    }
  }
];

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const updateColor = (key: keyof ColorSettings, value: string) => {
  colorSettings[key] = value;
};

const applyTheme = () => {
  if (selectedTheme.value !== null) {
    const theme = themes[selectedTheme.value].settings;
    for (const key in theme) {
      if (theme.hasOwnProperty(key)) {
        colorSettings[key as keyof ColorSettings] = theme[key as keyof ColorSettings];
      }
    }
  }
};

const toggleNavigation = async () => {
  showNavigation.value = !showNavigation.value;
  console.log('Toggle navigation:', showNavigation.value);
};

const updateShades = (key: keyof ColorSettings, newShades: Shade[]) => {
  shades[key] = newShades;
};

const updateFontFamily = () => {
  document.body.style.fontFamily = selectedFont.value;
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    toggleNavigation();
  }
};

function handleClickOutside(event: Event) {
  if (navigationSection.value && !navigationSection.value.contains(event.target as Node)) {
    showNavigation.value = false;
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
  document.addEventListener('click', handleClickOutside);
  updateFontFamily(); // Apply the initial font family
  applyTheme(); // Apply the initial theme
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown);
  document.removeEventListener('click', handleClickOutside);
});
</script>


<style>
body {
  font-family: var(--selected-font-family, 'Inter'), sans-serif;
}

.navigation-section {
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

#font-family, #theme-select {
  color: #000;
  margin-top: 20px;
  padding: 10px;
  font-size: 16px;
}
</style>
