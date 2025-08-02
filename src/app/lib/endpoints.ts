
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export const endpoints = {
    AUTH:{
        REGISTER :`/api/auth/register`,
        LOGIN:`/auth/login`,

    }
}