const { test,expect} = require("@playwright/test");


test.describe.parallel("Grouping from our test", () => {

    test("the first test @smoke", async ({ page }) => {
        const auth = page.locator("text=Form Authentication");
        await page.goto("https://the-internet.herokuapp.com/");
        await auth.click();
        await page.waitForTimeout(1000);
        await expect(page).toHaveURL("https://the-internet.herokuapp.com/login");
    });
    test("Not Working on firefox browser @smoke", async ({ page, browserName }) => {
        if (browserName === "firefox") {
            test.skip("Skipping test on Firefox");
            return;
        }
        await page.goto("https://google.com");
    })
})