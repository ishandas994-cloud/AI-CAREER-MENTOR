import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
 
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
 
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@services': path.resolve(__dirname, './src/services'),
      '@store': path.resolve(__dirname, './src/store'),
    },
  },
 
  server: {
    port: 3000,
    open: true,
    proxy: {
      // Proxy all /api requests to the backend during development
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
 
  build: {
    outDir: 'dist',
    sourcemap: true,
    // Split large chunks for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          redux: ['@reduxjs/toolkit', 'react-redux'],
        },
      },
    },
  },
 
  // Environment variables prefix
  envPrefix: 'VITE_',
})