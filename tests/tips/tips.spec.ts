import { test, expect } from "@playwright/test"

test.describe.only("Tips & Tricks", () => {
    test("TestInfo Object", async ({ page }, testInfo) => {
        await page.goto('https://www.example.com')
    })

    test("Test Skip Browser", async ({ page, browserName }) => {
        test.skip(browserName === 'chromium', "Feature not ready in Chrome browser")
        await page.goto('https://www.example.com')
    })

    test("Test Fixme Annotation", async ({ page, browserName }) => {
        test.fixme(browserName === 'chromium', "Test is not stable, needs revision")
        await page.goto('https://www.example.com')
    })

    const people = ['Mike', 'Judy', 'Peter', 'Elon', 'Alice']
    for(const name of people) {
        test(`Running test for ${name}`, async ({ page }) => {
            await page.goto('http://zero.webappsecurity.com/index.html')
            await page.type("#searchTerm", `${name}`)
            await page.waitForTimeout(3000)
        })
    }

    test("Mouse Movement Simulation", async ({ page }) => {
        await page.goto('https://www.example.com')
        await page.mouse.move(0, 0)
        await page.mouse.down()
        await page.mouse.move(0, 100)
        await page.mouse.up()
    })
})