'use server'

import ApiRoute from '@/data/apiRoute'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

export async function DeleteBusiness(id: string) {
  try {
    const response = await ApiRoute(`/business/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${cookies().get('token')?.value}`,
      },
    })

    revalidateTag('business')
    if (!response.ok) return false
    return true
  } catch (e) {
    return false
  }
}
