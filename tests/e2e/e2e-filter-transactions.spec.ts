import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/e2e-home.page'
import { LoginPage } from '../../page-objects/e2e-login.page'

test.describe("Filter Transactions from Account Activity", () => {
    let homaPage: HomePage
    let loginPage: LoginPage
    
    test.beforeEach(async ({ page }) => {
        homaPage = new HomePage(page)
        loginPage = new LoginPage(page)

        await homaPage.visit()
        await homaPage.clickOnSignIn()
        await loginPage.login('username', 'password')

        // SSL Certificate error fix by directing url to tranfer-funds after login
        await page.goto('http://zero.webappsecurity.com/bank/account-activity.html')
    })

    test("Verify the results for each account", async({ page }) => {
        await page.click("#account_activity_tab")

        // Select option for Checking account
        await page.selectOption('#aa_accountId', '2')

        // Verify the number of data in checking account table
        const checkingAccount = await page.locator(
            '#all_transactions_for_account tbody tr'
        )
        await expect(checkingAccount).toHaveCount(3) // 3 record in table

        // Select option for Loan
        await page.selectOption("#aa_accountId", "4")
        // Verify the number of data in checking account table
        const loanAccount = await page.locator(
            '#all_transactions_for_account tbody tr'
        )
        await expect(loanAccount).toHaveCount(2)  // 2 record in table

        // Select option for Brokerage
        await page.selectOption("#aa_accountId", "6")
        const noResult = await page.locator(".well")
        await expect(noResult).toBeVisible()
    })
})