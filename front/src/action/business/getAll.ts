'use server'

import ApiRoute from '@/data/apiRoute'
import { cookies } from 'next/headers'

export async function GetAllBusiness() {
  try {
    const response = await ApiRoute(`/businessAll`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
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
    return { data: [], countPage: 0 }
  }
}
