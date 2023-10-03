import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/e2e-home.page'
import { LoginPage } from '../../page-objects/e2e-login.page'

test.describe("Currency Exchange Form", () => {
    let homaPage: HomePage
    let loginPage: LoginPage

    test.beforeEach(async ({ page }) => {
        homaPage = new HomePage(page)
        loginPage = new LoginPage(page)

        homaPage.gotoIndex()
        homaPage.clickOnSignIn()
        loginPage.login('username', 'password')

        // SSL Certificate error fix by directing url to tranfer-funds after login
        await page.goto('http://zero.webappsecurity.com/bank/account-activity.html')
    })

    test("should make currency exchange", async({ page }) => {
        await page.click("#pay_bills_tab")
        await page.click("text=Purchase Foreign Currency")
        await page.selectOption("#pc_currency", "EUR")

        const rate = await page.locator("#sp_sell_rate")
        await expect(rate).toContainText("1 euro (EUR)")

        await page.type("#pc_amount", "1000")
        await page.click("#pc_inDollars_true")
        await page.click("#pc_calculate_costs")

        const coversAmmount = await page.locator("#pc_conversion_amount")
        await expect(coversAmmount).toContainText("1000.00 U.S dollar (USD)")

        await page.click("#purchase_cash")

        const message = await page.locator("#alert_content")
        await expect(message).toBeVisible
        await expect(message).toContainText('Foreign currency cash was successfully purchased')
    })
})