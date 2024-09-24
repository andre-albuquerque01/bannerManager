'use server'

import ApiRoute from '@/data/apiRoute'

export async function GetBusiness() {
  try {
    const response = await ApiRoute(`/businessIndex`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: 60 * 60,
        tags: ['business'],
      },
    })

    const data = await response.json()

    return data.data[0]
  } catch (e) {
    return { data: [], countPage: 0 }
  }
}
