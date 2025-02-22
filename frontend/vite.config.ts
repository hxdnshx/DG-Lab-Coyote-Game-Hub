import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import WindiCSS from 'vite-plugin-windicss'
import { resolve } from 'path'
import { PrimeVueResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve('./index.html'),
        viewer: resolve('./viewer.html'),
      },
      output: {
        manualChunks: {
          'chartRoutes': ['./src/charts/chartRoutes.ts'],
          'dg-pulse-helper': ['./src/lib/dg-pulse-helper/index.ts'],
        }
      }
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8920',
        changeOrigin: true,
      },
      '/ws': {
        target: 'http://127.0.0.1:8920',
        ws: true,
      },
      '/dglab_ws': {
        target: 'http://127.0.0.1:8920',
        ws: true,
      },
    }
  },
  plugins: [
    vue(),
    svgLoader(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
      ],
      dts: 'src/auto-imports.d.ts',
    }),
    Components({
      dts: 'src/components.d.ts',
      resolvers: [
        PrimeVueResolver(),
      ],
    }),
    WindiCSS(),
  ],
})
