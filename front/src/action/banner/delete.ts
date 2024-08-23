'use server'

import ApiRoute from '@/data/apiRoute'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

export async function DeleteBanner(id: string) {
  try {
    const response = await ApiRoute(`/banner/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${cookies().get('token')?.value}`,
      },
    })

    revalidateTag('banner')
    if (!response.ok) return false
    return true
  } catch (e) {
    return false
  }
}
