import { User } from "@/types/user"

export function setAccessToken(token: string) {
    if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', token)
    }
}

export function getAccessToken() {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('accessToken')
    }
    return null
}

export function refreshToken(token: string) {
    if (typeof window !== 'undefined') {
        localStorage.setItem('refreshToken', token)
    }
}

export function setUser(user: User) {
    if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify({
            id: user.id,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            image: user.image
        }))
    }
}

export function getUser() {
    if (typeof window !== 'undefined') {
        const user = localStorage.getItem('user')
        if (user) {
            return JSON.parse(user) as User
        }
    }
    return null
}