const { test } = require('@playwright/test');
const { beforeEach } = require('node:test');
test.describe("test suite",async () => {
    test('swipe blocks', async ({ page }) => {
        await page.goto("https://the-internet.herokuapp.com/drag_and_drop");
        await page.dragAndDrop('#column-a', '#column-b');
        await page.pause();
        await page.dragAndDrop('#column-b', '#column-a');
    });
});

