<template>
  <div :style="{ backgroundColor: colorSettings.background }" class="w-dvw">
    <div class="min-h-screen flex flex-col w-fixed-custom-container ml-auto	mr-auto z-40">
        <header class="mb-8 mt-8 flex flex-row justify-between">
          <div class="z-50">
              <button @click.stop="toggleNavigation" class="text-black mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                </svg>
              </button>
            </div>
            <nav >
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
        <div>
          
        </div>
        <HeroSection :colorSettings="colorSettings" :shades="shades" />
        <FeaturesSection :colorSettings="colorSettings" :shades="shades" />
        <ExamplesSection :colorSettings="colorSettings" :shades="shades" />
        <WhatsThis :colorSettings="colorSettings" :shades="shades" />
        <ButtonsSection :colorSettings="colorSettings" :shades="shades" />
        <AlertSection :colorSettings="colorSettings" :shades="shades" />
        <Footer :colorSettings="colorSettings" :shades="shades" />
      </div>
    </div>

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
        <button @click="copyStylesToClipboard" class="text-white bg-green-500 px-4 py-2 rounded mt-4">
          Export
        </button>
      </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, watch,  onBeforeUnmount} from 'vue';
import { useRouter } from 'vue-router';
import HeroSection from './components/HeroSection.vue';
import FeaturesSection from './components/FeaturesSection.vue';
import ExamplesSection from './components/ExamplesSection.vue';
import WhatsThis from './components/WhatsThis.vue';
import ButtonsSection from './components/ButtonsSection.vue';
import Footer from './components/Footer.vue';
import ColorInput from './components/ColorInput.vue';
import AlertSection from './components/AlertSection.vue';

// Define interfaces
interface ColorSettings {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

interface Shade {
  name: string;
  color: string;
}

// Reactive variables
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

// Define themes
const themes = [
  {
    name: 'Default',
    settings: {
      primary: '#4B5563',
      secondary: '#9CA3AF',
      accent: '#D1D5DB',
      background: '#F3F4F6',
      text: '#111827'
    }
  },
  {
    name: 'Dark Mode',
    settings: {
      primary: '#0F172A',
      secondary: '#1E293B',
      accent: '#475569',
      background: '#0A0E1A',
      text: '#E5E7EB'
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
      primary: '#1E3A8A',
      secondary: '#3B82F6',
      accent: '#60A5FA',
      background: '#EFF6FF',
      text: '#1E40AF'
    }
  }
];

// Function to capitalize the first letter of a string
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// Function to update a specific color setting
const updateColor = (key: keyof ColorSettings, value: string) => {
  colorSettings[key] = value;
};

// Function to apply a selected theme
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

// Function to toggle navigation visibility
const toggleNavigation = () => {
  showNavigation.value = !showNavigation.value;
};

// Function to update shades for a specific color setting
const updateShades = (key: keyof ColorSettings, newShades: Shade[]) => {
  shades[key] = newShades;
};

// Function to handle keydown events (e.g., Escape key)
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    toggleNavigation();
  }
};

// Function to handle clicks outside the navigation section
const handleClickOutside = (event: Event) => {
  if (navigationSection.value && !navigationSection.value.contains(event.target as Node)) {
    showNavigation.value = false;
  }
};

// Router instance
const router = useRouter();

// Function to parse query parameters and initialize state
const parseQueryParams = () => {
  const { query } = router.currentRoute.value;

  // Parse selectedFont from query parameter
  if (query.selectedFont && fonts.value.includes(query.selectedFont as string)) {
    selectedFont.value = query.selectedFont as string;
  }

  // Parse selectedTheme from query parameter
  if (query.selectedTheme) {
    const themeIndex = parseInt(query.selectedTheme as string);
    if (!isNaN(themeIndex) && themeIndex >= 0 && themeIndex < themes.length) {
      selectedTheme.value = themeIndex;
    }
  }

  // Parse color settings from query parameters
  for (const key in colorSettings) {
    if (query[key]) {
      colorSettings[key as keyof ColorSettings] = query[key] as string;
    }
  }
};

// Watch for route changes and update state accordingly
watch(router.currentRoute, () => {
  parseQueryParams(); // Re-parse params on route change
}, { immediate: true });

// Function to update font family in document body
const updateFontFamily = () => {
  document.body.style.fontFamily = selectedFont.value;
};

// Watch for changes in selectedFont and update font family
watch(selectedFont, () => {
  updateFontFamily();
});

// Lifecycle hook: when component is mounted
onMounted(() => {
  parseQueryParams(); // Parse initial query parameters
  updateFontFamily(); // Apply initial font family
  applyTheme(); // Apply initial theme

  // Event listeners for keyboard and click events
  window.addEventListener('keydown', handleKeydown);
  document.addEventListener('click', handleClickOutside);
});

// Lifecycle hook: before component is unmounted
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown);
  document.removeEventListener('click', handleClickOutside);
});

// Watch for changes in colorSettings and update query parameters
watch(colorSettings, (newValue) => {
  updateLinkQuery(newValue);
  console.log('shades',shades);
}, { deep: true });

// Watch for changes in selectedFont and selectedTheme and update query parameters
watch([selectedFont, selectedTheme], ([newFont, newTheme]) => {
  updateLinkQuery({ selectedFont: newFont, selectedTheme: newTheme });
});

// Function to update URL query parameters based on state changes
const updateLinkQuery = (newValues: any) => {
  const params = new URLSearchParams();

  // Add colorSettings to query
  for (const key in colorSettings) {
    params.append(key, colorSettings[key as keyof ColorSettings]);
  }

  // Add selectedFont to query
  params.set('selectedFont', selectedFont.value);

  // Add selectedTheme to query
  if (selectedTheme.value !== null) {
    params.set('selectedTheme', selectedTheme.value.toString());
  }

  // Construct the final query string
  const queryString = params.toString();

  // Update the browser's address bar
  const newUrl = `${window.location.pathname}?${queryString}`;
  history.replaceState(null, '', newUrl);

  // Log the updated query string (optional)
  console.log('Updated link query:', queryString);
};

// HEADER
const dropdownOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value;
  console.log("Dropdown state: ", dropdownOpen.value);  // Debugging log
}

function handleClickOutsideMenu(event: Event) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    dropdownOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutsideMenu);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutsideMenu);
});

const copyStylesToClipboard = async () => {
  const googleFontsLink = `https://fonts.googleapis.com/css2?family=${selectedFont.value.replace(/ /g, '+')}&display=swap`;

  const styles = `
    /* Google Fonts Link */
    @import url('${googleFontsLink}');
    
    /* Font Family */
    body {
      font-family: '${selectedFont.value}', sans-serif;
    }

    /* Colors */
    :root {
      --color-primary: ${colorSettings.primary};
      --color-secondary: ${colorSettings.secondary};
      --color-accent: ${colorSettings.accent};
      --color-background: ${colorSettings.background};
      --color-text: ${colorSettings.text};

    /* Shades */
        ${Object.keys(shades).map(key => {
          const colorKey = key as keyof typeof shades;
          const shadesArray = shades[colorKey];
          if (!shadesArray) return ''; // Check if shadesArray is undefined or null

          return shadesArray.map(shade => `--color-${colorKey}-${shade.name}: ${shade.color};`).join('\n');
        }).join('\n')}
  }
  `;

  try {
    await navigator.clipboard.writeText(styles);
    alert('Styles copied to clipboard!');
  } catch (err) {
    console.error('Failed to copy styles: ', err);
  }
};




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

#font-family,
#theme-select {
  color: #000;
  margin-top: 20px;
  padding: 10px;
  font-size: 16px;
}
</style>