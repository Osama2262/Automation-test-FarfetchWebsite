const { test, expect } = require("@playwright/test");
const { url } = require("inspector");

test.beforeEach(async ({ page }) => {

    await page.goto("https://the-internet.herokuapp.com/");
    
})
test.afterEach(async () => {
    console.log("The Test is finished");
})


test("the first test @smoke", async ({ page }) => {
    const auth = page.locator("text=Form Authentication "); //OR >> await page.locator("text=Form Authentication"); || await page.click("text=Form Authentication");

    await auth.click();
    await page.waitForTimeout(1000);
});
test("Not Working on firefox browser @smoke", async ({ page, browserName }) => {
    test.skip(browserName === 'firefox');
    await page.goto("https://google.com");
}) 