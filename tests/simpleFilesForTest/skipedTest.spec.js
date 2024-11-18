const { test, expect } = require('@playwright/test');

test.describe('My Test Suite', () => {
    test('My Test Case', async ({ page }) => {
        await page.goto('https://example.com');
        // Your test code here
    });
});
