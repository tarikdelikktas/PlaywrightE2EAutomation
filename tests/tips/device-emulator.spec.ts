import { test, expect, devices } from '@playwright/test';

test.use({
  ...devices['iPhone 11'],
});

test('test', async ({ page }) => {
  await page.getByRole('complementary').getByRole('button', { name: 'Maybe later' }).click();
  await page.getByRole('link', { name: 'Harry Jackson', exact: true }).click();
  await page.getByRole('button', { name: 'Edit' }).click();
  await page.locator('a').filter({ hasText: 'Edit without logging in' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('listitem', { name: 'Caroline Hill' }).locator('a').first().click();
  await page.getByRole('button', { name: 'Watch' }).click();
});

/* Note: can run them on terminal by 
    npx playwright open --device "iPhone 11" wikipedia.org
    npx playwright pdf wikipedia.org wikis-file.pdf */