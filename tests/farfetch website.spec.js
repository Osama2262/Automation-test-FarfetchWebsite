const { test, expect } = require('@playwright/test');
const { Sign } = require('crypto');
const { chromium } = require('playwright-extra');
const { timeout } = require('../playwright.config');
const { type } = require('os');
const Captcha = require('2captcha');
const { beforeEach } = require('node:test');
const stealth = require('puppeteer-extra-plugin-stealth')();
chromium.use(stealth);

test.describe('My Test Suite', () => {
   test.use({
     storageState: 'user_auth.json'
    });

    test.beforeEach(async ({ page }) => {
        await page.goto("https://www.farfetch.com/sa");
    });

    // **Access Farfetch Website**
    test('TC001: access the farfetch website ', async ({ page }) => {
        await page.close();

    });



    //            **Registration (skipped for now)**

    test.skip('TC002: registration', async ({page}) => {  // remove the ".skip" and add any new email and password and remove the current condition
        const Sign_icon = await page.locator('[title="Sign in"]');//                   [ (💎*Done*💎) ]
        Sign_icon.click();
        await page.locator("//button[@id='tab-1']").click();
        await page.locator("//input[@name='name']").fill("test0001");
        await page.locator("//input[@type='email'and@data-testid='slice-login-email-input']").fill("test10001@gmail.com");
        await page.locator("//input[@name='password']").fill("Test@&3333");
        await page.waitForTimeout(2000);
        await page.locator("//input[@type='checkbox' and @name='subscribeMeToNewsletter']").check();
        await page.locator("//button[@type='submit' and contains(text(),'Register')]").click();
        await page.context().storageState({ path: 'user_auth.json' });
        await page.waitForTimeout(5000);
        await browser.close();
        await page.close();
    });


 //          **Login with Valid Credentials (skipped for now)**

    test.skip('TC003: user can login with valid condition', async ({page}) => {//                   [ (💎*Done*💎) ]
        await page.locator('[title="Sign in"]').click();
        await page.locator("//input[@type='email'and@data-testid='slice-login-email-input']").fill("test0001@gmail.com");
        await page.locator("//input[@name='password']").fill("Test@&3333");
        //await page.getByTestId('slice-login-remind-checkbox').check();
        await page.getByRole('button', { name: 'Sign In' }).click();
        await page.waitForTimeout(60000);
        await page.context().storageState({ path: 'user_auth.json' });
        await page.close();
    });


//                  **Add Items to Cart**

    test('TC004: add items to the cart', async ({ page }) => {//                   [ (💎*Done*💎) ]
        await page.waitForLoadState();
        await page.locator("//a[contains(.,'Menswear')]").click();
        await page.getByRole('button', { name: 'Shoes' }).dblclick();
        const all_category = await page.getByTestId("productCard");

        const first_item = all_category.first();
        await first_item.click();

        const button = await page.locator("//button[@aria-label='Add To Bag']");
        await button.click();

        const first_size= await page.locator("[role='option']").first();
        await first_size.click();

        await button.click();
        await page.waitForTimeout(10000);
    })


  //                **Change Item Size from Cart**

    test('TC005:  Change the item size from cart', async ({ page }) => {//              [ (💎*Done*💎) ]
            const counter = await page.locator ("//a[@title='Bag'] //span[@data-testid='counter']").isVisible();
            if(counter)
            {
                await page.getByTitle("Bag").click();
                const first_Change_button = await page.getByTestId("item-size-actionButton").first();
                first_Change_button.click();
    
                await page.getByTestId("item-size-dropdown").click();
                const last_size = await page.locator(' //div[@data-testid="item-size-dropdown"] //div[@role="button"]').last();
                last_size.click();
                await page.waitForTimeout(500);
        }
        else {
            test.fail();
                console.log("--------------------------------------");
                console.log("## The bag Does not have any items yet");
                console.log("--------------------------------------");
        }
    })



//                      **Change Quantity of item**  
    test('TC006: Change Quantity of item', async ({ page }) => {//                   [ (💎*Done*💎) ]
        
        const counter = await page.locator("//a[@title='Bag'] //span[@data-testid='counter']").isVisible(); 
        
        if (counter) {
            await page.getByTitle("Bag").click();
                       const check=await page.textContent('//span[@data-testid="item-quantity"]');
                       const ChangeButton=await page.locator('//button[@data-testid="item-quantity-actionButton"]');
                        const buttonCheck = ChangeButton.isVisible();
                        if(check=="1" & buttonCheck)
                        {
                            ChangeButton.click();
                            await page.locator('//div[@data-testid="item-quantity-dropdown"]').click();
                            await page.getByTestId("option-2").click();
                        }
                        else if(check=="2" & buttonCheck)
                        {
                            ChangeButton.click();
                            await page.locator('//div[@data-testid="item-quantity-dropdown"]').click();
                           
                             await page.getByTestId("option-1").click();
                        }
                        else
                        {
                            test.fail();
                            console.log("--------------------------------------");
                            console.log("## Can't change the quantity That is [only one item left in the stock] ");
                            console.log("--------------------------------------");
                        }
            }
            else {
                test.fail();
                console.log("--------------------------------------");
                console.log("## The bag Does not have any items yet");
                console.log("--------------------------------------");
        }
        

    })



//              ** Remove all item from cart **

    test('TC007: remove all item from cart', async ({ page }) => {//                   [ (💎*Done*💎) ]
        const isVisible= await page.locator("//a[@title='Bag']//span[@data-testid='counter']").isVisible();
        if(isVisible)
            {
                const text = await page.textContent( "//a[@title='Bag']//span[@data-testid='counter']");
                 const counter = Number(text);
                    await page.getByTitle("Bag").click();
                    let num = counter;
                    while (num--) {
                        await page.getByTitle("Remove").last().click();
                        await page.waitForTimeout(2000);
                        if (num == 1) {
                            await page.waitForTimeout(2000);
                            await page.getByTitle("Remove").first().click();  
                            break;
                        }
                    }
                  //  isHidden = false;
            //    await expect(await page.locator("[data-testid='empty-bag-default-description']").isVisible());
            }else {
                console.log("---------------------------------");
                console.log("# There are no items on the cart # ");
                console.log("---------------------------------");
            };
            await page.waitForTimeout(1000);
            const last_check = await page.locator( "//a[@title='Bag']//span[@data-testid='counter']").isHidden();
            console.log("♣ No item left ♣ => '"+ last_check+"'");
        
    })


//** Add items to Wishlist **

    test('TC008: Add items to Wishlist ', async ({ page }) => {//                   [ (💎*Done*💎) ]
        await page.locator("//a[contains(.,'Menswear')]").click();
        await page.getByRole('button', { name: 'Shoes' }).dblclick();
        const all_category = await page.getByTestId("productCard");

        const first_item = all_category.first();
        await first_item.click();
        await page.waitForTimeout(7000);
        const item = await page.locator('[aria-pressed="false"]').isEnabled();
        if (item ) {
            await page.getByRole('button', { name: 'Wishlist' }).click();
            await page.waitForTimeout(3000);

        } else {
            console.log("\n## items is already added to Wishlist ##\n ");
        }
       


    });
//** Remove all item from Wishlist **
    test('TC009: Remove all item from Wishlist', async ({ page }) => {
        // const browser = await chromium.launch();
        // const page = await browser.newPage();
        //await page.setViewportSize({ width: 1520, height: 824 });
        const text = await page.locator("//a[@title='Wishlist'] //span[@data-testid='counter']").isVisible();
        if(text)
        {
            await page.evaluate();
            const text = await page.textContent("//a[@title='Wishlist'] //span[@data-testid='counter']");
            const counter = Number(text);
            let num = counter;
            await page.getByTitle("Wishlist").click();
            
            await page.waitForLoadState();
            while (--num) {
                await page.locator("//button[@data-testid='wishlistCard-removeButton']").last().click();
                await page.waitForTimeout(2000);
                if (num == 1) {
                    await page.waitForTimeout(2000);
                    await page.locator("//button[@data-testid='wishlistCard-removeButton']").last().click();
                }
            }
            if (num == 1) {
                await page.waitForTimeout(2000);
                await page.locator("//button[@data-testid='wishlistCard-removeButton']").first().click();
                await page.waitForTimeout(6000);
            }   
        }else{
            console.log("---------------------------------");
            console.log("# There are no items on the Wishlist #");
            console.log("---------------------------------")
        }
        
    })
});

