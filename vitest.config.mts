import {defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    include: ['test/node/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/Algorithm.ts', 'src/Serializer.ts'],
      reporter: ['text', 'lcov'],
      reportsDirectory: './coverage/node',
    },
  },
});
