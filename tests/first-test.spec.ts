import { test, expect } from '@playwright/test'

test("Simple basic test", async({ page }) => {
    // Test runner starts, open the browser and goes to flipkart
    await page.goto('https://www.flipkart.com/')
    await page.getByTitle('Flipkart')
})