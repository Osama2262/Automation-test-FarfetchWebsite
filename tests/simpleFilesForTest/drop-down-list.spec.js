const { test } = require('@playwright/test');
test('select option',async({page})=>{
    await page.goto("https://the-internet.herokuapp.com/dropdown");
    await page.locator("#dropdown").selectOption("1");
    await page.waitForTimeout(1000);
    await page.locator("#dropdown").selectOption("2");
 });