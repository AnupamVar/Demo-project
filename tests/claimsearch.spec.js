import { test, expect } from '@playwright/test';

test('search claims for a date range', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  const username = page.getByRole('textbox', { name: 'Username' });
  const password = page.getByRole('textbox', { name: 'Password' });

  await expect(username).toBeVisible();
  await username.fill('Admin');
  await password.fill('admin123');

  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/\/dashboard\/index$/, { timeout: 15000 });

  await page.getByRole('link', { name: 'Claim' }).click();
  await expect(page).toHaveURL(/\/claim\/viewAssignClaim$/, { timeout: 15000 });

  const dateInputs = page.getByRole('textbox', { name: 'yyyy-dd-mm' });
  await expect(dateInputs).toHaveCount(2);
  await dateInputs.first().fill('2024-08-01');
  await dateInputs.nth(1).fill('2024-08-31');

  await page.getByRole('button', { name: 'Search' }).click();
  await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();
});