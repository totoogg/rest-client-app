import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    server: {
      deps: {
        inline: [/next-intl/],
      },
    },
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/__tests__/setup.ts',
    include: ['**/*.test.tsx', '**/*.spec.tsx'],
    coverage: {
      include: ['**/*.tsx'],
      exclude: [
        '**/node_modules/**',
        '**/*.test.tsx',
        '**/*.spec.tsx',
        './src/__tests__/setup.ts',
      ],
    },
  },
});
