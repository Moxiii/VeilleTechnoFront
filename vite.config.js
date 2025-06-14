import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export default defineConfig({

  plugins: [react()],


  resolve: {
    alias: [
      { find: '@components', replacement: path.resolve(__dirname, 'src/Components') },
      { find: '@const', replacement: path.resolve(__dirname, 'src/CONST') },
      { find: '@src', replacement: path.resolve(__dirname, 'src') },
      { find: '@screen', replacement: path.resolve(__dirname, 'src/Screen') },
      { find: '@hook', replacement: path.resolve(__dirname, 'src/HOOK') },
      { find: '@effects', replacement: path.resolve(__dirname, 'src/Effects') },
      { find: '@store', replacement: path.resolve(__dirname, 'src/DATA/Store') },
      { find: '@fetch', replacement: path.resolve(__dirname, 'src/DATA/Fetch') },
      { find: '@service', replacement: path.resolve(__dirname, 'src/DATA/Service') },
      { find: '@interfaces', replacement: path.resolve(__dirname, 'src/DATA/Interfaces') },
      {find:'@memo', replacement: path.resolve(__dirname, 'src/HOOK/memo') },
    ]
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData:
            `@import "${path.resolve(__dirname,'src/CONST/_const.scss')}";`
      },
    },
  },

  build: {
    outDir: 'dist',
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true
    }
  }
})
