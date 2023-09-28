import { test, expect } from '@playwright/test'

test.describe.parallel("Login / Logout Flow", () => {
    // Before Hook
    test.beforeEach(async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/index.html')
    })

    // Negative test cases
    test("Negative Scenario for Login", async ({ page }) => {
        await page.click("#signin_button")
        await page.type("#user_login", "invalidUsername")
        await page.type("#user_password",  "invalidPassword")
        await page.click("text=Sign in")
       
        const errorMessage = await page.locator('.alert-error')
        await expect(errorMessage).toContainText('Login and/or password are wrong.')
    })

    // Positive test cases + Logout
    test("Positive Scenario for Login + Logout", async({ page }) => {
        await page.click("#signin_button")
        await page.type("#user_login", "username")
        await page.type("#user_password",  "password")
        await page.click("text=Sign in")

        await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')

        const transferFunds = await page.locator('.board-header')
        await expect(transferFunds).toContainText('Transfer Money & Make Payments')

        // Logout
        await page.goto('http://zero.webappsecurity.com/logout.html')
        await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
    })
})