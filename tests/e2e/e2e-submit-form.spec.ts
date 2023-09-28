import { test, expect } from '@playwright/test'

test.describe("Feedback Form", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.click("#feedback")
    })

    // Reset Feedback Form
    test("Reset feedback form", async ({ page }) => {
        await page.type("#name", "Tarik Deliktas")
        await page.type("#email", "test@automation.com")
        await page.type("#subject", "E2E Test Automation Subject")
        await page.type("#comment", "Scenarios for Feedback form")
        await page.click("input[name='clear']")

        const nameInput = await page.locator('#name')
        const commentInput = await page.locator('#comment')
        await expect(nameInput).toBeEmpty
        await expect(commentInput).toBeEmpty
    })

    // Submit Feedback Form
    test("Submit Feedback Form", async ({ page }) => {
        await page.type("#name", "Tarik Deliktas")
        await page.type("#email", "test@automation.com")
        await page.type("#subject", "E2E Test Automation Subject")
        await page.type("#comment", "Scenarios for Feedback form")
        await page.click('input[type="submit"]')

        // short version of assertions for element visiblity to wait on next page
        await page.waitForSelector('#feedback-title')
    })
})
