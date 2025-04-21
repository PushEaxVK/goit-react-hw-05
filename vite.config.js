import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const base = process.env.PUBLIC_URL || '/';

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
  build: {
    sourcemap: true,
  },
});
