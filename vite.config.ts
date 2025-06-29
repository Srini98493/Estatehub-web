import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  envPrefix: 'VITE_',
  // build: {
  //   sourcemap: mode === 'localmachine' || mode === 'development',
  // }
}));
