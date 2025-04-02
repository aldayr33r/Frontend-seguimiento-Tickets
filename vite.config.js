import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Asegura que la ruta base esté bien definida
  build: {
    outDir: 'dist' // Carpeta de salida para el build
  }
});