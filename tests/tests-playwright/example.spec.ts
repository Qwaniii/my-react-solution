import { test, expect } from 'playwright/test';

test('send data', async ({ page }) => {

  await test.step('Заглушка на отправку данных на сервер', async () => {
    await page.route('**/api/v1/countries?fields=*', async (route) => {
      // Верните заглушку ответа, вместо отправки реальных данных на сервер
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({result: { status: 200, success: true, message: 'Data received' }})
      });
    });
  })


  await test.step('Проверяем форму', async () => {
    await page.goto('./add-country');

      //проверяем наличие текста
    await expect(page.getByRole('menu').getByText('Страны')).toBeVisible();
    
    // Заполняем название страны
    await page.getByLabel('Название').fill('Земания');
    
    // Заполняем код страны
    await page.getByLabel('Код').fill('S:');

    //нажимаем на кнопку "Создать"
    await page.getByRole('button').getByText('Создать').click();
    })

});

