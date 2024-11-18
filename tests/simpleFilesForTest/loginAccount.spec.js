const { test, expect } = require('@playwright/test');
test("visit the main site",async({page}) =>{
    await page.goto("https://parabank.parasoft.com/")
})
test("Enter a valid condition",async({page})=>{
await page.goto("https://parabank.parasoft.com/")
await page.locator('[name="username"]').fill("test");
await page.locator('[name="password"]').fill("test");
await page.locator("//input[@name='username']").click();   // await page.getByRole('button', { value: 'Log In' }).click();
})