import { test, expect } from '@playwright/test'

test.describe.parallel("API Testing", () => {

    const baseURL = "https://reqres.in/api"

    test("DELETE Request - Delete Existing User", async ({ request }) => {
        const response = await request.delete(`${baseURL}/users/3`)
        expect(response.status()).toBe(204)
 
    })
})
