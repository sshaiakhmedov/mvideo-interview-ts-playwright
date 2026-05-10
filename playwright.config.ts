// @ts-check
import * as dotenv from 'dotenv';
import { devices } from '@playwright/test';

dotenv.config({ quiet: true });

import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  // Run tests in files in parallel
  fullyParallel: true,

  // Limit the number of workers on CI, use default locally
  workers: process.env.CI ? 10 : 5,

  // Directory for test artifacts (traces, screenshots, etc.)
  outputDir: 'test-results',

  // Use multiple reporters
  reporter: [
    ['list'], // Shows test statistics in the terminal
    ['allure-playwright', { detail: true }], // Keeps generating Allure reports with detailed steps
    ['html', { open: 'never' }], // The default Playwright HTML report
  ],

  /* Shared options */
  use: {
    headless: true,
    viewport: { width: 1920, height: 1080 }, // Enforce desktop viewport globally
    ignoreHTTPSErrors: true,
    video: 'on-first-retry',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  retries: process.env.CI ? 2 : 0,

  projects: [
    {
      expect: { timeout: 15000 },
      name: 'chrome',
      testDir: './tests/ui',
      fullyParallel: true,
      use: {
        browserName: 'chromium',
        baseURL: 'https://www.mvideo.ru/',
        locale: 'ru-RU',
        navigationTimeout: 15000,
        actionTimeout: 15000,
        ...devices['Desktop Chrome'], // add wright userAgent
        // viewport: process.env.CI ? { width: 1920, height: 1080 } : null,
        // deviceScaleFactor: undefined,
        // hasTouch: process.env.CI ? true : false,
        launchOptions: {
          args: ['--disable-blink-features=AutomationControlled', '--start-maximized'],
        },
      },
    },
    {
      name: 'api',
      testDir: './tests/api/',
      testIgnore: ['**/fakestore/**'],
      use: {
        baseURL: 'https://postman-echo.com',
      },
      timeout: 10000,
    },
    {
      name: 'fakestore',
      testDir: './tests/api/fakestore',
      use: {
        baseURL: 'https://fakestoreapi.com',
      },
      timeout: 10000,
    },
    {
      name: 'safari',
      testDir: './tests/ui',
      use: {
        browserName: 'webkit',
        baseURL: 'https://www.mvideo.ru/',
        ...devices['Desktop Safari'],
      },
    },
  ],
};

export default config;
