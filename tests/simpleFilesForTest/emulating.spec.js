import { test, expect, devices } from '@playwright/test';

test.use({
  ...devices['Nexus 10'],
});

test('test', async ({ page }) => {
  await page.goto('https://www.vlr.gg/');
  await page.getByRole('link', { name: 'Events', exact: true }).click();
  await page.getByRole('link', { name: 'Champions Tour 2024 EMEA:' }).click();
  await page.getByRole('link', { name: 'The Ultimates Saudi Arabia' }).click();
  await page.goto('https://www.vlr.gg/team/matches/1458/the-ultimates/');
});