'use server'

import ApiRoute from '@/data/apiRoute'
import { cookies } from 'next/headers'

export async function GetOneBusiness(id: string) {
  try {
    const response = await ApiRoute(`/business/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${cookies().get('token')?.value}`,
      },
      next: {
        revalidate: 60 * 60,
        tags: ['business'],
      },
    })

    const data = await response.json()

    return data.data
  } catch (e) {
    return ''
  }
}
