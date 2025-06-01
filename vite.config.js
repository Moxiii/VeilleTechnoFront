import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  define:{
    'import.meta.env.VITE_API_URL': JSON.stringify('http://api.localhost')
  },
  plugins: [react()],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      '@': path.resolve(__dirname,
          'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData:` 
          @import "/src/CONST/_const.scss";
        `
      },
    },
  },
  build: {
    outDir: 'dist',
  },
})
