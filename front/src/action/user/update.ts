'use server'

import ApiRoute from '@/data/apiRoute'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

export async function UpdateUser(reqBody: object) {
  try {
    const response = await ApiRoute('/user/5555', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('token')?.value}`,
      },
      body: JSON.stringify(reqBody),
    })

    const data = await response.json()

    revalidateTag('user')
    if (
      data &&
      data.data &&
      data.data.message === 'The email has already been taken.'
    )
      return 'E-mail já usado!'
    if (data && data.data && data.data.message === 'incorrect password')
      return 'Senha incorreta.'

    return data.data.message
  } catch (error) {
    return 'Houver error'
  }
}
