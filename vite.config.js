import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// Сборка складывает всё — JS, CSS, шрифты, фотографии — в один HTML-файл,
// чтобы готовое приложение можно было просто переслать на телефон.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 100 * 1024 * 1024, // встроить все ассеты, а не только мелкие
    cssCodeSplit: false,
    chunkSizeWarningLimit: 4000,
  },
});
