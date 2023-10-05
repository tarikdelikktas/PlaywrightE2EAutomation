import { test, expect } from '@playwright/test'

test.describe.parallel("API Testing", () => {

    const baseURL = "https://reqres.in/api"

    test("PUT Request - Update Existing User", async ({ request }) => {
        const response = await request.put(`${baseURL}/users/2`, {
            data: {
                name: 'Tarik Deliktas',   
                job: 'Senior Test Automation Engineer'
            },
        })
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(200)
        expect(responseBody.name).toBe('Tarik Deliktas')
        expect(responseBody.job).toBe('Senior Test Automation Engineer')
        expect(responseBody.updatedAt).toBeTruthy()
    })
})
