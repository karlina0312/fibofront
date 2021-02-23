import { BaseRequest } from 'api'

export const login = async (email: string, password: string) => {
  const response = await BaseRequest({
    url: 'auth/login',
    method: 'POST',
    data: { email, password },
  })
  if (response) {
    localStorage.setItem('token', response.token)
    return true
  }
  return false
}

export const getAuthUser = async () => {
  const token = localStorage.getItem('token')
  if (token) {
    const response = await BaseRequest({
      url: 'user/me',
      method: 'GET',
    })
    if (response) {
      return response
    }
  }
  return null
}

export async function getPublicIP() {
  const ipAddress = await fetch('https://api.ipify.org?format=json')
  return (await ipAddress.json()).ip
}

export async function logout() {
  await BaseRequest({
    url: 'auth/logout',
    method: 'GET',
  })
  return true
}
