import { test, expect } from '@playwright/test'

test.describe('Visual Regression Testing Example', () => {
    test("Full Page Snapshot", async({ page }) => {
        await page.goto('https://www.example.com')
        expect (await page.screenshot()).toMatchSnapshot('homepage.png')
    })

    test('Single Element Snapshot', async ({ page }) => {
        await page.goto('https://www.example.com')
        const singleElement = await page.$('h1')
        expect(await singleElement.screenshot()).toMatchSnapshot('page-title.png')
    })
})