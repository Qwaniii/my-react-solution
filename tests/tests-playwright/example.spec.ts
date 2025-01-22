import { test, expect } from 'playwright/test';

test('has title', async ({ page }) => {

  await page.goto('/add-country');

  //проверяем наличие текста
  await expect(page.getByText('Страны')).toBeVisible();
  
  // Заполняем название страны
  await page.getByLabel('Название').fill('Амазония');
  
  // Заполняем код страны
  await page.getByLabel('Код').fill('Y}');

  //нажимаем на кнопку "Создать"
  await page.getByRole('button', { name: /submit/i }).click();
});

