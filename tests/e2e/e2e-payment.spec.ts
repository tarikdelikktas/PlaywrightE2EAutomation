import { test } from '@playwright/test'
import { HomePage } from '../../page-objects/e2e-home.page'
import { LoginPage } from '../../page-objects/e2e-login.page'
import { PaymentPage } from '../../page-objects/e2e-payment.page'
import { NavBar } from '../../page-objects/components/navbar'

test.describe("New Payment", () => {
    let homaPage: HomePage
    let loginPage: LoginPage
    let paymentPage: PaymentPage
    let navBar: NavBar

    test.beforeEach(async ({ page }) => {
        homaPage = new HomePage(page)
        loginPage = new LoginPage(page)
        paymentPage = new PaymentPage(page)
        navBar = new NavBar(page)

        await homaPage.visit()
        await homaPage.clickOnSignIn()
        await loginPage.login('username', 'password')

        // SSL Certificate error fix by directing url
        await page.goto('http://zero.webappsecurity.com/bank/pay-bills.html')
    })

    test("Should send the payment", async({ page }) => {
        navBar.clickOnTab('Pay Bills')

        await paymentPage.createPayment()
        await paymentPage.assertSuccessMessage()
    })
})
