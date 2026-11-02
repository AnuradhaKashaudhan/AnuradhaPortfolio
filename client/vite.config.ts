import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      react: `${import.meta.dirname}/node_modules/react`,
      'react-dom': `${import.meta.dirname}/node_modules/react-dom`,
      '@': `${import.meta.dirname}/src`,
      '@components': `${import.meta.dirname}/src/components`,
      '@data': `${import.meta.dirname}/src/data`,
      '@hooks': `${import.meta.dirname}/src/hooks`,
      '@utils': `${import.meta.dirname}/src/utils`,
      '@types': `${import.meta.dirname}/src/types`,
      '@assets': `${import.meta.dirname}/src/assets`,
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
