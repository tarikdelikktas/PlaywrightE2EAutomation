import crypto from 'crypto'

// Generate Random Integers
export async function getRandomNumber() {
    return Math.floor(Math.random() * 10000 + 1)
}

// Generate random Strings
export async function getRandomString() {
    return crypto.randomBytes(20).toString('hex')
}