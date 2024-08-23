'use server'

import ApiRoute from '@/data/apiRoute'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function LogoutUser() {
  try {
    const cookiesStore = cookies()
    const token = cookiesStore.get('token')

    const response = await ApiRoute('/logout', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token?.value}`,
      },
    })

    cookiesStore.delete('token')

    if (!response.ok) return false
  } catch (error) {
    return 'Error'
  }

  redirect('/')
}
