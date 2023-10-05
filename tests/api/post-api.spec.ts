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

    test('POST Request - Login', async ({ request }) => {
        const response = await request.post(`${baseURL}/login`, {
            data: {
                email: "eve.holt@reqres.in",
                password: 'cityslicka'
            },
        })
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(200)
        expect(responseBody.token).toBeTruthy()
    })

    test('POST Request - Login Failed', async ({ request }) => {
        const response = await request.post(`${baseURL}/login`, {
            data: {
                email: "peter@klaven"
            },
        })
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(400)
        expect(responseBody.error).toBe("Missing password")
    })
})