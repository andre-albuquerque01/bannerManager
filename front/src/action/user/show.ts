'use server'

import ApiRoute from '@/data/apiRoute'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function ShowUser() {
  try {
    const response = await ApiRoute('/user/55', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('token')?.value}`,
      },
      next: {
        revalidate: 60 * 60 * 24,
        tags: ['user'],
      },
    })

    const data = await response.json()

    return data.data
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 })
  }
}
