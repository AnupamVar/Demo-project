import { test, expect } from '@playwright/test';

test('About page view', async ({ page }) => {
  await page.goto(
    'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
  );

  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  // Wait for dashboard after login
  await expect(
    page.getByRole('heading', { name: 'Dashboard' })
  ).toBeVisible();

  // Open profile menu
  await page.locator('.oxd-userdropdown-name').click();

  // Click About
  await page.getByRole('menuitem', { name: 'About' }).click();

  // Close About popup
  await page.getByRole('button', { name: '×' }).click();
});