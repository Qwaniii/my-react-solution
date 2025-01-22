import { defineConfig, devices } from 'playwright/test';
export default defineConfig({
  use: {
    // All requests we send go to this API endpoint.
    // baseURL: 'http://127.0.0.1:8050',
    baseURL: 'http://www.ya.ru',
    // extraHTTPHeaders: {
    //   // We set this header per GitHub guidelines.
    //   'Content-Type': 'application/json',
    //   // Assuming personal access token available in the environment.
    //   'X-Token': '5b17129b9c6ea2ad562480d9cea55c1e6d51ca97893047cfe2f92efec4895f73'
    // },
    locale: 'ru-RU',
    screenshot: 'only-on-failure',

    // Записывать tracelist после первой неудачной попытки
    trace: 'on-first-retry',
  },
//   projects: [
//     {
//       name: 'chromium',
//       use: { ...devices['Desktop Chrome'] },
//     },
//   ],

  // Запускаем devServer, перед тем как запустить тесты
//   webServer: {
//     command: 'npm run start',
//     url: 'http://127.0.0.1:8050',
//     reuseExistingServer: !process.env.CI,
//   },
  reporter: 'html',
  outputDir: 'tests/test-results',
  timeout: 30000,
});