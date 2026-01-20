
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Cipher Academy',
        short_name: 'Cipher',
        description: 'Learn Ethical Hacking & Python Programming in Amharic.',
        theme_color: '#00ff9d',
        background_color: '#050505',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/kali-linux.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/kali-linux.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  base: './', // Crucial for GitHub Pages relative paths
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});
