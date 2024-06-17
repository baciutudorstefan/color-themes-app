<template>
    <section class="mt-8 flex flex-row gap-x-7">
      <div class="container mx-auto">
          <div class="flex flex-wrap justify-center w-full">
            <button :style="{ backgroundColor: shades.primary && shades.primary[1] ? shades.primary[1].color : colorSettings.primary, color: shades.primary && shades.primary[7] ? shades.primary[7].color : colorSettings.primary }" class="w-full py-2 px-4 rounded-lg mb-2 text-left flex flex-row items-center gap-4">
               
               <span class="rounded-xl p-1 flex items-center" :style="{backgroundColor: shades.primary && shades.primary[6] ? shades.primary[6].color : colorSettings.primary}"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.70009 2.03358C5.57526 1.15841 6.76224 0.666748 7.99992 0.666748C9.2376 0.666748 10.4246 1.15841 11.2998 2.03358C12.1749 2.90875 12.6666 4.09574 12.6666 5.33342C12.6666 6.35906 12.2745 7.4086 11.4598 8.14967C10.9784 8.63299 10.7495 8.98472 10.6536 9.46416C10.5814 9.8252 10.2302 10.0593 9.86917 9.98713C9.50813 9.91493 9.27399 9.56371 9.3462 9.20267C9.51622 8.35258 9.95111 7.77275 10.5285 7.19534C10.5368 7.18708 10.5453 7.17904 10.5539 7.17122C11.0631 6.71297 11.3333 6.03528 11.3333 5.33342C11.3333 4.44936 10.9821 3.60151 10.3569 2.97639C9.73182 2.35127 8.88397 2.00008 7.99992 2.00008C7.11586 2.00008 6.26802 2.35127 5.6429 2.97639C5.01777 3.60151 4.66659 4.44936 4.66659 5.33342C4.66659 5.86958 4.75901 6.48303 5.47132 7.19534C5.97548 7.6995 6.48249 8.34693 6.65364 9.20267C6.72585 9.56371 6.4917 9.91493 6.13066 9.98713C5.76962 10.0593 5.41841 9.8252 5.3462 9.46416C5.25068 8.98656 4.95769 8.56733 4.52851 8.13815C3.5075 7.11713 3.33325 6.13058 3.33325 5.33342C3.33325 4.09574 3.82492 2.90875 4.70009 2.03358Z" :fill="shades.primary && shades.primary[1] ? shades.primary[1].color : colorSettings.primary"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.33325 11.9999C5.33325 11.6317 5.63173 11.3333 5.99992 11.3333H9.99992C10.3681 11.3333 10.6666 11.6317 10.6666 11.9999C10.6666 12.3681 10.3681 12.6666 9.99992 12.6666H5.99992C5.63173 12.6666 5.33325 12.3681 5.33325 11.9999Z" :fill="shades.primary && shades.primary[1] ? shades.primary[1].color : colorSettings.primary"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6 14.6667C6 14.2985 6.29848 14 6.66667 14H9.33333C9.70152 14 10 14.2985 10 14.6667C10 15.0349 9.70152 15.3333 9.33333 15.3333H6.66667C6.29848 15.3333 6 15.0349 6 14.6667Z" :fill="shades.primary && shades.primary[1] ? shades.primary[1].color : colorSettings.primary"/>
                    </svg>
                </span> 
                <p class="text-xs leading-4 font-normal"> 
                    Lorem ipsum dolor sit amet consectetur. Et hac donec sapien adipiscing duis pulvinar consectetur blandit.
                </p>                    
            </button>
                    <button :style="{ backgroundColor: shades.primary && shades.primary[6] ? shades.primary[6].color : colorSettings.primary, color: shades.primary && shades.primary[1] ? shades.primary[1].color : colorSettings.primary }" class="w-full py-2 px-4 rounded-lg mb-2 text-left flex flex-row items-center gap-4">
                    <span class="rounded-xl p-1 flex items-center text-center" :style="{backgroundColor: shades.primary && shades.primary[1] ? shades.primary[1].color : colorSettings.primary}">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.70009 2.03358C5.57526 1.15841 6.76224 0.666748 7.99992 0.666748C9.2376 0.666748 10.4246 1.15841 11.2998 2.03358C12.1749 2.90875 12.6666 4.09574 12.6666 5.33342C12.6666 6.35906 12.2745 7.4086 11.4598 8.14967C10.9784 8.63299 10.7495 8.98472 10.6536 9.46416C10.5814 9.8252 10.2302 10.0593 9.86917 9.98713C9.50813 9.91493 9.27399 9.56371 9.3462 9.20267C9.51622 8.35258 9.95111 7.77275 10.5285 7.19534C10.5368 7.18708 10.5453 7.17904 10.5539 7.17122C11.0631 6.71297 11.3333 6.03528 11.3333 5.33342C11.3333 4.44936 10.9821 3.60151 10.3569 2.97639C9.73182 2.35127 8.88397 2.00008 7.99992 2.00008C7.11586 2.00008 6.26802 2.35127 5.6429 2.97639C5.01777 3.60151 4.66659 4.44936 4.66659 5.33342C4.66659 5.86958 4.75901 6.48303 5.47132 7.19534C5.97548 7.6995 6.48249 8.34693 6.65364 9.20267C6.72585 9.56371 6.4917 9.91493 6.13066 9.98713C5.76962 10.0593 5.41841 9.8252 5.3462 9.46416C5.25068 8.98656 4.95769 8.56733 4.52851 8.13815C3.5075 7.11713 3.33325 6.13058 3.33325 5.33342C3.33325 4.09574 3.82492 2.90875 4.70009 2.03358Z" :fill="shades.primary && shades.primary[6] ? shades.primary[6].color : colorSettings.primary"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.33325 11.9999C5.33325 11.6317 5.63173 11.3333 5.99992 11.3333H9.99992C10.3681 11.3333 10.6666 11.6317 10.6666 11.9999C10.6666 12.3681 10.3681 12.6666 9.99992 12.6666H5.99992C5.63173 12.6666 5.33325 12.3681 5.33325 11.9999Z" :fill="shades.primary && shades.primary[6] ? shades.primary[6].color : colorSettings.primary"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6 14.6667C6 14.2985 6.29848 14 6.66667 14H9.33333C9.70152 14 10 14.2985 10 14.6667C10 15.0349 9.70152 15.3333 9.33333 15.3333H6.66667C6.29848 15.3333 6 15.0349 6 14.6667Z" :fill="shades.primary && shades.primary[6] ? shades.primary[6].color : colorSettings.primary"/>
                        </svg>
                    </span> 
                <p class="text-xs leading-4 font-normal"> 
                    Lorem ipsum dolor sit amet consectetur. Et hac donec sapien adipiscing duis pulvinar consectetur blandit.
                </p>
          </button> 
        </div>
      </div>
    </section>
  </template>
  
  <script lang="ts" setup>
  import { defineProps, onMounted } from 'vue';
  import type { ColorSettings } from '../interfaces/ColorSettings';
  
  interface Shade {
    name: string;
    color: string;
  }
  
  const props = defineProps<{ colorSettings: ColorSettings; shades: { [key: string]: Shade[] } }>();
  
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  
  onMounted(() => {
    console.log(props.shades.primary);
  });
  </script>
  