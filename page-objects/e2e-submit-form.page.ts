import { expect, type Locator, type Page } from "playwright/test";

export class FeedbackPage {
    readonly page: Page
    readonly nameInput: Locator
    readonly emailInput: Locator
    readonly subjectInput: Locator
    readonly commentInput: Locator
    readonly clearButton: Locator
    readonly submitButton: Locator
    readonly feedbackTitile: Locator

    constructor(page: Page) {
        this.nameInput = page.locator("#name")
        this.emailInput = page.locator('#email')
        this.subjectInput = page.locator("#subject")
        this.commentInput = page.locator("#comment")
        this.clearButton = page.locator("input[name='clear']")
        this.submitButton = page.locator("input[type='submit']")
        this.feedbackTitile = page.locator('#feedback-title')
    }

    async fillForm(
        name: string, 
        email: string, 
        subject: string, 
        comment: string
        ) {
        await this.nameInput.type(name)
        await this.emailInput.type(email)
        await this.subjectInput.type(subject)
        await this.commentInput.type(comment)
    }

    async resetForm() {
        await this.clearButton.click()
    }

    async submitForm() {
        await this.submitButton.click()
    }

    async assertReset() {
        await expect(this.nameInput).toBeEmpty()
        await expect(this.commentInput).toBeEmpty()
    }

    async feedbackFromSend() {
        await expect(this.feedbackTitile).toBeVisible()
    }
}
