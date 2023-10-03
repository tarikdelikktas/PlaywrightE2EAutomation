import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/e2e-home.page'
import { LoginPage } from '../../page-objects/e2e-login.page'

test.describe("New Payment", () => {
    let homaPage: HomePage
    let loginPage: LoginPage

    test.beforeEach(async ({ page }) => {
        homaPage = new HomePage(page)
        loginPage = new LoginPage(page)

        homaPage.gotoIndex()
        homaPage.clickOnSignIn()
        loginPage.login('username', 'password')

        // SSL Certificate error fix by directing url
        await page.goto('http://zero.webappsecurity.com/bank/pay-bills.html')
    })

    test("Should send the payment", async({ page }) => {
        await page.click("#pay_bills_tab")
        await page.selectOption("#sp_payee", "apple")
        await page.click("#sp_payee_details")
        await page.waitForSelector("sp_payee_details")
        await page.selectOption("#sp_account", "6")
        await page.type("#sp_amount", "100")
        await page.type("#sp_date", "2023-10-28")
        await page.type("#sp_description", "some random message")
        await page.click("#pay_saved_payees")

        const message = await page.locator("#alert_content > span")
        await expect(message).toBeVisible
        await expect(message).toContainText("The payment was successfully submitted")
    })
})