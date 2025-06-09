import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader';
import vueDevTools from 'vite-plugin-vue-devtools'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer' // Вы уже импортировали, отлично!

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
    vueDevTools(),
    ViteImageOptimizer({

      png: {
        quality: 75,
      },
      jpeg: {
        quality: 75,
      },
      jpg: {
        quality: 75,
      },
      webp: {
        quality: 75,
        lossless: true, // можно установить в true для сжатия без потерь
      },
      avif: {
        quality: 60, // AVIF дает хорошее качество при более низких значениях
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})

//
// <script setup>
// import { computed } from 'vue';
//
// // 1. Импортируем ОРИГИНАЛЬНОЕ изображение
// // Vite обработает его и вернет правильный путь к оптимизированному PNG в папке dist
// import originalImage from '@/assets/images/my-cool-photo.png';
//
// // 2. Создаем вычисляемые свойства для WebP и AVIF версий
// // Мы просто заменяем расширение файла в пути, который нам дал Vite
// const webpSrc = computed(() => originalImage.replace(/\.(png|jpe?g)$/, '.webp'));
// const avifSrc = computed(() => originalImage.replace(/\.(png|jpe?g)$/, '.avif'));
// </script>
//
// <template>
// <div>
//   <h1>Моя галерея</h1>
// <picture>
// <!-- Сначала указываем самые современные форматы -->
// <source :srcset="avifSrc" type="image/avif" />
//   <source :srcset="webpSrc" type="image/webp" />
//
//   <!-- Fallback для старых браузеров -->
// <img
// :src="originalImage"
// alt="Очень классная фотография"
// class="responsive-image"
// width="800"
// height="600"
// loading="lazy"
// decoding="async"
//   />
//   </picture>
//   </div>
//   </template>
//
//   <style scoped>
// .responsive-image {
//   max-width: 100%;
//   height: auto;
// }
// </style>