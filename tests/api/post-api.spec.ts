import { test, expect } from '@playwright/test'

test.describe.parallel("API Testing", () => {

    const baseURL = "https://reqres.in/api"

    test("POST Request - Create New User", async ({ request }) => {
        const response = await request.post(`${baseURL}/users`, {
            data: {
                id: 343,   
            },
        })
        const responseBody = JSON.parse(await response.text())
        expect(responseBody.id).toBe(343)
        expect(responseBody.createdAt).toBeTruthy()
    })
})