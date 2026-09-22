import {defineConfig} from 'vitest/config';
import react from '@vitejs/plugin-react';
import {playwright} from '@vitest/browser-playwright';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    include: ['test/browser/**/*.spec.{ts,tsx}'],
    setupFiles: ['test/browser/setup.ts'],
    browser: {
      enabled: true,
      headless: process.env.HEADLESS !== 'false',
      provider: playwright({
        launchOptions: {
          args: ['--disable-dev-shm-usage', '--no-sandbox'],
        },
      }),
      instances: [{browser: 'chromium'}],
    },
    coverage: {
      provider: 'istanbul',
      include: ['src/**/*.{ts,tsx}'],
      reporter: ['text', 'lcov'],
      reportsDirectory: './coverage/browser',
    },
  },
});
