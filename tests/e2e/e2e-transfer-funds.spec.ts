import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/e2e-home.page'
import { LoginPage } from '../../page-objects/e2e-login.page'

test.describe("Transfer Funds and Make Payments", () => {
    let homaPage: HomePage
    let loginPage: LoginPage

    test.beforeEach(async ({ page }) => {
        homaPage = new HomePage(page)
        loginPage = new LoginPage(page)

        await homaPage.visit()
        await homaPage.clickOnSignIn()
        await loginPage.login('username', 'password')

        // SSL Certificate error fix by directing url to tranfer-funds after login
        await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')
    })

    test("Transfer Funds", async({ page }) => {
        await page.selectOption("#tf_fromAccountId", "2")
        await page.selectOption("#tf_toAccountId", "3")
        await page.type("#tf_amount", "1000")
        await page.type("#tf_description", "Transfer Payment Message")
        await page.click("#btn_submit")

        // Verify the content
        const boardHeder = await page.locator("h2.board-header")
        await expect(boardHeder).toContainText("Verify")
        await page.click("#btn_submit")

        // Verify the success transfer funds message
        const message = await page.locator(".alert-success")
        await expect(message).toHaveText("You successfully submitted your transaction.")
    })
})