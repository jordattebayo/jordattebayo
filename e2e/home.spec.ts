import { expect, test } from '@playwright/test';

test('homepage renders site title', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: /jordattebayo dot dev/i })).toBeVisible();
});
