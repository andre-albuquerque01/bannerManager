'use server'

import ApiRoute from '@/data/apiRoute'
import { cookies } from 'next/headers'

export async function GetOneBanner(id: string) {
  try {
    const response = await ApiRoute(`/banner/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${cookies().get('token')?.value}`,
      },
      next: {
        revalidate: 60 * 60,
        tags: ['banner'],
      },
    })

    const data = await response.json()

    return data.data
  } catch (e) {
    return ''
  }
}
