/// <reference types="vitest" />
import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader';
import vueDevTools from 'vite-plugin-vue-devtools'
import {ViteImageOptimizer} from 'vite-plugin-image-optimizer'

export default defineConfig({
  base: '/ClinicApp',
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
        lossless: true,
      },
      avif: {
        quality: 60,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },

  // --- НАЧАЛО КОНФИГУРАЦИИ VITEST ---
  test: {
    // Включаем глобальные переменные (describe, it, expect), как в Jest.
    globals: true,

    // Указываем среду для эмуляции браузера (DOM).
    // Это необходимо для монтирования компонентов.
    environment: 'jsdom',

    // Файл для глобальных настроек перед запуском тестов.
    // Полезно для моков, очистки и т.д.
    setupFiles: './tests/setup.ts',

    // Включаем отчет о покрытии кода.
    coverage: {
      // Используем провайдер 'v8' - он быстрый и не требует инструментации кода.
      provider: 'v8',
      // В каких форматах генерировать отчет.
      reporter: ['text', 'json', 'html'],
      // Проверять покрытие для всех файлов, а не только для тех, что затронуты тестами.
      all: true,
      // Включаем в отчет только файлы из папки src.
      include: ['src/'],
      // Исключаем из отчета ненужные файлы.
      exclude: [
        'src/main.ts',
        'src/router/index.ts',
        'src/types/index.ts',
        'src/api/mockData.ts',
        'src/stores/factories/',
        'src/App.vue',
        'src/views/',
        '**/*-icon.svg?component',
      ],
    }
  }
})