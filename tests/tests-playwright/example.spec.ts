import { test, expect } from 'playwright/test';

test('send data', async ({ page }) => {

  // await test.step('Заходим на страинцу', () => {

  // })

  await page.route('**/api/v1/countries', route => {
    // Верните заглушку ответа, вместо отправки реальных данных на сервер
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true, message: 'Data received' })
    });
  });

  await page.goto('./add-country');

  //проверяем наличие текста
  await expect(page.getByRole('menu').getByText('Страны')).toBeVisible();
  
  // Заполняем название страны
  await page.getByLabel('Название').fill('Туземания');
  
  // Заполняем код страны
  await page.getByLabel('Код').fill('S:');

  //нажимаем на кнопку "Создать"
  await page.getByRole('button').getByText('Создать').click();
});

