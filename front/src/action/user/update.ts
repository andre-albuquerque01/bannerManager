'use server'

import ApiRoute from '@/data/apiRoute'
import { ApiErrorResponse } from '@/data/type/apiErrorResponse'
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

    revalidateTag('user')

    const data: ApiErrorResponse = await response.json()

    if (data.errors) {
      const errors = data.errors

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const [field, messages] of Object.entries(errors)) {
        messages.forEach((message) => {
          if (message === 'The email has already been taken.')
            return 'E-mail já cadastrado!'
        })
      }
    }
    if (data.data.message === 'incorrect password') return 'Senha incorreta.'
    return 'success'
  } catch (error) {
    return 'Desculpe, ocorreu um erro ao alterar.\n Por favor, tente novamente mais tarde.'
  }
}
