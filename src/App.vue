<template>
  <div :style="{ backgroundColor: colorSettings.background }" class="min-h-screen flex flex-col w-fixed-custom-container m-auto">
    <div >
      <div class="fixed top-0 left-0 ml-[13.33%] z-50">
        <button @click="toggleNavigation" class="text-black mb-4"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
        </svg>
        </button>
        
      </div>
      <!-- Navigation section -->
      <div ref="navigationSection" :class="{ 'navigation-section': true, 'active': showNavigation }" class="w-96">
        <div class="flex flex-col md:flex-cols-2 lg:flex-cols-4 gap-4">
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
    <Header :colorSettings="colorSettings"  />
    <HeroSection :colorSettings="colorSettings"  />
    <FeaturesSection :colorSettings="colorSettings"  />
    <ExamplesSection :colorSettings="colorSettings" />
    <WhatsThis :colorSettings="colorSettings"  />
    <ButtonsSection :colorSettings="colorSettings"  :shades="shades"/>
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import Header from './components/Header.vue';
import HeroSection from './components/HeroSection.vue';
import FeaturesSection from './components/FeaturesSection.vue';
import ExamplesSection from './components/ExamplesSection.vue';
import WhatsThis from './components/WhatsThis.vue';
import ButtonsSection from './components/ButtonsSection.vue';
import Footer from './components/Footer.vue';
import ColorInput from './components/ColorInput.vue';
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

const updateColor = (key: keyof ColorSettings, value: string) => {
  colorSettings[key] = value;
};
const shades = reactive<{ [key in keyof ColorSettings]?: Shade[] }>({});
const updateShades = (key: keyof ColorSettings, newShades: Shade[]) => {
  shades[key] = newShades;
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const showNavigation = ref(false);

const toggleNavigation = () => {
  showNavigation.value = !showNavigation.value;
  console.log('Toggle navigation:', showNavigation.value);
  if (showNavigation.value) {
    document.addEventListener('click', handleClickOutside);
  } else {
    document.removeEventListener('click', handleClickOutside);
  }
};

const handleClickOutside = (event: MouseEvent) => {
  console.log('Clicked outside');
  const navigationSection = navigationSectionRef.value;
  if (navigationSection && !(navigationSection as HTMLElement).contains(event.target as Node)) {
    showNavigation.value = false;
    console.log('Navigation closed');
    document.removeEventListener('click', handleClickOutside);
  }
};

const navigationSectionRef = ref<HTMLElement | null>(null);

// Remove event listener when component is unmounted
import { onBeforeUnmount } from 'vue';
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

</script>

<style>
body {
  font-family: 'Inter', sans-serif;
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
</style>
