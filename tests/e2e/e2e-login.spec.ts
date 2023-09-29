import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/e2e-login.page'

test.describe.parallel("Login / Logout Flow", () => {
    let loginPage: LoginPage
    // Before Hook
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        await loginPage.gotoIndex()
    })

    // Negative test cases
    test("Negative Scenario for Login", async ({ page }) => {
        await page.click("#signin_button")
        await loginPage.login("invalidUsername", "invalidPassword")
        await loginPage.assertErrorMessage()
    })

    // Positive test cases + Logout
    test("Positive Scenario for Login + Logout", async({ page }) => {
        await page.click("#signin_button")
        await loginPage.login("username", "password")

        await loginPage.gotoTransferFunds()

        const transferFunds = await page.locator('.board-header')
        await expect(transferFunds).toContainText('Transfer Money & Make Payments')

        // Logout
        await page.goto('http://zero.webappsecurity.com/logout.html')
        await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
    })
})