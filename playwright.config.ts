import { defineConfig, devices } from '@playwright/test';
import { config } from 'dotenv';

if (process.env.ENVIRONMENT) {
  console.log(`ENVIRONMENT: ${process.env.ENVIRONMENT}`);
  config({
    path: `.env.${process.env.ENVIRONMENT}`,
    override: true,
  });
} else {
  config();
}

export default defineConfig({
  testDir: './e2e/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html'], ['allure-playwright'], ['dot'], ['line']],
  use: {
    trace: 'on',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        video: 'on',
        screenshot: 'only-on-failure',
        ...devices['Desktop Chrome'],
      },
      testDir: './e2e/tests/ui',
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      testDir: './e2e/tests/ui',
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      testDir: './e2e/tests/ui',
    },
    {
      name: 'api',
      testDir: './e2e/tests/api',
    },
  ],
});
