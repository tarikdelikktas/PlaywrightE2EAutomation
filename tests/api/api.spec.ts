import { test, expect } from '@playwright/test'

test.describe.parallel("API Testing", () => {

    const baseURL = "https://reqres.in/api"

    test("Simple API Test - Assert Response Status", async ({ request }) => {
        const response = await request.get(`${baseURL}/users/2`)
        expect(response.status()).toBe(200)

        const resBody = JSON.parse(await response.text())
    })

    test("Simple API Test - Assert Invalid Endpoint", async ({ request }) => {
        const response = await request.get(`${baseURL}/users/non-existing-endpoint`)
        expect(response.status()).toBe(404)
    })

    test("GET Request - Get User Detail", async ({ request }) => {
        const response = await request.get(`${baseURL}/users/3`)
        const resBodyGet = JSON.parse(await response.text())
        
        expect(response.status()).toBe(200)
        expect(resBodyGet.data.id).toBe(3)
        expect(resBodyGet.data.first_name).toBe('Emma')
        expect(resBodyGet.data.last_name).toBe('Wong')
        expect(resBodyGet.data.email).toBeTruthy()
    })
})