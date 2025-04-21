import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const base = process.env.PUBLIC_URL || '/';

// https://vite.dev/config/
// export default defineConfig({
//   base,
//   plugins: [react()],
//   build: {
//     sourcemap: true,
//   },
// });

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    base: env.PUBLIC_URL || '/',
    plugins: [react()],
    build: {
      sourcemap: true,
    },
  };
});
