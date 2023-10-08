import { test } from '@playwright/test'
import { HomePage } from '../../page-objects/e2e-home.page'
import { FeedbackPage } from '../../page-objects/e2e-submit-form.page'

test.describe("Feedback Form", () => {
    let homaPage: HomePage
    let feedbackPage: FeedbackPage

    test.beforeEach(async ({ page }) => {
        homaPage = new HomePage(page)
        feedbackPage = new FeedbackPage(page)

        await homaPage.visit()
        await homaPage.clickOnFeedbakLink()
    })

    // Reset Feedback Form
    test("Reset feedback form", async ({ page }) => {
        await feedbackPage.fillForm(
            "Tarik", 
            "test@automation.com", 
            "E2E Test Automation Subject", 
            "cenarios for Feedback form"
            )
        
        await feedbackPage.resetForm()
        await feedbackPage.assertReset()

    })

    // Submit Feedback Form
    test("Submit Feedback Form", async ({ page }) => {
        await feedbackPage.fillForm(
            "Tarik", 
            "teste2e@automation.com", 
            "E2E Test Automation Subject", 
            "cenarios for Feedback form"
            )

        await feedbackPage.submitForm()
        
        // short version of assertions for element visiblity to wait on next page
        await feedbackPage.feedbackFromSend()
    })
})
