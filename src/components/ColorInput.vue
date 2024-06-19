<template>
  <div class="mb-4 relative">
    <label :for="id" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <div class="mt-1 relative">
      <input
        :id="id"
        type="color"
        :value="color"
        @input="updateColor(($event.target as HTMLInputElement)?.value)"
        class="block w-10 h-10 p-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 sm:text-sm absolute -right-3 top-4"
      />
    </div>
    <div class="text-sm text-gray-500 mt-1">{{ color }}</div>
    <div class="mt-2 flex flex-row">
      <p style="color: red;">
      {{ baseColorName }}</p> 
      <div
        v-for="(shade, index) in shades"
        :key="index"
        @click="copyShade(shade)"
        class="flex flex-col items-center"
        style="cursor: pointer;"
        >
        <div :style="{ backgroundColor: shade.color }" class="h-13 w-13 rounded text-center">{{ index * 100 }}</div>
      </div>
    </div>
    <button @click="copyShades" class="mt-2 text-sm text-blue-500">Copy Shades</button>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref, watch , onMounted, reactive} from 'vue';
import tinycolor from 'tinycolor2';

const props = defineProps<{
  label: string;
  color: string;
  id: string;
}>();

interface Shade {
  name: string;
  color: string;
}

const emit = defineEmits(['update:color', 'update:shades']);
const shades = ref<Shade[]>([]);
const baseColorName = ref('');

const cusomColorShades: Record<string, string[]> = {
  slate: ['#f8fafc', '#f1f5f9', '#e2e8f0', '#cbd5e1', '#94a3b8', '#64748b', '#475569', '#334155', '#1e293b', '#0f172a', '#020617'],
  gray: ['#f9fafb', '#f3f4f6', '#e5e7eb', '#d1d5db', '#9ca3af', '#6b7280', '#4b5563', '#374151', '#1f2937', '#111827', '#030712'],
  zinc: ['#fafafa', '#f4f4f5', '#e4e4e7', '#d4d4d8', '#a1a1aa', '#71717a', '#52525b', '#3f3f46', '#27272a', '#18181b', '#09090b'],
  neutral: ['#fafafa', '#f5f5f5', '#e5e5e5', '#d4d4d4', '#a3a3a3', '#737373', '#525252', '#404040', '#262626', '#171717', '#0a0a0a'],
  stone: ['#fafaf9', '#f5f5f4', '#e7e5e4', '#d6d3d1', '#a8a29e', '#78716c', '#57534e', '#44403c', '#292524', '#1c1917', '#0c0a09'],
  red: ['#fef2f2', '#fee2e2', '#fecaca', '#fca5a5', '#f87171', '#ef4444', '#dc2626', '#b91c1c', '#991b1b', '#7f1d1d', '#450a0a'],
  orange: ['#fff7ed', '#ffedd5', '#fed7aa', '#fdba74', '#fb923c', '#f97316', '#ea580c', '#c2410c', '#9a3412', '#7c2d12', '#431407'],
  amber: ['#fffbeb', '#fef3c7', '#fde68a', '#fcd34d', '#fbbf24', '#f59e0b', '#d97706', '#b45309', '#92400e', '#78350f', '#451a03'],
  yellow: ['#fefce8', '#fef9c3', '#fef08a', '#fde047', '#facc15', '#eab308', '#ca8a04', '#a16207', '#854d0e', '#713f12', '#422006'],
  lime: ['#f7fee7', '#ecfccb', '#d9f99d', '#bef264', '#a3e635', '#84cc16', '#65a30d', '#4d7c0f', '#3f6212', '#365314', '#1a2e05'],
  green: ['#f0fdf4', '#dcfce7', '#bbf7d0', '#86efac', '#4ade80', '#22c55e', '#16a34a', '#15803d', '#166534', '#14532d', '#052e16'],
  emerald: ['#ecfdf5', '#d1fae5', '#a7f3d0', '#6ee7b7', '#34d399', '#10b981', '#059669', '#047857', '#065f46', '#064e3b', '#022c22'],
  teal: ['#f0fdfa', '#ccfbf1', '#99f6e4', '#5eead4', '#2dd4bf', '#14b8a6', '#0d9488', '#0f766e', '#115e59', '#134e4a', '#042f2e'],
  cyan: ['#ecfeff', '#cffafe', '#a5f3fc', '#67e8f9', '#22d3ee', '#06b6d4', '#0891b2', '#0e7490', '#155e75', '#164e63', '#083344'],
  sky: ['#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc', '#38bdf8', '#0ea5e9', '#0284c7', '#0369a1', '#075985', '#0c4a6e', '#082f49'],
  blue: ['#eff6ff', '#dbeafe', '#bfdbfe', '#93c5fd', '#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8', '#1e40af', '#1e3a8a', '#172554'],
  indigo: ['#eef2ff', '#e0e7ff', '#c7d2fe', '#a5b4fc', '#818cf8', '#6366f1', '#4f46e5', '#4338ca', '#3730a3', '#312e81', '#1e1b4b'],
  violet: ['#f5f3ff', '#ede9fe', '#ddd6fe', '#c4b5fd', '#a78bfa', '#8b5cf6', '#7c3aed', '#6d28d9', '#5b21b6', '#4c1d95', '#2e1065'],
  purple: ['#faf5ff', '#f3e8ff', '#e9d5ff', '#d8b4fe', '#c084fc', '#a855f7', '#9333ea', '#7e22ce', '#6b21a8', '#581c87', '#3b0764'],
  fuchsia: ['#fdf4ff', '#fae8ff', '#f5d0fe', '#f0abfc', '#e879f9', '#d946ef', '#c026d3', '#a21caf', '#86198f', '#701a75', '#4a044e'],
  pink: ['#fdf2f8', '#fce7f3', '#fbcfe8', '#f9a8d4', '#f472b6', '#ec4899', '#db2777', '#be185d', '#9d174d', '#831843', '#500724'],
  rose: ['#fff1f2', '#ffe4e6', '#fecdd3', '#fda4af', '#fb7185', '#f43f5e', '#e11d48', '#be123c', '#9f1239', '#881337', '#4c0519'],
  bronze: ['#ffecdb', '#ffdab0', '#ffc27f', '#ff9d4b', '#ff7b1e', '#ff5a00', '#e45000', '#b83f00', '#902f00', '#6c2100', '#421300'],
  copper: ['#fff4e0', '#ffe1b3', '#ffc785', '#ffae5b', '#ff9531', '#ff7d0e', '#e46b00', '#b85400', '#903d00', '#6c2900', '#421800'],
  silver: ['#f9f9fa', '#f0f0f1', '#d9d9da', '#c2c2c3', '#aaaaab', '#919192', '#7a7a7b', '#626263', '#4c4c4d', '#363637', '#212121'],
  gold: ['#fff7e1', '#ffecb5', '#ffde82', '#ffcd52', '#ffbc23', '#ffab00', '#e49a00', '#b87a00', '#905c00', '#6c3f00', '#422600'],
  platinum: ['#f7f7f9', '#eeeeee', '#dddddf', '#cfcfcf', '#b8b8b8', '#a0a0a0', '#888888', '#707070', '#585858', '#414141', '#292929'],
  ruby: ['#fff0f1', '#ffd9db', '#ffbcc0', '#ff9fa5', '#ff7e8b', '#ff5c72', '#e44a5f', '#b8394b', '#902838', '#6c1a26', '#421114'],
  sapphire: ['#f0f8ff', '#d8e8ff', '#b9d2ff', '#99bcff', '#78a6ff', '#588fff', '#4070e4', '#3056b8', '#233e90', '#17276c', '#0d1542'],
  joy: ['#fff4e6', '#ffe8cc', '#ffdbb3', '#ffcc99', '#ffb380', '#ff9966', '#ff7f4d', '#ff6633', '#ff4c1a', '#ff3300', '#e62600'],
  passion: ['#fff0f6', '#ffd6e0', '#ffadc7', '#ff83ae', '#ff5a96', '#ff307e', '#e62067', '#b31850', '#801137', '#4d0a1e', '#1a0006'],
  parsley: ['#f3fdf3', '#dafbda', '#bdfabf', '#99f899', '#72f372', '#4bed4b', '#2adc2a', '#1ab11a', '#0b800b', '#065306', '#002400'],
  sciFi: ['#f2faff', '#e0f7ff', '#bfeeff', '#99e4ff', '#73dbff', '#4dd1ff', '#27c7ff', '#00b4e4', '#008bb3', '#006283', '#003a53'],
  retro: ['#fff8e6', '#ffefcc', '#ffe5b3', '#ffd999', '#ffcc80', '#ffbf66', '#ffb34d', '#ff9933', '#ff801a', '#ff6600', '#cc5200'],
  luxury: ['#f9f7f3', '#f2efe7', '#e5ded1', '#d7ccb8', '#cab99e', '#bda685', '#b0936b', '#a38052', '#856438', '#664a24', '#4d3717'],
  coral: ['#fff5f3', '#ffe6e0', '#ffcdc4', '#ffb2a5', '#ff8d73', '#ff7754', '#e6613a', '#bf5032', '#993e28', '#732c1e', '#4d1a14'],
  mint: ['#f3fff9', '#e0ffee', '#b3ffdb', '#85ffcc', '#4dffb2', '#00ff80', '#00cc66', '#00994c', '#006633', '#00331a', '#001a0d'],
  caramel: ['#fdf5e6', '#fae0b3', '#f7c680', '#f3ac4d', '#ef9220', '#eb7900', '#c76300', '#9d4e00', '#733900', '#4d2600', '#2a1400'],
  maroon: ['#fff0f1', '#ffe1e3', '#ffc4c7', '#ff9ea4', '#ff7a82', '#ff5763', '#e44a56', '#b83945', '#902836', '#6c1a27', '#421017'],
  peach: ['#fff5eb', '#ffebcc', '#ffd2a3', '#ffb86b', '#ff9d44', '#ff7f1a', '#e66800', '#b85000', '#8a3b00', '#622b00', '#421a00'],
  olive: ['#fafbf7', '#e9f0e0', '#c8ddbb', '#a7cb97', '#84b56d', '#66a04b', '#51803e', '#406432', '#2e4927', '#1d301c', '#0c1a12'],
  lavender: ['#faf5ff', '#f3e8ff', '#e9d5ff', '#d8b4fe', '#c084fc', '#a855f7', '#9333ea', '#7e22ce', '#6b21a8', '#581c87', '#3b0764'],
  navy: ['#f0f4ff', '#e0e8ff', '#bfd2ff', '#9cbaff', '#7aa1ff', '#5888ff', '#4070e4', '#3056b8', '#233e90', '#17276c', '#0d1542'],
  oliveDrab: ['#f8f8f4', '#f1f1e8', '#e2e2cf', '#d4d4b5', '#b0b08e', '#8c8c68', '#686843', '#484827', '#343417', '#222210', '#11110a'],
  lavenderBlush: ['#fff5f7', '#ffe6eb', '#ffcdd7', '#ffb4c3', '#ff9aad', '#ff8097', '#ff667f', '#ff4c66', '#ff334d', '#ff1a34', '#e6001a'],
  goldenrod: ['#fff7df', '#ffeebb', '#ffdd80', '#ffcc44', '#ffbb00', '#e6a800', '#b88600', '#8c6400', '#604600', '#422f00', '#261800'],
  thistle: ['#fff0f6', '#ffd6e0', '#ffadc7', '#ff83ae', '#ff5a96', '#ff307e', '#e62067', '#b31850', '#801137', '#4d0a1e', '#1a0006'],
  crimson: ['#fff0f1', '#ffd9db', '#ffbcc0', '#ff9fa5', '#ff7e8b', '#ff5c72', '#e44a5f', '#b8394b', '#902838', '#6c1a26', '#421114'],
  auburn: ['#fff4f2', '#ffe1da', '#ffc3b0', '#ff9d82', '#ff7358', '#ff4c30', '#e44426', '#b8381d', '#902d15', '#6c210f', '#42140a'],
  wheat: ['#fff8e6', '#ffefcc', '#ffe5b3', '#ffd999', '#ffcc80', '#ffbf66', '#ffb34d', '#ff9933', '#ff801a', '#ff6600', '#cc5200'],
  sienna: ['#fff3e6', '#ffe0b3', '#ffcc80', '#ffb84d', '#ffa320', '#ff8d00', '#e47a00', '#b86300', '#904b00', '#6c3700', '#422200'],
  onyx: ['#f9f9f9', '#f0f0f0', '#d9d9d9', '#c2c2c2', '#aaaaaa', '#919191', '#7a7a7a', '#626262', '#4c4c4c', '#363636', '#212121'],
  obsidian: ['#f9f9f9', '#f0f0f0', '#d9d9d9', '#c2c2c2', '#aaaaaa', '#919191', '#7a7a7a', '#626262', '#4c4c4c', '#363636', '#212121'],
  charcoal: ['#f9f9f9', '#f0f0f0', '#d9d9d9', '#c2c2c2', '#aaaaaa', '#919191', '#7a7a7a', '#626262', '#4c4c4c', '#363636', '#212121'],
  raspberry: ['#fff5f7', '#ffebef', '#ffd6df', '#ffadc7', '#ff83ae', '#ff5a96', '#ff307e', '#e62067', '#b31850', '#801137', '#4d0a1e'],
  salmon: ['#fff5f5', '#ffebeb', '#ffd6d6', '#ffb3b3', '#ff9999', '#ff6666', '#ff4d4d', '#e63333', '#cc1a1a', '#b30000', '#800000'],
  ivory: ['#fffff0', '#ffffe0', '#ffffcc', '#ffffb3', '#ffff99', '#ffff80', '#ffff66', '#ffff4d', '#ffff33', '#ffff1a', '#ffff00'],
  plum: ['#f7f0ff', '#eedcff', '#dbb5ff', '#c88eff', '#b566ff', '#a34dff', '#9933ff', '#8000ff', '#6600cc', '#4d0099', '#330066'],
  tangerine: ['#fff8e6', '#ffefcc', '#ffe5b3', '#ffdb99', '#ffcc80', '#ffbf66', '#ffb34d', '#ff9933', '#ff801a', '#ff6600', '#cc5200'],
  lemon: ['#fff9e6', '#fff2cc', '#ffeb99', '#ffe366', '#ffdb33', '#ffd300', '#e6be00', '#b89800', '#8a7300', '#6c5200', '#533b00'],
  azure: ['#e6f9ff', '#ccf2ff', '#99e6ff', '#66dbff', '#33d1ff', '#00c7ff', '#00b2e6', '#009fcc', '#0086b3', '#007399', '#005266'],
  aqua: ['#e6faff', '#ccf5ff', '#99ecff', '#66e3ff', '#33d9ff', '#00d0ff', '#00bce6', '#00a6cc', '#008bb3', '#007399', '#005266'],
  mahogany: ['#fff0f1', '#ffd9db', '#ffbcc0', '#ff9fa5', '#ff7e8b', '#ff5c72', '#e44a5f', '#b8394b', '#902838', '#6c1a26', '#421114'],
  siennaBrown: ['#fff3e6', '#ffe0b3', '#ffcc80', '#ffb84d', '#ffa320', '#ff8d00', '#e47a00', '#b86300', '#904b00', '#6c3700', '#422200'],
  sandyBrown: ['#fff5eb', '#ffebcc', '#ffd2a3', '#ffb86b', '#ff9d44', '#ff7f1a', '#e66800', '#b85000', '#8a3b00', '#622b00', '#421a00'],
  lightCoral: ['#ffe6e6', '#ffcccc', '#ff9999', '#ff6666', '#ff3333', '#ff0000', '#e60000', '#b30000', '#800000', '#660000', '#4d0000'],
  darkSalmon: ['#ffe6e6', '#ffcccc', '#ff9999', '#ff6666', '#ff3333', '#ff0000', '#e60000', '#b30000', '#800000', '#660000', '#4d0000'],
  paleVioletRed: ['#ffe6f0', '#ffccd9', '#ff99b3', '#ff668d', '#ff3366', '#ff0040', '#e6003b', '#b3002e', '#800022', '#66001a', '#4d0014'],
  seaGreen: ['#e6fff5', '#ccffeb', '#99ffd6', '#66ffc2', '#33ffad', '#00ff99', '#00e68a', '#00b374', '#008060', '#00664d', '#004d3a'],
  mediumOrchid: ['#f2e6ff', '#e0ccff', '#b399ff', '#8666ff', '#5a33ff', '#2d00ff', '#2700e6', '#1e00b3', '#140080', '#0e0066', '#0a004d'],
  tomato: ['#ffe6e6', '#ffcccc', '#ff9999', '#ff6666', '#ff3333', '#ff0000', '#e60000', '#b30000', '#800000', '#660000', '#4d0000'],
  sepia: ['#f7f0e6', '#efdfcc', '#dfbf99', '#cfa066', '#bf8033', '#b06b1a', '#8f5614', '#6e410f', '#4d2d0a', '#2d1905', '#1a0f03'],
  lilac: ['#faf0ff', '#f0dfff', '#e0bfff', '#d09fff', '#c07fff', '#b060ff', '#9049e6', '#7038b3', '#502880', '#381a66', '#200d4d'],
  periwinkle: ['#f3f3ff', '#e6e6ff', '#ccccff', '#b3b3ff', '#9999ff', '#8080ff', '#6666e6', '#4d4db3', '#333380', '#1a1a66', '#00004d'],
  ochre: ['#fff9e6', '#fff3cc', '#ffe399', '#ffd466', '#ffc733', '#ffbb00', '#e6a800', '#b38600', '#806600', '#664d00', '#4d3300'],
  amethyst: ['#faf0ff', '#f0dfff', '#e0bfff', '#d09fff', '#c07fff', '#b060ff', '#9049e6', '#7038b3', '#502880', '#381a66', '#200d4d'],
  cobalt: ['#e6f0ff', '#ccdfff', '#99bfff', '#669fff', '#337fff', '#005fff', '#0052e6', '#0042b3', '#003380', '#002566', '#001a4d'],
  taupe: ['#f7f5f2', '#e8e3dd', '#d1c7bb', '#baa999', '#a38b77', '#8c6d55', '#735844', '#5b4636', '#433429', '#2a211c', '#1a140f'],
  clover: ['#f0fff4', '#d6ffd9', '#adffb3', '#85ff8d', '#5aff66', '#30ff3f', '#27e635', '#1eb32a', '#158020', '#0e6617', '#094d0f'],
  flamingo: ['#fff0f5', '#ffd9e6', '#ffb3cc', '#ff8db3', '#ff6699', '#ff4080', '#e63670', '#b32b57', '#80203d', '#661a30', '#4d1424'],
  moss: ['#f4fff0', '#d9ffd6', '#b3ffad', '#8dff85', '#66ff5a', '#3fff30', '#35e627', '#2ab31e', '#208015', '#17660e', '#0f4d09'],
  orchid: ['#fff0ff', '#ffccff', '#ff99ff', '#ff66ff', '#ff33ff', '#ff00ff', '#e600e6', '#b300b3', '#800080', '#660066', '#4d004d'],
  rust: ['#fff5f0', '#ffdfcc', '#ffb399', '#ff8d66', '#ff664d', '#ff4c33', '#e63627', '#b32b20', '#80201a', '#661714', '#4d0f0d'],
  sand: ['#fff9e6', '#fff3cc', '#ffe399', '#ffd466', '#ffc733', '#ffbb00', '#e6a800', '#b38600', '#806600', '#664d00', '#4d3300'],
  spruce: ['#e6fff5', '#ccffeb', '#99ffd6', '#66ffc2', '#33ffad', '#00ff99', '#00e68a', '#00b374', '#008060', '#00664d', '#004d3a'],
  taffy: ['#fff0f5', '#ffccdd', '#ff99bb', '#ff6699', '#ff3377', '#ff0066', '#e6005c', '#b30046', '#800033', '#660029', '#4d001f'],
  terraCotta: ['#fff5f3', '#ffe0db', '#ffb3b0', '#ff8d82', '#ff664d', '#ff4c33', '#e63627', '#b32b20', '#80201a', '#661714', '#4d0f0d'],
  turquoise: ['#e6ffff', '#ccffff', '#99ffff', '#66ffff', '#33ffff', '#00ffff', '#00e6e6', '#00b3b3', '#008080', '#006666', '#004d4d'],
  vanilla: ['#fff9e6', '#fff3cc', '#ffe399', '#ffd466', '#ffc733', '#ffbb00', '#e6a800', '#b38600', '#806600', '#664d00', '#4d3300'],
  vermilion: ['#fff0f1', '#ffd6d9', '#ffadb3', '#ff8399', '#ff597f', '#ff2e66', '#e60059', '#b30046', '#800033', '#660029', '#4d001f'],
  wine: ['#fff0f0', '#ffe0e0', '#ffcccc', '#ff9999', '#ff6666', '#ff3333', '#e60000', '#b30000', '#800000', '#660000', '#4d0000'],
  yam: ['#fff9f0', '#ffe6cc', '#ffcc99', '#ffb366', '#ff9933', '#ff8000', '#e67300', '#b35b00', '#804400', '#663300', '#4d2600'],
  mustard: ['#fffbe6', '#fff5cc', '#ffeb99', '#ffe066', '#ffd633', '#ffcc00', '#e6b800', '#b38f00', '#806600', '#665200', '#4d3d00'],
  jade: ['#e6fff0', '#ccffe0', '#99ffc2', '#66ffa3', '#33ff85', '#00ff66', '#00e65c', '#00b34a', '#008040', '#006633', '#004d26'],
  pear: ['#f7ffe6', '#eeffcc', '#ddff99', '#ccff66', '#bbff33', '#aaff00', '#99e600', '#73b300', '#4d8000', '#366600', '#264d00'],
  dusk: ['#f0f0ff', '#e0e0ff', '#c0c0ff', '#a0a0ff', '#8080ff', '#6060ff', '#4040e6', '#3030b3', '#202080', '#101066', '#08084d'],
  twilight: ['#f0e6ff', '#e0ccff', '#c099ff', '#a066ff', '#8040ff', '#6020e6', '#4010b3', '#301080', '#200d66', '#10094d', '#080533'],
  pistachio: ['#f0ffe6', '#d9ffcc', '#b3ff99', '#8dff66', '#66ff33', '#40ff00', '#36e600', '#2ab300', '#208000', '#176600', '#0f4d00'],
  wisteria: ['#f0e6ff', '#e0ccff', '#c099ff', '#a066ff', '#8040ff', '#6020e6', '#4010b3', '#301080', '#200d66', '#10094d', '#080533'],
  honey: ['#fff7e6', '#ffeecc', '#ffdd99', '#ffcc66', '#ffbb33', '#ffaa00', '#e69900', '#b37700', '#805500', '#664400', '#4d3300'],
  apricot: ['#fff5e6', '#ffe0cc', '#ffcc99', '#ffb366', '#ff9933', '#ff8000', '#e67300', '#b35b00', '#804400', '#663300', '#4d2600'],
  denim: ['#e6f2ff', '#cce6ff', '#99ccff', '#66b3ff', '#3399ff', '#007fff', '#0066cc', '#004d99', '#003366', '#00264d', '#001933'],
  saffron: ['#fff9e6', '#fff3cc', '#ffe699', '#ffcc66', '#ffb333', '#ff9933', '#e67f00', '#b35f00', '#804400', '#663300', '#4d2600'],
  hibiscus: ['#ffe6f2', '#ffccde', '#ff99bd', '#ff669b', '#ff337a', '#ff0058', '#e6004e', '#b3003d', '#80002e', '#660024', '#4d001a'],
  blueberry: ['#f0f4ff', '#e0e8ff', '#bfd2ff', '#9cbaff', '#7aa1ff', '#5888ff', '#4070e4', '#3056b8', '#233e90', '#17276c', '#0d1542'],
  mulberry: ['#f9f0ff', '#f0dfff', '#ddb5ff', '#c88eff', '#b566ff', '#a34dff', '#9933ff', '#8000ff', '#6600cc', '#4d0099', '#330066'],
  canary: ['#ffffe6', '#ffffcc', '#ffff99', '#ffff66', '#ffff33', '#ffff00', '#e6e600', '#b3b300', '#808000', '#666600', '#4d4d00'],
  honeydew: ['#f5fff5', '#eaffea', '#d4ffd4', '#bdffbd', '#a6ffa6', '#8fff8f', '#7ae67a', '#63b363', '#4d804d', '#396639', '#294d29'],
  ivy: ['#f2fff4', '#d9ffe6', '#adffcc', '#85ffb3', '#66ff99', '#4dff80', '#3be66b', '#2ab355', '#1a803f', '#146633', '#0d4d26'],
  ginger: ['#fff4e6', '#ffedcc', '#ffdb99', '#ffb833', '#ffa300', '#ff8a00', '#e67a00', '#b86300', '#8a4c00', '#6c3f00', '#4d2b00'],
  magenta: ['#fff0ff', '#ffccff', '#ff99ff', '#ff66ff', '#ff33ff', '#ff00ff', '#e600e6', '#b300b3', '#800080', '#660066', '#4d004d'],
  fern: ['#f0fff4', '#d9ffe6', '#b3ffcc', '#8dffb3', '#66ff99', '#3fff80', '#35e66b', '#2ab355', '#20803f', '#176633', '#0f4d26'],
  hazel: ['#f7f0e6', '#eedfcc', '#dfbf99', '#cf9e66', '#bf7e33', '#b06b1a', '#8f5614', '#6e410f', '#4d2d0a', '#2d1905', '#1a0f03'],
  aquamarine: ['#e6fffa', '#ccfff5', '#99ffeb', '#66ffe3', '#33ffd9', '#00ffd0', '#00e6b8', '#00b392', '#00806c', '#00664e', '#004d3a'],
  celadon: ['#e8fff0', '#d1ffe0', '#a8ffb3', '#7aff85', '#4dff58', '#26ff3a', '#21e634', '#1bb32a', '#146619', '#0e4d13', '#09430d'],
  blush: ['#fff0f5', '#ffd9e6', '#ffb3cc', '#ff8db3', '#ff6699', '#ff4080', '#e63670', '#b32b57', '#80203d', '#661a30', '#4d1424'],
  mintyGreen: ['#f0fff4', '#d6ffe6', '#adffcc', '#85ffb3', '#5aff99', '#30ff80', '#27e66e', '#1eb35c', '#15804a', '#0e6639', '#094d26'],
};

const updateColor = (newColor: string) => {
  emit('update:color', newColor);
};

const getClosestTailwindColor = (color: string) => {
  let closestColor = '';
  let closestDistance = Number.MAX_VALUE;

  const labColor = tinycolor(color).toRgb(); // Convert base color to Lab space

  for (const [name, values] of Object.entries(cusomColorShades)) {
    for (const value of values) {
      const labValue = tinycolor(value).toRgb(); // Convert palette color to Lab space
      const distance = Math.sqrt(
        Math.pow(labColor.r - labValue.r, 2) +
        Math.pow(labColor.g - labValue.g, 2) +
        Math.pow(labColor.b - labValue.b, 2) +
        Math.pow(labColor.a - labValue.a, 2)

      );
      if (distance < closestDistance) {
        closestDistance = distance;
        closestColor = name;
      }
    }
  }

  return closestColor;
};


const generateShades = (baseColor: string) => {
  baseColorName.value = getClosestTailwindColor(baseColor);
  shades.value = cusomColorShades[baseColorName.value].map((shade, index) => {
    return { name: `${baseColorName.value}-${index * 100}`, color: shade };
  });
  emit('update:shades', shades.value);
};

const copyShades = () => {
  const shadesText = shades.value.map(shade => `${shade.name}: ${shade.color}`).join('\n');
  navigator.clipboard.writeText(shadesText).then(() => {
    alert('Shades copied to clipboard!');
  });
};

const copyShade = (shade: Shade) => {
  const shadeText = `${shade.name}: ${shade.color}`;
  navigator.clipboard.writeText(shadeText).then(() => {
    alert('Shade color copied to clipboard!');
  });
};

watch(() => props.color, (newColor) => {
  generateShades(newColor);
});

onMounted(() => {
  generateShades(props.color);
  console.log(props);
});




</script>